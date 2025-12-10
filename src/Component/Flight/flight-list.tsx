"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Coffee,
} from "lucide-react";
import { Airline1, Airline3, Airline6 } from "@/src/assests/image/image";

/**
 * FlightResultsPage — Final
 * - Brand color: #2d3b78 (tint system)
 * - Compact date carousel (very compact): day 9px, date 12px, price 10px, py-1.5
 * - Sidebar (filters) + Sort bar + Date carousel + Flight list
 * - Automatic badges: "Cheapest" (lowest price on selected date) and "Free Meal"
 *
 * Replace image paths (f.logo) with your assets under /public/airlines/...
 */

/* --------------------------
   Types & Sample Data
---------------------------*/
type Flight = {
  id: number;
  date: string;
  airline: string;
  flightNos?: string;
  airlineCode?: string;
  logo: string;
  departAirport: string;
  arriveAirport: string;
  departTime: string;
  arriveTime: string;
  departWindow:
    | "Before 6AM"
    | "6AM - 12PM"
    | "12PM - 6PM"
    | "After 6PM";
  arriveWindow:
    | "Before 6AM"
    | "6AM - 12PM"
    | "12PM - 6PM"
    | "After 6PM";
  durationMins: number;
  stops: number;
  price: number;
  discount?: number;
  badge?: string;
  freeMeal?: boolean;
};

const makeISO = (d: Date) => d.toISOString().slice(0, 10);
const baseDate = new Date("2025-12-10T00:00:00");
const dateItems = Array.from({ length: 7 }).map((_, i) => {
  const dt = new Date(baseDate);
  dt.setDate(baseDate.getDate() + i);
  return {
    iso: makeISO(dt),
    labelDay: dt.toLocaleDateString("en-US", { weekday: "short" }),
    labelDate: dt.getDate(),
    price: [8289, 8382, 6696, 7028, 7868, 6713, 5856][i] ?? 7999,
  };
});

const SAMPLE_FLIGHTS: Flight[] = [
  {
    id: 1,
    date: dateItems[0].iso,
    airline: "IndiGo",
    flightNos: "6E6547, 6E685",
    airlineCode: "6E",
    logo: Airline1.src,
    departAirport: "DEL - Delhi Indira Gandhi Intl",
    arriveAirport: "BOM - Chhatrapati Shivaji Intl",
    departTime: "11:55",
    arriveTime: "19:20",
    departWindow: "6AM - 12PM",
    arriveWindow: "After 6PM",
    durationMins: 445,
    stops: 1,
    price: 12400,
    discount: 310,
    freeMeal: false,
  },
  {
    id: 2,
    date: dateItems[1].iso,
    airline: "Air-India Express",
    flightNos: "IX1242",
    airlineCode: "IX",
    logo: Airline3.src,
    departAirport: "HDO - Hindon Airport",
    arriveAirport: "BOM - Chhatrapati Shivaji Intl",
    departTime: "15:00",
    arriveTime: "17:00",
    departWindow: "12PM - 6PM",
    arriveWindow: "12PM - 6PM",
    durationMins: 120,
    stops: 0,
    price: 13557,
    discount: 400,
    badge: "Fastest",
    freeMeal: true,
  },
  {
    id: 3,
    date: dateItems[2].iso,
    airline: "IndiGo",
    flightNos: "6E354",
    airlineCode: "6E",
    logo: Airline1.src,
    departAirport: "DEL - Delhi Indira Gandhi Intl",
    arriveAirport: "BOM - Chhatrapati Shivaji Intl",
    departTime: "19:00",
    arriveTime: "21:25",
    departWindow: "After 6PM",
    arriveWindow: "After 6PM",
    durationMins: 145,
    stops: 0,
    price: 14168,
    discount: 335,
    freeMeal: false,
  },
  {
    id: 4,
    date: dateItems[0].iso,
    airline: "SpiceJet",
    flightNos: "SG102",
    airlineCode: "SG",
    logo: Airline6.src,
    departAirport: "DEL - Delhi Indira Gandhi Intl",
    arriveAirport: "BOM - Chhatrapati Shivaji Intl",
    departTime: "08:30",
    arriveTime: "10:55",
    departWindow: "6AM - 12PM",
    arriveWindow: "6AM - 12PM",
    durationMins: 145,
    stops: 0,
    price: 15348,
    discount: 200,
    freeMeal: true,
  },
];

