"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  MapPin,
  CalendarDays,
  Search,
  Car,
  StopCircle,
  X,
  LocateFixed,
} from "lucide-react";
import { BiTrip } from "react-icons/bi";

/* ---------------------------------------
   SAMPLE CITY DATA
--------------------------------------- */

const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Goa",
  "Jaipur",
  "Ahmedabad",
  "Lucknow",
];

const recentSearch = [
  { title: "Puri Beach, Puri, Odisha, India", sub: "puri" },
];

const popularSearch = [
  { title: "Bangalore, Karnataka, India", sub: "bengaluru" },
  { title: "Mysuru, Karnataka, India", sub: "mysuru" },
];

/* ---------------------------------------
   STOP POPUP COMPONENT
--------------------------------------- */

function StopPopup({
  stopNumber,
  value,
  onSelect,
  onClose,
}: {
  stopNumber: number;
  value: string;
  onSelect: (v: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState(value);

  // Filter cities based on query
  const filtered = CITIES.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-xl max-h-[80vh] overflow-y-auto relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-slate-100"
        >
          <X size={20} className="text-slate-500" />
        </button>

        {/* TITLE */}
        <h3 className="text-lg font-semibold">Stop {stopNumber}</h3>

        {/* INPUT */}
        <div className="relative">
          <input
            type="text"
            placeholder={`Enter stop ${stopNumber}`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSelect(e.target.value);
            }}
            className="mt-3 w-full rounded-xl border border-blue-400 px-4 py-3 outline-none"
          />

          {/* LIVE CITY SEARCH LIST */}
          {query.length > 0 && (
            <ul className="absolute left-0 top-full z-50 mt-1 max-h-48 w-full overflow-auto rounded-xl border bg-white shadow-lg text-sm">
              {filtered.length > 0 ? (
                filtered.map((city) => (
                  <li
                    key={city}
                    onMouseDown={() => {
                      onSelect(city);
                      setQuery(city);
                    }}
                    className="cursor-pointer px-3 py-2 hover:bg-slate-100"
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-slate-400 text-xs">
                  No matches found
                </li>
              )}
            </ul>
          )}
        </div>

        {/* USE CURRENT LOCATION */}
        <div className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-3 hover:bg-slate-100">
          <LocateFixed size={20} className="text-blue-600" />
          <span className="text-blue-600 font-medium">Use Current Location</span>
        </div>

        {/* RECENT SEARCHES */}
        <h4 className="mt-6 text-sm font-semibold text-slate-500">
          Recent Searches
        </h4>

        <div className="mt-1 rounded-xl border bg-white">
          {recentSearch.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setQuery(item.title);
                onSelect(item.title);
              }}
              className="flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-slate-100 last:border-none"
            >
              <MapPin size={20} className="text-slate-600" />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* POPULAR SEARCHES */}
        <h4 className="mt-6 text-sm font-semibold text-slate-500">
          Popular Searches
        </h4>

        <div className="mt-1 rounded-xl border bg-white">
          {popularSearch.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setQuery(item.title);
                onSelect(item.title);
              }}
              className="flex cursor-pointer items-center gap-3 border-b p-4 hover:bg-slate-100 last:border-none"
            >
              <MapPin size={20} className="text-slate-600" />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* DONE BUTTON */}
        <button
          onClick={onClose}
          className="mt-6 w-full rounded-full bg-orange-500 py-3 text-white font-semibold"
        >
          DONE
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------
   MAIN PAGE
--------------------------------------- */

