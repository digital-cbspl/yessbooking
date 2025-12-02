"use client";

import React, { JSX, useState } from "react";
import {
  Star,
  User,
  Wifi,
  Coffee,
  CheckCircle,
  MapPin,
  ChevronDown,
  ChevronsLeft,
  X,
  Search,
  Truck,
} from "lucide-react";

/* ---------------------------
   Types & Sample Data
   --------------------------- */

type BusItem = {
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

// Sample buses
const busesSample: BusItem[] = [
  {
    id: 1,
    operator: "LVP Travels",
    type: "AC Sleeper (2 + 1)",
    rating: "4.3",
    reviews: 162,
    departDate: "01 Dec",
    departTime: "21:00",
    departCity: "Hyderabad",
    arriveDate: "02 Dec",
    arriveTime: "07:00",
    arriveCity: "Bangalore",
    duration: "10:00 Hrs",
    startsAt: 980,
    seatsAvailable: 22,
    upperSeats: Array.from({ length: 18 }, (_, i) => `U${i + 1}`),
    lowerSeats: Array.from({ length: 18 }, (_, i) => `L${i + 1}`),
    booked: ["U6", "U9", "L5", "L7"],
    female: ["U2", "U5", "L6"],
    male: ["U7", "L8", "U12"],
    prices: [1080, 1280, 1980, 2280],
  },
];

/* ---------------------------
   Seat Layout Component
   --------------------------- */

function LegendBox({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-5 h-5 rounded border ${color}`} />
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

type SeatLayoutProps = {
  upper: string[];
  lower: string[];
  booked?: string[];
  female?: string[];
  male?: string[];
  prices?: number[];
  onClose: () => void;
};

function SeatLayout({
  upper,
  lower,
  booked = [],
  female = [],
  male = [],
  prices = [],
  onClose,
}: SeatLayoutProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeFare, setActiveFare] = useState<number | "All">("All");

  const toggleSeat = (s: string) => {
    if (booked.includes(s)) return;
    setSelected((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
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

        {/* Header */}
        <div className="flex justify-between p-4 border-b">
          <div>
            <h3 className="font-semibold">Select Seats</h3>
            <p className="text-xs text-gray-500">Click seat to select/deselect</p>
          </div>

          <div className="flex items-center gap-4">
            <LegendBox color="bg-white border-gray-300" label="Available" />
            <LegendBox color="bg-pink-100 border-pink-300" label="Female" />
            <LegendBox color="bg-blue-100 border-blue-300" label="Male" />
            <LegendBox color="bg-gray-300 border-gray-400" label="Booked" />
            <LegendBox color="bg-[#c5f0d0] border-[#2d8a5a]" label="Selected" />

            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Seats */}
          <div className="flex-1 p-4 overflow-auto">

            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">Seats Available</div>
                <p className="text-xs text-gray-500">Click seats to select</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setActiveFare("All")}
                  className={`px-3 py-1 rounded text-sm ${
                    activeFare === "All" ? "bg-[#e86a33] text-white" : "border bg-white"
                  }`}
                >
                  All
                </button>

                {prices.map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveFare(p)}
                    className={`px-3 py-1 rounded text-sm ${
                      activeFare === p ? "bg-[#fff2ef] border-[#e86a33] text-[#e86a33]" : "border bg-white"
                    }`}
                  >
                    ₹{p}
                  </button>
                ))}
              </div>
            </div>

            {/* Upper */}
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

            {/* Lower */}
            <p className="text-sm mb-2 flex items-center gap-2">
              <Truck size={16} /> Lower
            </p>

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

          {/* Right Summary */}
          <div className="w-[360px] border-l p-4 overflow-auto">
            <div className="relative mb-4">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                className="pl-10 pr-3 py-2 border rounded w-full text-sm"
                placeholder="Search Boarding Point"
              />
            </div>

            <div className="space-y-4 mb-4">
              {["LB Nagar", "Ameerpet", "Miyapur"].map((p) => (
                <label key={p} className="flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1" />
                  <div>{p}</div>
                  <span className="ml-auto text-xs">20:30</span>
                </label>
              ))}
            </div>

            <div className="border-t pt-3 text-sm">
              <div className="flex justify-between mb-2">
                <span>Seat Selected:</span>
                <span className="font-semibold">{selected.join(", ") || "-"}</span>
              </div>

              <div className="flex justify-between">
                <span>Base Fare:</span>
                <span className="font-semibold">-</span>
              </div>

              <button className="mt-4 w-full py-3 rounded bg-gray-200 text-gray-700" disabled>
                Continue
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------------------
   Dropdown Checklist Component
   --------------------------- */

function DropCheck({
  label,
  list,
  name,
  openDropdown,
  setOpenDropdown,
}: {
  label: string;
  list: string[];
  name: string;
  openDropdown: string | null;
  setOpenDropdown: (v: string | null) => void;
}) {
  const isOpen = openDropdown === name;

  return (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : name)}
        className="w-full border rounded-lg py-4 px-4 flex justify-between text-sm"
      >
        {label}
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute w-full top-full mt-2 bg-white border shadow-lg rounded-lg p-3 max-h-56 overflow-auto z-20">
          {list.map((item) => (
            <label key={item} className="flex items-center gap-3 py-2 text-sm">
              <input type="checkbox" className="w-4 h-4" />
              {item}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------
   Main Component
   --------------------------- */

export default function BusSearchFullPage(): JSX.Element {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [busType, setBusType] = useState<string[]>([]);
  const [depTime, setDepTime] = useState<string[]>([]);
  const [showSeats, setShowSeats] = useState(false);
  const [activeBus, setActiveBus] = useState<BusItem | null>(null);

  const toggleBusType = (val: string) => {
    setBusType((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));
  };

  const toggleDepTime = (val: string) => {
    setDepTime((prev) => (prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]));
  };

  const openSeatsForBus = (bus: BusItem) => {
    setActiveBus(bus);
    setShowSeats(true);
  };

  const closeSeats = () => {
    setShowSeats(false);
    setActiveBus(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto py-6 px-4">

        {/* Sort */}
        <div className="bg-white rounded-md px-6 py-4 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="font-medium">Sort By:</span>
            <span>Price</span>
            <span>Seats</span>
            <span>Ratings</span>
            <span>Arrival</span>
            <span>Departure</span>
          </div>
          <div className="text-sm text-orange-600">Showing 211 Buses</div>
        </div>

        <div className="flex gap-6">

          {/* SIDEBAR */}
          <aside className="w-[320px] bg-white rounded-lg p-6 shadow-sm shrink-0 sticky top-4 h-max">

            <h3 className="text-lg font-semibold mb-5">Filters</h3>

            {/* Price Drop */}
            <label className="flex items-center gap-3 text-sm mb-6">
              <input type="checkbox" className="w-4 h-4" /> Price Drop
            </label>

            {/* Bus Type Multi-select */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">Bus Type</h4>
              <div className="grid grid-cols-2 gap-3">

                {[
                  { label: "AC", icon: <Wifi size={18} /> },
                  { label: "Sleeper", icon: <Coffee size={18} /> },
                  { label: "Seater", icon: <User size={18} /> },
                  { label: "Non AC", icon: <CheckCircle size={18} /> },
                ].map((b) => {
                  const active = busType.includes(b.label);
                  return (
                    <button
                      key={b.label}
                      onClick={() => toggleBusType(b.label)}
                      className={`flex items-center gap-2 border rounded-md py-3 px-4 text-sm ${
                        active ? "bg-[#2d3b78] text-white border-[#2d3b78]" : "bg-white"
                      }`}
                    >
                      {b.icon}
                      <span className="text-xs">{b.label}</span>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">Price Range</h4>
              <input type="range" min={500} max={6500} className="w-full" />
            </div>

            {/* Departure Time Multi-select */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-3">Departure Time</h4>
              <div className="grid grid-cols-2 gap-3">

                {["Before 10 AM", "10 AM - 5 PM", "5 PM - 11 PM", "After 11 PM"].map((slot) => {
                  const active = depTime.includes(slot);
                  return (
                    <button
                      key={slot}
                      onClick={() => toggleDepTime(slot)}
                      className={`border rounded-lg py-4 text-sm ${
                        active ? "bg-[#2d3b78] text-white border-[#2d3b78]" : ""
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* CHECKLIST DROPDOWNS */}
            <div className="space-y-4">
              <DropCheck
                label="Bus Partner"
                name="partner"
                list={["VRL Travels", "Orange Travels", "SRS", "KPN"]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />

              <DropCheck
                label="Boarding Point"
                name="boarding"
                list={["Ameerpet", "Miyapur", "LB Nagar", "Kukatpally"]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />

              <DropCheck
                label="Dropping Point"
                name="dropping"
                list={["Silk Board", "Majestic", "KR Puram", "Marathahalli"]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </div>

          </aside>

          {/* MAIN */}
          <main className="flex-1 max-w-[900px] mx-auto">

            {/* Date Tabs */}
            <div className="bg-white rounded-lg p-3 mb-6 shadow-sm">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button className="min-w-[80px] py-3 px-4 border-b-4 border-[#2d3b78] font-semibold text-sm">
                  01 Mon
                </button>

                {dates.slice(1).map((d) => (
                  <div key={d} className="min-w-[80px] py-3 px-4 text-sm text-gray-600">
                    {d}
                  </div>
                ))}

                <div className="ml-auto pr-2">
                  <ChevronsLeft size={18} className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Results list */}
            <div className="space-y-5">
              {busesSample.map((b) => (

                <article key={b.id} className="bg-white shadow-sm rounded-lg flex border overflow-hidden hover:shadow-lg transition">
                  
                  {/* LEFT CONTENT */}
                  <div className="flex-1 p-5">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold">{b.operator}</h3>
                        <p className="text-sm text-gray-500">{b.type}</p>

                        <div className="flex items-center gap-3 mt-3 text-sm">
                          <div className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-1">
                            <Star size={14} /> {b.rating}
                          </div>

                          <div className="text-gray-500 flex items-center gap-1">
                            <User size={14} /> {b.reviews}
                          </div>

                          <div className="text-orange-500 flex items-center gap-1">
                            <Wifi size={14} />
                            <Coffee size={14} />
                            <CheckCircle size={14} />
                            <span className="text-xs">+10</span>
                          </div>

                          <div className="text-gray-600 flex items-center gap-1">
                            <MapPin size={14} /> Live Tracking
                          </div>
                        </div>
                      </div>

                      <div className="text-right text-sm text-gray-600 min-w-[110px]">
                        <p className="text-xs">{b.departDate}</p>
                        <p className="text-2xl font-semibold">{b.departTime}</p>
                        <p className="text-sm">{b.departCity}</p>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center justify-center gap-3 text-sm text-gray-500 my-4">
                      <span className="text-gray-300">• • •</span>
                      <span className="border px-3 py-1 rounded-full">{b.duration}</span>
                      <span className="text-gray-300">• • •</span>
                    </div>

                    {/* Bottom menu */}
                    <div className="border-t pt-3 flex items-center gap-4 text-xs text-gray-600 whitespace-nowrap overflow-x-auto">
                      <button className="flex items-center gap-1 hover:text-[#2d3b78]">
                        Boarding & Dropping Points <ChevronDown size={14} />
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#2d3b78]">
                        Amenities <ChevronDown size={14} />
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#2d3b78]">
                        Cancellation Policy <ChevronDown size={14} />
                      </button>
                      <button className="flex items-center gap-1 hover:text-[#2d3b78]">
                        Travel Policy <ChevronDown size={14} />
                      </button>

                      <span className="text-orange-500">₹100 off for Women</span>
                    </div>
                  </div>

                  {/* RIGHT PRICE COLUMN */}
                  <div className="w-[230px] border-l p-5 flex flex-col justify-center items-end shrink-0">
                    <p className="text-sm text-gray-500">Starting at</p>
                    <p className="text-3xl font-bold">₹{b.startsAt}</p>

                    <button
                      className="mt-4 w-full py-3 rounded text-white font-medium"
                      style={{ backgroundColor: "#2d3b78" }}
                      onClick={() => openSeatsForBus(b)}
                    >
                      Show Seats
                    </button>

                    <p className="text-xs text-gray-500 mt-2">{b.seatsAvailable} Seats Available</p>
                  </div>

                </article>

              ))}
            </div>

          </main>
        </div>
      </div>

      {/* Seat Layout */}
      {showSeats && activeBus && (
        <SeatLayout
          upper={activeBus.upperSeats}
          lower={activeBus.lowerSeats}
          booked={activeBus.booked}
          female={activeBus.female}
          male={activeBus.male}
          prices={activeBus.prices}
          onClose={closeSeats}
        />
      )}
    </div>
  );
}
