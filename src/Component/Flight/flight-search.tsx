"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { MapPin, CalendarDays, Repeat, Search, Users } from "lucide-react";

const AIRPORTS = [
  "New Delhi (DEL)",
  "Mumbai (BOM)",
  "Bhubaneswar (BBI)",
  "Bangalore (BLR)",
  "Hyderabad (HYD)",
  "Chennai (MAA)",
  "Pune (PNQ)",
  "Kolkata (CCU)",
];

const FlightSearch: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [tripType, setTripType] = useState<"oneway" | "round">("oneway");

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure: today,
    returnDate: "",
    travellers: "1 Adult",
    cls: "Economy",
  });

  const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* TRAVELLER POPUP */
  const [travellerOpen, setTravellerOpen] = useState(false);
  const travellerRef = useRef<HTMLDivElement | null>(null);

  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [flightClass, setFlightClass] = useState("Economy");

  /* OUTSIDE CLICK CLOSE */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveField(null);
      }
      if (travellerRef.current && !travellerRef.current.contains(e.target as Node)) {
        setTravellerOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* FILTER AIRPORTS */
  const filteredAirports = (field: "from" | "to") => {
    const q = (field === "from" ? formData.from : formData.to).toLowerCase();
    return AIRPORTS.filter((a) => a.toLowerCase().includes(q));
  };

  const selectAirport = (field: "from" | "to", value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setActiveField(null);
  };

  /* UPDATE TRAVELLER COUNTS */
  const updateTraveller = (key: "adults" | "children" | "infants", val: number) => {
    setTravellers((prev) => {
      const updated = { ...prev, [key]: Math.max(0, val) };

      setFormData((p) => ({
        ...p,
        travellers:
          `${updated.adults} Adult${updated.adults > 1 ? "s" : ""}` +
          (updated.children > 0
            ? `, ${updated.children} Child${updated.children > 1 ? "ren" : ""}`
            : "") +
          (updated.infants > 0
            ? `, ${updated.infants} Infant${updated.infants > 1 ? "s" : ""}`
            : ""),
        cls: flightClass,
      }));

      return updated;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="bg-slate-50 text-slate-900">

      {/* ADDED TOP PADDING SO BANNER DOES NOT OVERLAP HEADER */}
      <section className="relative z-20 flex items-center justify-center min-h-[55vh] px-4 py-8 pt-[100px] bg-gradient-to-br from-sky-100 via-sky-50 to-white">

        {/* BACKGROUND IMAGE */}
        <div
          className="pointer-events-none absolute inset-0 bg-right bg-cover opacity-25"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress')",
          }}
        />

        <div className="relative z-30 w-full max-w-[100%] flex flex-col items-center gap-6">

          {/* HEADING */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
              A Journey of Comfort Awaits You
            </h1>
            <p className="mt-1 text-slate-600">
              Your Trusted Partner for Smooth Flight Booking
            </p>
          </div>

          {/* SEARCH FORM CONTAINER */}
          <div
            ref={containerRef}
            className="w-full rounded-3xl bg-white px-6 py-5 shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
          >

            {/* TRIP TYPE */}
            <div className="flex gap-3 mb-3">
              <button
                type="button"
                onClick={() => {
                  setTripType("oneway");
                  setFormData((prev) => ({ ...prev, returnDate: "" }));
                }}
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  tripType === "oneway"
                    ? "bg-[#2d3b78] text-white"
                    : "border border-slate-300 text-slate-600"
                }`}
              >
                One Way
              </button>

              <button
                type="button"
                onClick={() => setTripType("round")}
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  tripType === "round"
                    ? "bg-[#2d3b78] text-white"
                    : "border border-slate-300 text-slate-600"
                }`}
              >
                Round Trip
              </button>
            </div>

            {/* MAIN FORM */}
            <form
              onSubmit={handleSearch}
              className="flex items-stretch gap-3 flex-nowrap"
            >
              {/* FROM */}
              <div className="relative flex min-w-[240px] flex-1 items-start gap-2 border-r border-slate-200 pr-3">
                <div className="h-10 w-10 mt-1 rounded-full bg-[#2d3b78]/10 text-[#2d3b78] flex items-center justify-center">
                  <MapPin size={18} />
                </div>

                <div className="flex flex-col flex-1 pt-1">
                  <label className="text-[11px] uppercase font-semibold text-slate-500">
                    From
                  </label>

                  <input
                    name="from"
                    value={formData.from}
                    placeholder="From"
                    onChange={handleChange}
                    onFocus={() => setActiveField("from")}
                    className="mt-1 text-sm font-medium outline-none"
                  />

                  {activeField === "from" && (
                    <ul className="absolute left-14 top-full mt-2 w-[280px] rounded-lg max-h-48 overflow-auto shadow-xl border bg-white text-sm z-50">
                      {filteredAirports("from").map((a) => (
                        <li
                          key={a}
                          onMouseDown={() => selectAirport("from", a)}
                          className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* SWAP */}
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    from: prev.to,
                    to: prev.from,
                  }))
                }
                className="h-9 w-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center self-center"
              >
                <Repeat size={16} />
              </button>

              {/* TO */}
              <div className="relative flex min-w-[240px] flex-1 items-start gap-2 border-r border-slate-200 pr-3">
                <div className="h-10 w-10 mt-1 rounded-full bg-[#2d3b78]/10 text-[#2d3b78] flex items-center justify-center">
                  <MapPin size={18} />
                </div>

                <div className="flex flex-col flex-1 pt-1">
                  <label className="text-[11px] uppercase font-semibold text-slate-500">
                    To
                  </label>

                  <input
                    name="to"
                    value={formData.to}
                    placeholder="To"
                    onChange={handleChange}
                    onFocus={() => setActiveField("to")}
                    className="mt-1 text-sm font-medium outline-none"
                  />

                  {activeField === "to" && (
                    <ul className="absolute left-14 top-full mt-2 w-[280px] rounded-lg max-h-48 overflow-auto shadow-xl border bg-white text-sm z-50">
                      {filteredAirports("to").map((a) => (
                        <li
                          key={a}
                          onMouseDown={() => selectAirport("to", a)}
                          className="px-3 py-2 hover:bg-slate-100 cursor-pointer"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* DEPARTURE */}
              <div className="flex min-w-[200px] flex-1 items-start gap-2 border-r border-slate-200 pr-3">
                <div className="h-10 w-10 mt-1 rounded-full bg-[#2d3b78]/10 text-[#2d3b78] flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>

                <div className="flex flex-col flex-1 pt-1">
                  <label className="text-[11px] uppercase font-semibold text-slate-500">
                    Departure
                  </label>

                  <input
                    type="date"
                    name="departure"
                    min={today}
                    value={formData.departure}
                    onChange={handleChange}
                    className="mt-1 text-sm font-medium outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* RETURN */}
              <div className="flex min-w-[200px] flex-1 items-start gap-2 border-r border-slate-200 pr-3">
                <div className="h-10 w-10 mt-1 rounded-full bg-[#2d3b78]/10 text-[#2d3b78] flex items-center justify-center">
                  <CalendarDays size={18} />
                </div>

                <div className="flex flex-col flex-1 pt-1">
                  <label className="text-[11px] uppercase font-semibold tracking-wider text-slate-500">
                    Return
                  </label>

                  <input
                    type="date"
                    name="returnDate"
                    min={formData.departure}
                    value={formData.returnDate}
                    disabled={tripType === "oneway"}
                    onFocus={() => setTripType("round")}
                    onClick={() => setTripType("round")}
                    onChange={handleChange}
                    className={`mt-1 text-sm font-medium outline-none cursor-pointer ${
                      tripType === "oneway"
                        ? "text-slate-400 opacity-50 cursor-not-allowed"
                        : "text-slate-900"
                    }`}
                  />
                </div>
              </div>

              {/* TRAVELLERS & CLASS BUTTON */}
              <div className="relative" ref={travellerRef}>
                <div
                  className="flex min-w-[180px] items-start gap-2 cursor-pointer"
                  onClick={() => setTravellerOpen(true)}
                >
                  <div className="h-10 w-10 mt-1 rounded-full bg-[#2d3b78]/10 text-[#2d3b78] flex items-center justify-center">
                    <Users size={18} />
                  </div>

                  <div className="flex flex-col flex-1 pt-1">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                      Travellers & Class
                    </label>

                    <span className="mt-1 text-sm font-medium">
                      {formData.travellers}, {flightClass}
                    </span>
                  </div>
                </div>

                {/* POPUP */}
                {travellerOpen && (
                  <div className="absolute top-full right-0 mt-3 w-[360px] bg-white rounded-xl shadow-xl border p-5 z-50">

                    <h3 className="text-xl font-semibold mb-4">Travellers</h3>

                    {/* Adults */}
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="font-medium">Adults</p>
                        <p className="text-xs text-slate-500">12 yrs or above</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateTraveller("adults", travellers.adults - 1)}
                          className="w-8 h-8 border rounded-full flex items-center justify-center"
                        >
                          –
                        </button>

                        <span className="w-5 text-center">{travellers.adults}</span>

                        <button
                          type="button"
                          onClick={() => updateTraveller("adults", travellers.adults + 1)}
                          className="w-8 h-8 border rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="font-medium">Children</p>
                        <p className="text-xs text-slate-500">2 - 12 yrs</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateTraveller("children", travellers.children - 1)}
                          className="w-8 h-8 border rounded-full flex items-center justify-center"
                        >
                          –
                        </button>

                        <span className="w-5 text-center">{travellers.children}</span>

                        <button
                          type="button"
                          onClick={() => updateTraveller("children", travellers.children + 1)}
                          className="w-8 h-8 border rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="font-medium">Infants</p>
                        <p className="text-xs text-slate-500">0 - 2 yrs</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => updateTraveller("infants", travellers.infants - 1)}
                          className="w-8 h-8 border rounded-full flex items-center justify-center"
                        >
                          –
                        </button>

                        <span className="w-5 text-center">{travellers.infants}</span>

                        <button
                          type="button"
                          onClick={() => updateTraveller("infants", travellers.infants + 1)}
                          className="w-8 h-8 border rounded-full flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Group Booking */}
                    <div className="bg-slate-100 rounded-lg p-3 text-sm text-slate-600 mb-5">
                      <p>
                        Planning a trip for <span className="font-semibold">more than 9 travellers?</span>
                      </p>
                      <span className="text-[#2d3b78] font-semibold cursor-pointer hover:underline">
                        Create Group Booking
                      </span>
                    </div>

                    {/* Class */}
                    <h3 className="text-lg font-semibold mb-3">Class</h3>

                    <div className="flex gap-2 mb-6">
                      {["Economy", "Premium Economy", "Business"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setFlightClass(item);
                            setFormData((p) => ({ ...p, cls: item }));
                          }}
                          className={`px-4 py-2 rounded-full border text-sm ${
                            flightClass === item
                              ? "bg-[#2d3b78] text-white border-[#2d3b78]"
                              : "border-slate-300 text-slate-600"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>

                    {/* Done */}
                    <button
                      type="button"
                      onClick={() => setTravellerOpen(false)}
                      className="w-full bg-[#2d3b78] text-white rounded-xl py-3 font-semibold hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* SEARCH BUTTON */}
              <div className="flex items-center">
                <button
                  type="submit"
                  className="flex gap-2 items-center bg-[#2d3b78] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition"
                >
                  <span className="h-7 w-7 rounded-full border border-white/40 bg-white/10 flex items-center justify-center">
                    <Search size={16} />
                  </span>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightSearch;
