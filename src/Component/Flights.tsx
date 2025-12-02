"use client";

import Image from "next/image";
import { Airline1, Airline2, Airline3, Airline4, Airline5, Airline6 } from "../assests/image/image";

export default function Flights() {
  const airlines = [
    { name: "IndiGo", img: Airline1.src },
    { name: "Air India", img: Airline2.src },
    { name: "Air India Express", img: Airline3.src },
    { name: "Akasa Air", img: Airline4.src },
    { name: "Alliance Air", img: Airline5.src },
    { name: "SpiceJet", img: Airline6.src },
  ];

  return (
    <section className="w-full py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* TITLE */}
        <h2 className="text-4xl font-extrabold text-black mb-6">
          Popular Domestic Airlines
        </h2>

        {/* AIRLINES BOX */}
        <div className="border rounded-2xl p-6 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
            {airlines.map((air, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <Image
                  src={air.img}
                  alt={air.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <p className="text-gray-800 font-medium text-sm">{air.name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
