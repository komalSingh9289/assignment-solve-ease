// components/WorkersCard.tsx
'use client';
import { WorkerType } from '@/types/workers';
import Image from 'next/image';

interface Props {
  worker: WorkerType;
}

export default function WorkersCard({ worker }: Props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:scale-105">
      <div className="relative w-full h-48">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{worker.name}</h2>
        <p className="text-gray-600">{worker.service}</p>
        <p className="mt-2 font-medium">₹{Math.round(worker.pricePerDay * 1.18)} / day</p>
      </div>
    </div>
  );
}
