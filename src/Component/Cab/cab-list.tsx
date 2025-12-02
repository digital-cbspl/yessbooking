"use client";

import React, { JSX, useState } from "react";
import {
  Star,
  User,
  MapPin,
  ChevronDown,
  ChevronsLeft,
  X,
  Search,
  Zap,
  Factory,
  Fuel,
  Flame,
  Car,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  BadgeCheck,
} from "lucide-react";

/* ---------------------------
   Types & Sample Data (CAB)
   --------------------------- */

type CabItem = {
  id: number;
  operator: string;
  type: string;
  rating: string;
  reviews: number;
  departDate: string;
  departTime: string;
  departCity: string;
  arriveDate: string;
  arriveTime: string;
  arriveCity: string;
  duration: string;
  startsAt: number;
  seatsAvailable: number;
  upperSeats: string[];
  lowerSeats: string[];
  booked?: string[];
  female?: string[];
  male?: string[];
  prices?: number[];
};

const dates = [
  "01 Mon",
  "02 Tue",
  "03 Wed",
  "04 Thu",
  "05 Fri",
  "06 Sat",
  "07 Sun",
  "08 Mon",
  "09 Tue",
  "10 Wed",
  "11 Thu",
];

// Sample cabs
const cabsSample: CabItem[] = [
  {
    id: 1,
    operator: "CityRide Cabs",
    type: "Sedan AC",
    rating: "4.8",
    reviews: 87,
    departDate: "01 Dec",
    departTime: "09:30",
    departCity: "Hyderabad",
    arriveDate: "01 Dec",
    arriveTime: "14:00",
    arriveCity: "Vijayawada",
    duration: "4:30 Hrs",
    startsAt: 1499,
    seatsAvailable: 4,
    upperSeats: ["U1", "U2"],
    lowerSeats: ["L1", "L2"],
    booked: ["U2"],
    female: ["L1"],
    male: ["L2"],
    prices: [1499, 1699, 1899],
  },
];

/* ---------------------------
   Sidebar Checkbox Component
   --------------------------- */

function CheckItem({
  icon,
  label,
  count,
}: {
  icon?: JSX.Element;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex items-center gap-3 text-sm py-1 cursor-pointer">
      <input type="checkbox" className="w-4 h-4" />
      {icon}
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-auto text-xs text-gray-500">({count})</span>
      )}
    </label>
  );
}

/* ---------------------------
   Seat Layout Component
   --------------------------- */

