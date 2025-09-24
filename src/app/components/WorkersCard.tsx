// components/WorkersCard.tsx
'use client';
import { WorkerType } from '@/types/workers';
import Image from 'next/image';

interface Props {
  worker: WorkerType;
}

export default function WorkersCard({ worker }: Props) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition transform hover:scale-105 group relative">
      {/* Image */}
      <div className="relative w-full h-48">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold text-lg">
          ₹{Math.round(worker.pricePerDay * 1.18)} / day
        </div>
      </div>

      {/* Worker Info */}
      <div className="p-4">
        <h2 className="text-white text-lg font-semibold">{worker.name}</h2>
        <p className="text-gray-300">{worker.service}</p>
      </div>
    </div>
  );
}
