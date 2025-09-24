"use client";

import { WorkerType } from "@/types/workers";
import Image from "next/image";
import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const WorkersCard = lazy(() => import("./components/WorkersCard"));

const ITEMS_PER_PAGE = 9;

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    service: "",
    priceRange: [0, Infinity],
  });

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/workers");
        if (!res.ok) throw new Error("Failed to fetch");

        const result = await res.json();
        if (result.success && Array.isArray(result.data))
          setWorkersData(result.data);
        else throw new Error("Invalid data format");
      } catch (err) {
        console.error(err);
        setError("Failed to load workers. Please try again later.");
        setWorkersData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkers();
  }, []);

  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((w) => w.pricePerDay > 0 && w.id !== null)
      .filter((w) => (filters.service ? w.service === filters.service : true))
      .filter(
        (w) =>
          w.pricePerDay >= filters.priceRange[0] &&
          w.pricePerDay <= filters.priceRange[1]
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [workersData, filters]);

  const totalPages = Math.ceil(filteredWorkers.length / ITEMS_PER_PAGE);
  const paginatedWorkers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredWorkers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredWorkers, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "service") setFilters((f) => ({ ...f, service: value }));
    if (name === "price") {
      const [min, max] = value.split("-").map(Number);
      setFilters((f) => ({ ...f, priceRange: [min, max] }));
    }
    setCurrentPage(1); // Reset to first page
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* --- Navbar --- */}
      <nav className="sticky top-0 z-50 bg-gray-800 shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0">
        <h1 className="text-2xl font-bold">Our Workers</h1>
        <div className="flex gap-3 flex-wrap">
          <select
            name="service"
            value={filters.service}
            onChange={handleFilterChange}
            className="bg-gray-700 border-gray-600 text-white rounded px-3 py-1 focus:outline-none"
          >
            <option value="">All Services</option>
            <option value="Painter">Painter</option>
            <option value="Chef">Chef</option>
            <option value="Gardener">Gardener</option>
            <option value="Electrician">Electrician</option>
          </select>

          <select
            name="price"
            onChange={handleFilterChange}
            className="bg-gray-700 border-gray-600 text-white rounded px-3 py-1 focus:outline-none"
          >
            <option value="0-Infinity">All Prices</option>
            <option value="0-500">₹0 - ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000-5000">₹1000+</option>
          </select>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* --- Workers Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 p-4 rounded-lg shadow animate-pulse"
                >
                  <Skeleton
                    height={180}
                    baseColor="#374151"
                    highlightColor="#4B5563"
                  />
                  <Skeleton
                    count={2}
                    className="mt-2"
                    baseColor="#374151"
                    highlightColor="#4B5563"
                  />
                  <Skeleton
                    width="50%"
                    className="mt-2"
                    baseColor="#374151"
                    highlightColor="#4B5563"
                  />
                </div>
              ))
            : paginatedWorkers.map((worker) => (
                <Suspense key={worker.id} fallback={<Skeleton height={300} />}>
                  <WorkersCard worker={worker} />
                </Suspense>
              ))}
        </div>

        {/* --- Pagination --- */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              if (page >= currentPage - 1 && page <= currentPage + 1) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              if (page === 1 || page === totalPages) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