function SeatLayout({
  upper,
  lower,
  booked = [],
  female = [],
  male = [],
  onClose,
}: {
  upper: string[];
  lower: string[];
  booked?: string[];
  female?: string[];
  male?: string[];
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSeat = (s: string) => {
    if (booked.includes(s)) return;
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const seatClass = (s: string) => {
    if (selected.includes(s)) return "bg-[#c5f0d0] border-[#2d8a5a]";
    if (booked.includes(s)) return "bg-gray-300 border-gray-400 text-gray-600";
    if (female.includes(s)) return "bg-pink-100 border-pink-300";
    if (male.includes(s)) return "bg-blue-100 border-blue-300";
    return "bg-white border-gray-300";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg w-full max-w-[1100px] h-[85vh] shadow-xl overflow-hidden flex flex-col">

        <div className="flex justify-between p-4 border-b">
          <h3 className="font-semibold">Select Seats</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">

          <div className="flex-1 p-4 overflow-auto">
            <p className="text-sm mb-2">Upper</p>
            <div className="grid grid-cols-6 gap-3 mb-6">
              {upper.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSeat(s)}
                  className={`border rounded px-3 py-2 ${seatClass(s)}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="text-sm mb-2">Lower</p>
            <div className="grid grid-cols-6 gap-3">
              {lower.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSeat(s)}
                  className={`border rounded px-3 py-2 ${seatClass(s)}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="w-[360px] border-l p-4 overflow-auto">
            <button className="mt-4 w-full py-3 rounded bg-gray-200 text-gray-700">
              Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Main Component (CAB SEARCH)
   --------------------------- */

export default function CabSearchFullPage(): JSX.Element {
  const [showSeats, setShowSeats] = useState(false);
  const [activeCab, setActiveCab] = useState<CabItem | null>(null);

  const openSeatsForCab = (cab: CabItem) => {
    setActiveCab(cab);
    setShowSeats(true);
  };

  const closeSeats = () => {
    setShowSeats(false);
    setActiveCab(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto py-6 px-4">

        {/* Sort Bar */}
        <div className="bg-white rounded-md px-6 py-4 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="font-medium">Sort By:</span>
            <span>Price</span>
            <span>Seats</span>
            <span>Ratings</span>
            <span>Pickup</span>
          </div>
          <div className="text-sm text-orange-600">Showing 42 Cabs</div>
        </div>

        <div className="flex gap-6">

          {/* LEFT SIDEBAR (REORDERED + PRICE DROP ADDED) */}
          <aside className="w-[320px] bg-white rounded-lg p-6 shadow-sm h-max">

            {/* 1️⃣ PRICE DROP */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Price Drop</h4>
              <CheckItem label="Show price drop only" />
            </div>

            {/* 2️⃣ CAB TYPE */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Cab Type</h4>
              <CheckItem label="Sedan" icon={<Car size={16} />} />
              <CheckItem label="SUV" icon={<Car size={16} />} />
            </div>

            {/* 3️⃣ PRICE RANGE */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Price Range</h4>
              <input type="range" min={500} max={6500} className="w-full" />
            </div>

            {/* 4️⃣ PICKUP TIME */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Pickup Time</h4>
              <CheckItem label="Morning" icon={<Sunrise size={16} />} />
              <CheckItem label="Day" icon={<Sun size={16} />} />
              <CheckItem label="Evening" icon={<Sunset size={16} />} />
              <CheckItem label="Night" icon={<Moon size={16} />} />
            </div>

            {/* 5️⃣ FUEL TYPE */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Fuel Type</h4>
              <CheckItem icon={<Zap size={16} />} label="Electric" count={1} />
              <CheckItem icon={<Factory size={16} />} label="CNG" count={1} />
              <CheckItem icon={<Fuel size={16} />} label="Diesel" count={1} />
              <CheckItem icon={<Flame size={16} />} label="Petrol" count={5} />
            </div>

            {/* 6️⃣ CAR MODEL */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Car Model</h4>
              {[
                "Swift or similar",
                "WagonR or similar",
                "Indica or similar",
                "Dzire or similar",
                "Etios or similar",
                "Innova or similar",
                "Innova Crysta or similar",
                "Ertiga or similar",
                "Xylo or similar",
              ].map((model) => (
                <CheckItem key={model} label={model} icon={<Car size={16} />} />
              ))}
            </div>

            {/* 7️⃣ PASSENGER CAPACITY */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Passenger Capacity</h4>
              <CheckItem label="4 passenger seats" icon={<User size={16} />} />
              <CheckItem label="6 passenger seats" icon={<User size={16} />} />
            </div>

          </aside>

          {/* RIGHT: CAB RESULTS */}
          <main className="flex-1 max-w-[900px] mx-auto">

            {/* Date Tabs */}
            <div className="bg-white rounded-lg p-3 mb-6 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button className="min-w-[80px] py-3 px-4 border-b-4 border-[#2d3b78] font-semibold text-sm">
                  01 Mon
                </button>

                {dates.slice(1).map((d) => (
                  <div
                    key={d}
                    className="min-w-[80px] py-3 px-4 text-sm text-gray-600"
                  >
                    {d}
                  </div>
                ))}

                <ChevronsLeft size={18} className="text-gray-400 ml-auto" />
              </div>
            </div>

            {/* Cab List */}
            <div className="space-y-5">
              {cabsSample.map((c) => (
                <article
                  key={c.id}
                  className="bg-white shadow-sm rounded-lg flex border overflow-hidden hover:shadow-lg transition"
                >
                  <div className="flex-1 p-5">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{c.operator}</h3>
                        <p className="text-sm text-gray-500">{c.type}</p>

                        <div className="flex items-center gap-3 mt-3 text-sm">
                          <div className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1">
                            <Star size={14} /> {c.rating}
                          </div>
                          <div className="text-gray-500 flex items-center gap-1">
                            <User size={14} /> {c.reviews}
                          </div>
                          <div className="text-gray-600 flex items-center gap-1">
                            <BadgeCheck size={14} /> Verified Driver
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-sm text-gray-600">
                        <p className="text-xs">{c.departDate}</p>
                        <p className="text-2xl font-bold">{c.departTime}</p>
                        <p className="text-sm">{c.departCity}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500 my-4">
                      <span className="text-gray-300">• • •</span>
                      <span className="border px-3 py-1 rounded-full">{c.duration}</span>
                      <span className="text-gray-300">• • •</span>
                    </div>

                    <div className="border-t pt-3 flex items-center gap-4 text-xs text-gray-600">
                      <button className="hover:text-[#2d3b78] flex items-center gap-1">
                        Pickup & Drop Details <ChevronDown size={14} />
                      </button>
                      <button className="hover:text-[#2d3b78] flex items-center gap-1">
                        Amenities <ChevronDown size={14} />
                      </button>
                      <span className="text-orange-500">₹50 Off Today</span>
                    </div>
                  </div>

                  <div className="w-[230px] border-l p-5 flex flex-col items-end justify-center">
                    <p className="text-sm text-gray-500">Starting at</p>
                    <p className="text-3xl font-bold">₹{c.startsAt}</p>

                    <button
                      className="mt-4 w-full py-3 rounded text-white"
                      style={{ backgroundColor: "#2d3b78" }}
                      onClick={() => openSeatsForCab(c)}
                    >
                      Select Cab
                    </button>

                    <p className="mt-2 text-xs text-gray-500">
                      {c.seatsAvailable} Seats
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </main>
        </div>
      </div>

      {showSeats && activeCab && (
        <SeatLayout
          upper={activeCab.upperSeats}
          lower={activeCab.lowerSeats}
          booked={activeCab.booked}
          female={activeCab.female}
          male={activeCab.male}
          onClose={closeSeats}
        />
      )}
    </div>
  );
}
