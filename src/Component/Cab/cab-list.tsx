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
  Globe,
  Thermometer,
  CheckCircle,
} from "lucide-react";

import { Car1, Car2, Car3 } from "@/src/assests/image/image";

/* ---------------------------
   Types & Sample Car Data
   --------------------------- */

type CarOption = {
  id: number;
  title: string;
  subtitle?: string;
  tags: string[];
  shortDesc: string;
  features: string[];
  badges: string[];
  fuelTypePrimary: string;
  price: number;
  taxes: number;
  rating?: string;
  ratingCount?: number;
  image?: string;
};

/* SAMPLE 3 CARS */
const sampleOptions: CarOption[] = [
  {
    id: 1,
    title: "Mercedes-Benz",
    subtitle: "Or Similar",
    tags: ["HATCHBACK", "AC", "4 seats"],
    shortDesc: "Economical car with limited luggage",
    features: [
      "65 kms included. After that ₹16.5/km",
      "Free cancellation until 1 hour before pickup",
      "Reserve this cab at ₹270 only",
      "CNG Car",
    ],
    badges: ["Premium Services"],
    fuelTypePrimary: "CNG",
    price: 1009,
    taxes: 109,
    rating: "4.4",
    ratingCount: 15,
    image: Car1.src,
  },
  {
    id: 2,
    title: "Honda Accord Hybrid",
    subtitle: "Or Similar",
    tags: ["SEDAN", "AC", "4 seats"],
    shortDesc: "Comfortable sedan with large boot space",
    features: [
      "75 kms included. After that ₹15.0/km",
      "24/7 Support",
      "Reserve at ₹300 only",
      "Petrol Car",
    ],
    badges: ["Premium Services"],
    fuelTypePrimary: "PETROL",
    price: 1299,
    taxes: 122,
    rating: "4.6",
    ratingCount: 21,
    image: Car2.src,
  },
  {
    id: 3,
    title: "Volvo S60",
    subtitle: "Or Similar",
    tags: ["SUV", "AC", "6 seats"],
    shortDesc: "Spacious SUV perfect for family trips",
    features: [
      "100 kms included. After that ₹18.0/km",
      "Free cancellation until pickup",
      "Reserve at ₹350 only",
      "Diesel Car",
    ],
    badges: ["Premium Services"],
    fuelTypePrimary: "DIESEL",
    price: 1899,
    taxes: 150,
    rating: "4.7",
    ratingCount: 35,
    image: Car3.src,
  },
];

/* ---------------------------
   Helper Components
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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-xs font-semibold bg-[#fef3c7] text-[#92400e] px-2 py-1 rounded-md">
      {children}
    </span>
  );
}

/* ---------------------------
   Car Card — EXACT DESIGN
   --------------------------- */

function CarCard({ option }: { option: CarOption }) {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border overflow-hidden">

      <div className="flex gap-6 p-5 items-start">

        {/* Car Image */}
        <div className="w-[120px] flex items-start">
          <img
            src={option.image}
            alt={option.title}
            className="w-full h-auto object-contain rounded-md"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold">{option.title}</h3>
                {option.subtitle && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                    {option.subtitle}
                  </span>
                )}
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {option.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs border rounded px-2 py-1 text-gray-600 bg-gray-50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="text-right">
              <div className="text-xs text-gray-500">{option.ratingCount} ratings</div>
              <div className="mt-1 inline-flex items-center gap-2 rounded px-2 py-0.5 bg-green-50 text-green-800 text-sm font-semibold">
                {option.rating} / 5
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full" />
            <h4 className="font-semibold text-gray-800">{option.shortDesc}</h4>
          </div>

          {/* Premium Badge */}
          <div className="mt-3 flex items-center gap-3">
            {option.badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>

          {/* Features 2 columns */}
          <div className="mt-4 grid grid-cols-2 gap-4">

            {/* Column 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-50 p-2 border">
                  <Thermometer size={16} />
                </div>
                <div className="text-sm">Sanitiser</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-50 p-2 border">
                  <Globe size={16} />
                </div>
                <div className="text-sm">Route expert, Multilingual</div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-3">
              {option.features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-500 mt-1" />
                  <div className="text-sm">{f}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Column */}
        <div className="w-[240px] border-l pl-5 flex flex-col items-end justify-between">
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-800">₹{option.price}</div>
            <div className="text-xs text-gray-500">+ ₹{option.taxes} taxes & fees</div>
          </div>

          <button className="w-full mt-4 py-3 rounded-md bg-[#2d3b78] text-white font-semibold transition hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer">
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   MAIN PAGE (Sort + Date + Sidebar + Cars)
   --------------------------- */

export default function CabSearchFullPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[#f7f7f7]">

      <div className="max-w-7xl mx-auto py-6 px-4">

        {/* SORT BAR (RESTORED) */}
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

          {/* LEFT SIDEBAR */}
          <aside className="w-[320px] bg-white rounded-lg p-6 shadow-sm h-max">
            
            <h3 className="text-lg font-semibold mb-5">Filters</h3>
            {/* 1. Price Drop */}
            <div className="mb-6">
              <CheckItem label="Drop Price" />
            </div>

            {/* 2. Cab Type */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Cab Type</h4>
              <CheckItem label="Sedan" icon={<Car size={16} />} />
              <CheckItem label="SUV" icon={<Car size={16} />} />
            </div>

            {/* 3. Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Price Range</h4>
              <input type="range" min={500} max={6500} className="w-full" />
            </div>

            {/* 4. Pickup Time */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Pickup Time</h4>
              <CheckItem label="Morning" icon={<Sunrise size={16} />} />
              <CheckItem label="Day" icon={<Sun size={16} />} />
              <CheckItem label="Evening" icon={<Sunset size={16} />} />
              <CheckItem label="Night" icon={<Moon size={16} />} />
            </div>

            {/* 5. Fuel Type */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Fuel Type</h4>
              <CheckItem icon={<Zap size={16} />} label="Electric" count={1} />
              <CheckItem icon={<Factory size={16} />} label="CNG" count={1} />
              <CheckItem icon={<Fuel size={16} />} label="Diesel" count={1} />
              <CheckItem icon={<Flame size={16} />} label="Petrol" count={5} />
            </div>

            {/* 6. Car Model */}
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

            {/* 7. Passenger Capacity */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Passenger Capacity</h4>
              <CheckItem label="4 passenger seats" icon={<User size={16} />} />
              <CheckItem label="6 passenger seats" icon={<User size={16} />} />
            </div>

          </aside>

          {/* RIGHT SECTION — CARS + DATE TAB */}
          <main className="flex-1">

            {/* DATE SELECTOR (RESTORED) */}
            <div className="bg-white rounded-lg p-3 mb-6 shadow-sm flex items-center gap-2 overflow-x-auto">
              <button className="min-w-[80px] py-3 px-4 border-b-4 border-[#2d3b78] font-semibold text-sm">
                Today
              </button>
              <div className="min-w-[80px] py-3 px-4 text-sm text-gray-600">
                Tomorrow
              </div>
              <div className="min-w-[80px] py-3 px-4 text-sm text-gray-600">
                03 Wed
              </div>
              <div className="min-w-[80px] py-3 px-4 text-sm text-gray-600">
                04 Thu
              </div>

              <ChevronsLeft className="ml-auto text-gray-400" size={18} />
            </div>

            {/* CARS */}
            <div className="space-y-6">
              {sampleOptions.map((car) => (
                <CarCard key={car.id} option={car} />
              ))}
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