/* --------------------------
   Helpers
---------------------------*/
const timeWindows = [
  "Before 6AM",
  "6AM - 12PM",
  "12PM - 6PM",
  "After 6PM",
] as const;

function minsToHrs(mins: number) {
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

/* --------------------------
   DateCarousel (compact)
   - Day: text-[9px]
   - Date: text-[12px]
   - Price: text-[10px]
   - Button padding: py-1.5 (compact)
---------------------------*/
function DateCarousel({
  dates,
  selected,
  onSelect,
}: {
  dates: { iso: string; labelDay: string; labelDate: number; price: number }[];
  selected: string;
  onSelect: (iso: string) => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -offset : offset, behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const selectedEl = el.querySelector(`[data-iso="${selected}"]`) as HTMLElement | null;
    if (selectedEl) {
      const left = selectedEl.offsetLeft - el.clientWidth / 2 + selectedEl.clientWidth / 2;
      el.scrollTo({ left, behavior: "smooth" });
    }
  }, [selected]);

  return (
    <div className="bg-white rounded-lg p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={() => scrollBy("left")}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="prev"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-2 overflow-x-auto no-scrollbar px-1 py-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {dates.map((d) => {
            const active = d.iso === selected;
            return (
              <button
                key={d.iso}
                data-iso={d.iso}
                onClick={() => onSelect(d.iso)}
                className={`min-w-[96px] flex-shrink-0 rounded-md px-3 ${active ? "bg-[#2d3b78] text-white" : "bg-white text-gray-700 border border-[#2d3b78]/40"} py-1.5`}
                style={{ minHeight: 30 }}
              >
                <div className="text-[9px] leading-3">{d.labelDay}</div>
                <div className="text-[12px] font-semibold leading-4">{d.labelDate}</div>
                <div className={`text-[10px] mt-1 ${active ? "text-white" : "text-[#2d3b78]"}`}>
                  ₹{d.price.toLocaleString("en-IN")}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollBy("right")}
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* --------------------------
   TimeCard (sidebar) using brand tint
---------------------------*/
function TimeCard({
  label,
  price,
  active,
  onClick,
}: {
  label: string;
  price?: number | string;
  active?: boolean;
  onClick?: () => void;
}) {
  const icons: Record<string, JSX.Element> = {
    "Before 6AM": <Sunrise size={14} />,
    "6AM - 12PM": <Sun size={14} />,
    "12PM - 6PM": <Sunset size={14} />,
    "After 6PM": <Moon size={14} />,
  };

  return (
    <button
      onClick={onClick}
      className={`border rounded-lg p-3 flex flex-col gap-1 text-left ${active ? "ring-[#2d3b78] bg-[#2d3b78]/10" : "bg-white"}`}
    >
      <div className="flex items-center gap-2 text-xs text-gray-600">
        {icons[label]} {label}
      </div>
      <div className="text-sm font-semibold">₹{String(price)}</div>
    </button>
  );
}

/* --------------------------
   FlightCard (with automatic badges; brand color used)
---------------------------*/
function FlightCard({
  f,
  cheapest,
  onBook,
  onDetails,
}: {
  f: Flight;
  cheapest?: boolean;
  onBook: (f: Flight) => void;
  onDetails: (f: Flight) => void;
}) {
  return (
    <article className="relative bg-white rounded-xl shadow-sm border border-[#2d3b78]/40 p-4 flex items-center gap-4">
      {/* Badges top-left */}
      <div className="absolute left-4 -top-3 flex gap-2">
        {cheapest ? (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full border border-[#2d3b78]/40 text-[#2d3b78] bg-white text-xs font-semibold">
            <Star size={12} /> Cheapest
          </span>
        ) : null}
        {f.freeMeal ? (
          <span className="flex items-center gap-1 px-2 py-1 rounded-full border border-[#2d3b78]/40 bg-[#ffffff] text-xs font-semibold text-[#7a5f11]">
            <Coffee size={12} /> Free Meal
          </span>
        ) : null}
      </div>

      <div className="flex-shrink-0 flex items-center gap-3 w-48">
        <div className="w-12 h-12 rounded-md overflow-hidden flex items-center justify-center bg-white">
          <img src={f.logo} alt={f.airline} className="w-15 h-15 object-contain" />
        </div>
        <div className="text-sm">
          <div className="font-semibold">{f.airline}</div>
          <div className="text-xs text-gray-500">{f.flightNos}</div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-6">
        <div className="text-center min-w-[90px]">
          <div className="text-xl font-semibold">{f.departTime}</div>
          <div className="text-xs text-gray-500">{f.departAirport.split(" - ")[0]}</div>
        </div>

        <div className="flex flex-col items-center text-center text-xs text-gray-500">
          <div className="text-sm font-medium">{minsToHrs(f.durationMins)}</div>
          <div className="w-24 my-2 border-t"></div>
          <div>{f.stops === 0 ? "Non-stop" : `${f.stops} stop${f.stops > 1 ? "s" : ""}`}</div>
        </div>

        <div className="text-center min-w-[90px]">
          <div className="text-xl font-semibold">{f.arriveTime}</div>
          <div className="text-xs text-gray-500">{f.arriveAirport.split(" - ")[0]}</div>
        </div>
      </div>

      <div className="w-56 flex flex-col items-end gap-3">
        <div className="text-right">
          <div className="text-2xl font-bold">₹{f.price.toLocaleString("en-IN")}</div>
          {f.discount ? <div className="text-sm text-green-600">Extra ₹{f.discount} Off</div> : null}
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => onBook(f)} className="px-5 py-2 rounded-full bg-[#2d3b78] text-white font-medium hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition">
            Book
          </button>

          <div className="text-sm text-[#e93216] cursor-pointer" onClick={() => onDetails(f)}>
            Flight Details &gt;
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
          {f.badge ? <span className="px-2 py-1 bg-[#2d3b78]/10 text-[#2d3b78] rounded-full text-xs font-semibold">{f.badge}</span> : null}
          <span className="px-2 py-1 rounded-md bg-gray-50 text-gray-600 border text-xs">Lock Price ₹1,799</span>
        </div>
      </div>
    </article>
  );
}

/* --------------------------
   Main Page
---------------------------*/
export default function FlightResultsPage() {
  // states
  const [selectedDate, setSelectedDate] = useState<string>(dateItems[0].iso);
  const [sortBy, setSortBy] = useState<string>("departure");
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // sidebar filter states
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const p = SAMPLE_FLIGHTS.map((f) => f.price);
    return [Math.min(...p), Math.max(...p)];
  });
  const [durationRange, setDurationRange] = useState<[number, number]>(() => {
    const d = SAMPLE_FLIGHTS.map((f) => f.durationMins);
    return [Math.min(...d), Math.max(...d)];
  });
  const [selectedStops, setSelectedStops] = useState<number | null>(null);
  const [airlineChecks, setAirlineChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(Array.from(new Set(SAMPLE_FLIGHTS.map((s) => s.airline))).map((a) => [a, false]))
  );
  const [departureAirportChecks, setDepartureAirportChecks] = useState<Record<string, boolean>>(
    Object.fromEntries(Array.from(new Set(SAMPLE_FLIGHTS.map((s) => s.departAirport))).map((d) => [d, false]))
  );
  const [selectedDepartWindows, setSelectedDepartWindows] = useState<Record<string, boolean>>(
    Object.fromEntries(timeWindows.map((t) => [t, false]))
  );
  const [selectedArriveWindows, setSelectedArriveWindows] = useState<Record<string, boolean>>(
    Object.fromEntries(timeWindows.map((t) => [t, false]))
  );
  const [recommendedFilters, setRecommendedFilters] = useState<Record<string, boolean>>({
    "Non-Stop": false,
    "Free meal available": false,
    "Air India": false,
    IndiGo: false,
  });

  const globalMinPrice = Math.min(...SAMPLE_FLIGHTS.map((f) => f.price));
  const globalMaxPrice = Math.max(...SAMPLE_FLIGHTS.map((f) => f.price));
  const globalMinDuration = Math.min(...SAMPLE_FLIGHTS.map((f) => f.durationMins));
  const globalMaxDuration = Math.max(...SAMPLE_FLIGHTS.map((f) => f.durationMins));

  const clearAll = () => {
    setSortBy("departure");
    setPriceRange([globalMinPrice, globalMaxPrice]);
    setDurationRange([globalMinDuration, globalMaxDuration]);
    setSelectedStops(null);
    setAirlineChecks(Object.fromEntries(Object.keys(airlineChecks).map((k) => [k, false])));
    setDepartureAirportChecks(Object.fromEntries(Object.keys(departureAirportChecks).map((k) => [k, false])));
    setSelectedDepartWindows(Object.fromEntries(timeWindows.map((t) => [t, false])));
    setSelectedArriveWindows(Object.fromEntries(timeWindows.map((t) => [t, false])));
    setRecommendedFilters({
      "Non-Stop": false,
      "Free meal available": false,
      "Air India": false,
      IndiGo: false,
    });
  };

  // filtered flights by date + sidebar filters
  const flightsByDate = useMemo(() => {
    let results = SAMPLE_FLIGHTS.filter((f) => f.date === selectedDate);

    results = results.filter((f) => {
      if (f.price > priceRange[1]) return false;
      if (f.durationMins > durationRange[1]) return false;

      if (selectedStops !== null) {
        if (selectedStops === 0 && f.stops !== 0) return false;
        if (selectedStops === 1 && f.stops !== 1) return false;
        if (selectedStops === 2 && f.stops < 2) return false;
      }

      if (Object.values(airlineChecks).some(Boolean) && !airlineChecks[f.airline]) return false;
      if (Object.values(departureAirportChecks).some(Boolean) && !departureAirportChecks[f.departAirport]) return false;

      if (recommendedFilters["Non-Stop"] && f.stops !== 0) return false;
      if (recommendedFilters["Free meal available"] && !f.freeMeal) return false;

      if (Object.values(selectedDepartWindows).some(Boolean) && !selectedDepartWindows[f.departWindow]) return false;
      if (Object.values(selectedArriveWindows).some(Boolean) && !selectedArriveWindows[f.arriveWindow]) return false;

      return true;
    });

    if (sortBy === "departure") {
      results = results.sort((a, b) => Number(a.departTime.replace(":", "")) - Number(b.departTime.replace(":", "")));
    } else if (sortBy === "arrival") {
      results = results.sort((a, b) => Number(a.arriveTime.replace(":", "")) - Number(b.arriveTime.replace(":", "")));
    } else if (sortBy === "duration") {
      results = results.sort((a, b) => a.durationMins - b.durationMins);
    } else if (sortBy === "fare") {
      results = results.sort((a, b) => a.price - b.price);
    }

    return results;
  }, [
    selectedDate,
    priceRange,
    durationRange,
    selectedStops,
    airlineChecks,
    departureAirportChecks,
    recommendedFilters,
    selectedDepartWindows,
    selectedArriveWindows,
    sortBy,
  ]);

  // compute cheapest flight id for the selected date
  const cheapestFlightId = useMemo(() => {
    const list = flightsByDate;
    if (!list.length) return null;
    let min = list[0].price;
    let id = list[0].id;
    for (const f of list) {
      if (f.price < min) {
        min = f.price;
        id = f.id;
      }
    }
    return id;
  }, [flightsByDate]);

  const handleBook = (f: Flight) => {
    alert(`Booking ${f.airline} ${f.flightNos} on ${f.date} — ₹${f.price}`);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto py-6 px-4 space-y-4">
        {/* Sort bar */}
        <div className="bg-white rounded-md px-6 py-4 mb-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="font-medium">Sort By:</span>
            <button onClick={() => setSortBy("departure")} className={sortBy === "departure" ? "font-semibold text-[#2d3b78]" : ""}>Departure</button>
            <button onClick={() => setSortBy("arrival")} className={sortBy === "arrival" ? "font-semibold text-[#2d3b78]" : ""}>Arrival</button>
            <button onClick={() => setSortBy("duration")} className={sortBy === "duration" ? "font-semibold text-[#2d3b78]" : ""}>Duration</button>
            <button onClick={() => setSortBy("fare")} className={sortBy === "fare" ? "font-semibold text-[#2d3b78]" : ""}>Fare</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">{flightsByDate.length} flights</div>
            <button onClick={clearAll} className="text-sm text-[#2d3b78] underline">Clear All</button>
          </div>
        </div>

        {/* Layout: Sidebar + Main */}
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-[320px] bg-white rounded-lg p-6 shadow-sm sticky top-20 h-max">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>

            {/* Recommended */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Recommended Filters</h4>
                <span className="text-xs text-gray-500">All</span>
              </div>
              <div className="space-y-2 text-sm">
                {Object.keys(recommendedFilters).map((k) => (
                  <label key={k} className="flex items-center gap-3">
                    <input type="checkbox" checked={recommendedFilters[k]} onChange={() => setRecommendedFilters(prev => ({ ...prev, [k]: !prev[k] }))} className="w-4 h-4" />
                    <span>{k}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stops */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-3">Stops</h4>
              <div className="grid grid-cols-3 gap-3">
                {[ { label: "Non-Stop", value: 0, price: "12,488" }, { label: "1 Stop", value: 1, price: "10,498" }, { label: "2+ Stops", value: 2, price: "19,626" } ].map(s => (
                  <button key={s.label} onClick={() => setSelectedStops(s.value)} className={`border rounded-lg py-3 text-sm ${selectedStops === s.value ? "ring-[#2d3b78] bg-[#2d3b78]/10" : "bg-white"}`}>
                    <div className="text-xs">{s.label}</div>
                    <div className="font-semibold mt-1">₹{s.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-3">Flight Price</h4>
              <input type="range" min={globalMinPrice} max={globalMaxPrice} value={priceRange[1]} onChange={(e) => setPriceRange([globalMinPrice, Number(e.target.value)])} className="w-full accent-[#2d3b78]" />
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>₹{globalMinPrice.toLocaleString("en-IN")}</span>
                <span>₹{globalMaxPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="mt-2 text-sm font-semibold">Up to ₹{priceRange[1].toLocaleString("en-IN")}</div>
            </div>

            {/* Duration */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-3">Duration</h4>
              <input type="range" min={globalMinDuration} max={globalMaxDuration} value={durationRange[1]} onChange={(e) => setDurationRange([globalMinDuration, Number(e.target.value)])} className="w-full accent-[#2d3b78]" />
              <div className="flex justify-between text-xs mt-2 text-gray-600">
                <span>{Math.floor(globalMinDuration / 60)}h</span>
                <span>{Math.floor(globalMaxDuration / 60)}h</span>
              </div>
              <div className="mt-2 text-sm font-semibold">{Math.floor(durationRange[1] / 60)}h max</div>
            </div>

            {/* Airlines */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">Airlines</h4>
                <span className="text-xs text-gray-500">All</span>
              </div>
              <div className="space-y-3">
                {Object.keys(airlineChecks).map(a => {
                  const sample = SAMPLE_FLIGHTS.find(s => s.airline === a)!;
                  return (
                    <label key={a} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-sm flex items-center justify-center text-xl">
                          <img src={sample.logo} alt={a} className="w-6 h-6 object-contain" />
                        </div>
                        <div className="text-sm">{a} <span className="text-xs text-gray-400">({SAMPLE_FLIGHTS.filter(f => f.airline===a).length})</span></div>
                      </div>
                      <input type="checkbox" checked={airlineChecks[a]} onChange={() => setAirlineChecks(prev => ({ ...prev, [a]: !prev[a] }))} className="w-4 h-4" />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Departure Airport */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-3">Departure Airport</h4>
              <div className="space-y-3 text-sm">
                {Object.keys(departureAirportChecks).map(d => {
                  const sample = SAMPLE_FLIGHTS.find(s => s.departAirport === d)!;
                  return (
                    <label key={d} className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{d.split(" - ")[0]}</div>
                        <div className="text-xs text-gray-500">{d.split(" - ")[1]}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold">₹{sample.price?.toLocaleString("en-IN")}</div>
                        <input type="checkbox" checked={departureAirportChecks[d]} onChange={() => setDepartureAirportChecks(prev => ({ ...prev, [d]: !prev[d] }))} className="w-4 h-4" />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Departure time */}
            <div className="mb-5">
              <h4 className="text-sm font-semibold mb-3">Departure Time</h4>
              <div className="grid grid-cols-2 gap-3">
                {timeWindows.map(t => (
                  <TimeCard key={t} label={t} price={SAMPLE_FLIGHTS.find(s => s.departWindow === t)?.price ?? "—"} active={selectedDepartWindows[t]} onClick={() => setSelectedDepartWindows(prev => ({ ...prev, [t]: !prev[t] }))} />
                ))}
              </div>
            </div>

            {/* Arrival time */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Arrival Time</h4>
              <div className="grid grid-cols-2 gap-3">
                {timeWindows.map(t => (
                  <TimeCard key={`a-${t}`} label={t} price={SAMPLE_FLIGHTS.find(s => s.arriveWindow === t)?.price ?? "—"} active={selectedArriveWindows[t]} onClick={() => setSelectedArriveWindows(prev => ({ ...prev, [t]: !prev[t] }))} />
                ))}
              </div>
            </div>
          </aside>

          {/* Main: Date carousel + flight list */}
          <main className="flex-1 space-y-4">
            <DateCarousel dates={dateItems} selected={selectedDate} onSelect={setSelectedDate} />

            <div className="space-y-3">
              {flightsByDate.length === 0 ? (
                <div className="bg-white rounded-lg p-6 text-center text-gray-600">No flights for the selected date.</div>
              ) : (
                flightsByDate.map(f => (
                  <FlightCard key={f.id} f={f} cheapest={cheapestFlightId === f.id} onBook={handleBook} onDetails={(ff) => setSelectedFlight(ff)} />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Details modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/40 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="flex items-start justify-between p-5 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md overflow-hidden flex items-center justify-center bg-white">
                  <img src={selectedFlight.logo} alt="" className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedFlight.airline}</h3>
                  <div className="text-xs text-gray-500">{selectedFlight.flightNos}</div>
                </div>
              </div>
              <button onClick={() => setSelectedFlight(null)} className="p-2 rounded hover:bg-gray-100"><X size={18} /></button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Stops</div>
                  <div className="font-semibold">{selectedFlight.stops === 0 ? "Non-stop" : `${selectedFlight.stops} stops`}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Departure</div>
                  <div className="font-semibold">{selectedFlight.departAirport} • {selectedFlight.departTime}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Arrival</div>
                  <div className="font-semibold">{selectedFlight.arriveAirport} • {selectedFlight.arriveTime}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-500 text-sm">Price</div>
                  <div className="text-2xl font-semibold">₹{selectedFlight.price.toLocaleString("en-IN")}</div>
                </div>
                <div>
                  <button className="px-6 py-2 bg-[#2d3b78] text-white rounded-full hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition">Continue to Book</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
