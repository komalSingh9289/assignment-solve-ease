'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../../workers.json')
        setWorkersData(response.default)
      } catch (error) {
        console.error('Failed to load workers:', error)
      }
    }
    loadData()
  }, [])

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4'>
      <h1 className='text-4xl font-bold mb-12 text-center text-white'>
        Meet Our Workers
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {workersData
          .filter((worker) => worker.pricePerDay > 0)
          .filter((worker) => worker.id !== null)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((worker: WorkerType) => (
            <div
              key={worker.id}
              className='bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300'
            >
              <div className='relative w-full h-56'>
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className='object-cover'
                  priority={worker.id <= 10}
                />
              </div>
              <div className='p-5 text-white'>
                <h2 className='text-2xl font-semibold mb-1'>{worker.name}</h2>
                <p className='text-gray-300 mb-3'>{worker.service}</p>
                <p className='font-bold text-lg mb-4'>
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </p>
                <button className='w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-medium transition-colors'>
                  Hire Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
