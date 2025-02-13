"use client";
import React from "react";
import Image from "next/image";
import { TbPdf } from "react-icons/tb";

interface DirectorsProps {
  directors: Array<{
    id: string;
    full_name: string;
    position: string;
    identity: string;
    image: {
      file_path: string;
    };
  }>;
}

const DirectorsCard: React.FC<DirectorsProps> = ({ directors }) => {
  return (
    <div className="grid grid-cols-3 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1 group justify-between gap-3">
      {directors?.map((director) => (
        <div
          key={director.id}
          className="w-full relative  shadow-lg overflow-hidden border border-gray-200"
        >
          <div className="relative w-full h-64 bg-sky-50">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${director.image.file_path}`}
              alt={director.full_name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <p className="font-bold text-lg text-black">{director.full_name}</p>
            <p className="text-sm text-gray-700 mt-1">{director.position}</p>
            <p className="text-md font-semibold text-black mt-1">
              {director.identity}
            </p>
            <div className="absolute -bottom-0  rotate-90 right-0 w-0 h-0 border-l-[40px] border-l-transparent border-t-[40px] border-t-purple-600">
              <TbPdf className="text-white absolute z-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DirectorsCard;