export default function CabSearch() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fromCity: "",
    toCity: "",
    travelDate: today,
    pickupTime: "",
    tripType: "",
  });

  const [activeField, setActiveField] =
    useState<"fromCity" | "toCity" | null>(null);

  /* ---------------------- Dynamic Stops ---------------------- */

  const [stops, setStops] = useState<string[]>([]);
  const [openStopIndex, setOpenStopIndex] = useState<number | null>(null);

  const addStop = () => {
    setStops((prev) => [...prev, ""]);
    setOpenStopIndex(stops.length);
  };

  const updateStop = (index: number, value: string) => {
    const updated = [...stops];
    updated[index] = value;
    setStops(updated);
  };

  const removeStop = (index: number) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
  };

  /* ---------------------- Form Input Logic ---------------------- */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const filteredCities = (field: "fromCity" | "toCity") => {
    const q = formData[field].toLowerCase();
    return CITIES.filter((c) => c.toLowerCase().includes(q));
  };

  const handleSelectCity = (field: "fromCity" | "toCity", city: string) => {
    setFormData((prev) => ({ ...prev, [field]: city }));
    setActiveField(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);
    console.log("STOPS:", stops);
  };

  /* ---------------------------------------
     UI
  --------------------------------------- */

  return (
    <div className="bg-slate-50 text-slate-900 h-auto">
      <section className="relative z-20 flex min-h-[55vh] items-center justify-center bg-gradient-to-br from-sky-100 via-sky-50 to-white px-4 py-8">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-right bg-cover opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        />

        <div className="relative z-30 w-full max-w-[100%] text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-wide text-slate-900">
            A Journey of Comfort Awaits You
          </h1>
          <p className="mt-2 text-base sm:text-lg text-slate-600">
            Your Trusted Partner for Smooth Cab Travel
          </p>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-wrap w-full items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
          >
            {/* TRIP TYPE */}
            <div className="relative flex min-w-[220px] flex-1 items-center gap-3 border-r pr-4 border-slate-200">
              <div className="h-10 w-10 rounded-full bg-[#2d3b78]/10 flex items-center justify-center text-[#2d3b78]">
                <BiTrip size={18} />
              </div>

              <div className="flex flex-col text-left w-full">
                <span className="text-[11px] text-slate-500 tracking-[0.2em] font-semibold uppercase">
                  Trip Type
                </span>

                <select
                  name="tripType"
                  value={formData.tripType}
                  onChange={handleChange}
                  className="bg-transparent outline-none text-sm font-medium mt-0.5"
                >
                  <option value="">Select trip type</option>
                  <option value="Outstation One Way">Outstation One Way</option>
                  <option value="Outstation Round Trip">
                    Outstation Round Trip
                  </option>
                  <option value="Local 8hr/80km">Local 8hr / 80km</option>
                  <option value="Airport Transfer">Airport Transfer</option>
                </select>
              </div>
            </div>

            {/* FROM */}
            <div className="relative flex min-w-[230px] flex-1 items-center gap-3 border-r pr-4 border-slate-200">
              <div className="h-10 w-10 rounded-full bg-[#2d3b78]/10 flex items-center justify-center text-[#2d3b78]">
                <Car size={20} />
              </div>

              <div className="flex flex-col w-full text-left relative">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                  From
                </span>

                <input
                  type="search"
                  name="fromCity"
                  value={formData.fromCity}
                  placeholder="Pickup location"
                  onChange={handleChange}
                  onFocus={() => setActiveField("fromCity")}
                  className="bg-transparent mt-0.5 outline-none text-sm font-medium"
                  autoComplete="off"
                />

                {activeField === "fromCity" && (
                  <ul className="absolute top-full left-0 z-50 bg-white border mt-1 max-h-40 overflow-auto w-full rounded-xl shadow-lg text-sm">
                    {filteredCities("fromCity").map((city) => (
                      <li
                        key={city}
                        onMouseDown={() => handleSelectCity("fromCity", city)}
                        className="px-3 py-2 cursor-pointer hover:bg-slate-100"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* TO */}
            <div className="relative flex min-w-[230px] flex-1 items-center gap-3 border-r pr-4 border-slate-200">
              <div className="h-10 w-10 rounded-full bg-[#2d3b78]/10 flex items-center justify-center text-[#2d3b78]">
                <MapPin size={20} />
              </div>

              <div className="flex flex-col w-full text-left relative">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                  To
                </span>

                <input
                  type="search"
                  name="toCity"
                  value={formData.toCity}
                  placeholder="Drop location"
                  onChange={handleChange}
                  onFocus={() => setActiveField("toCity")}
                  className="bg-transparent mt-0.5 outline-none text-sm font-medium"
                  autoComplete="off"
                />

                {activeField === "toCity" && (
                  <ul className="absolute top-full left-0 z-50 bg-white border mt-1 max-h-40 overflow-auto w-full rounded-xl shadow-lg text-sm">
                    {filteredCities("toCity").map((city) => (
                      <li
                        key={city}
                        onMouseDown={() => handleSelectCity("toCity", city)}
                        className="px-3 py-2 cursor-pointer hover:bg-slate-100"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* ADD STOPS */}
            <div className="flex min-w-[160px] flex-1 items-center gap-3 border-r pr-4 border-slate-200">
              <div className="h-10 w-10 rounded-full bg-[#2d3b78]/10 flex items-center justify-center text-[#2d3b78]">
                <StopCircle size={18} />
              </div>

              <div className="flex flex-col w-full text-left">
                <span className="text-[11px] tracking-[0.18em] uppercase text-slate-500 font-semibold">
                  Stops
                </span>

                <button
                  type="button"
                  onClick={addStop}
                  className="text-sm font-medium text-[#2d3b78] mt-0.5"
                >
                  + Add Stop
                </button>
              </div>
            </div>

            {/* DATE */}
            <div className="flex min-w-[200px] flex-1 items-center gap-3 border-r pr-4 border-slate-200">
              <div className="h-10 w-10 rounded-full bg-[#2d3b78]/10 flex items-center justify-center text-[#2d3b78]">
                <CalendarDays size={20} />
              </div>

              <div className="flex flex-col w-full">
                <span className="text-[11px] tracking-[0.18em] uppercase text-slate-500 font-semibold">
                  Pickup Date
                </span>

                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  min={today}
                  onChange={handleChange}
                  className="bg-transparent mt-0.5 outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* TIME */}
            <div className="flex min-w-[160px] flex-1 items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#2d3b78]/10 flex items-center justify-center text-[#2d3b78]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M12 7v5l4 2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col w-full">
                <span className="text-[11px] tracking-[0.18em] uppercase text-slate-500 font-semibold">
                  Pickup Time
                </span>

                <input
                  type="time"
                  name="pickupTime"
                  onChange={handleChange}
                  className="bg-transparent mt-0.5 outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#2d3b78] px-7 py-3.5 text-sm font-semibold text-white hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/10">
                <Search size={18} />
              </span>
              Search
            </button>
          </form>

          {/* DISPLAY SELECTED STOPS BELOW */}
          {stops.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {stops.map((st, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-1 bg-white border shadow rounded-full"
                >
                  <span className="text-sm">{`Stop ${i + 1}: ${
                    st || "Not selected"
                  }`}</span>
                  <X
                    size={16}
                    className="cursor-pointer text-slate-500"
                    onClick={() => removeStop(i)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* STOP POPUP RENDER */}
      {openStopIndex !== null && (
        <StopPopup
          stopNumber={openStopIndex + 1}
          value={stops[openStopIndex]}
          onSelect={(v) => updateStop(openStopIndex, v)}
          onClose={() => setOpenStopIndex(null)}
        />
      )}
    </div>
  );
}
