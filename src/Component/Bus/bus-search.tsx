"use client";
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Bus,
  MapPin,
  CalendarDays,
  ArrowLeftRight,
  Search,
} from "lucide-react";

const CITIES = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Goa",
];

const BusSearch: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    fromCity: "",
    toCity: "",
    travelDate: today,
  });

  const [activeField, setActiveField] = useState<"fromCity" | "toCity" | null>(
    null
  );

  const formAreaRef = useRef<HTMLDivElement | null>(null);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        formAreaRef.current &&
        !formAreaRef.current.contains(e.target as Node)
      ) {
        setActiveField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const swapCities = () => {
    setFormData((prev) => ({
      ...prev,
      fromCity: prev.toCity,
      toCity: prev.fromCity,
    }));
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(
      `From: ${formData.fromCity}\nTo: ${formData.toCity}\nDate: ${formData.travelDate}`
    );
  };

  const filteredCities = (field: "fromCity" | "toCity") => {
    const q = formData[field].toLowerCase();
    return CITIES.filter((c) => c.toLowerCase().includes(q));
  };

  const handleSelectCity = (field: "fromCity" | "toCity", city: string) => {
    setFormData((prev) => ({ ...prev, [field]: city }));
    setActiveField(null);
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      {/* HERO (slightly smaller) */}
      <section className="relative z-20 flex min-h-[55vh] items-center justify-center bg-gradient-to-br from-sky-100 via-sky-50 to-white px-4 py-8">
        {/* background image */}
        <div
          className="pointer-events-none absolute inset-0 bg-right bg-cover opacity-25"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        />

        <div
          ref={formAreaRef}
          className="relative z-30 flex w-full max-w-6xl flex-col items-center gap-8 text-center"
        >
          {/* banner text */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-wide text-slate-900">
              A Journey of Comfort Awaits You
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Your Trusted Partner for Smooth Bus Travel
            </p>
          </div>

          {/* BIGGER SEARCH FORM JUST UNDER TEXT */}
          <form
            onSubmit={handleSearch}
            className="relative z-40 flex w-full max-w-5xl flex-wrap items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.2)] lg:flex-nowrap"
          >
            {/* FROM with searchable dropdown */}
            <div className="relative flex min-w-[230px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <Bus size={20} />
              </div>
              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  From
                </span>
                <input
                  type="search"
                  name="fromCity"
                  value={formData.fromCity}
                  onChange={handleChange}
                  onFocus={() => setActiveField("fromCity")}
                  required
                  placeholder="Search departure city"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  autoComplete="off"
                />

                {activeField === "fromCity" && (
                  <ul className="absolute left-0 top-full z-50 mt-1 max-h-44 w-full overflow-auto rounded-xl border border-slate-200 bg-white text-sm shadow-lg">
                    {filteredCities("fromCity").map((city) => (
                      <li
                        key={city}
                        className="cursor-pointer px-3 py-2 text-left hover:bg-slate-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectCity("fromCity", city);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                    {filteredCities("fromCity").length === 0 && (
                      <li className="px-3 py-2 text-left text-xs text-slate-400">
                        No matches
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* SWAP BUTTON */}
            <button
              type="button"
              onClick={swapCities}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2d3b78] text-white transition hover:bg-[#232d5d]"
              title="Swap"
            >
              <ArrowLeftRight size={18} />
            </button>

            {/* TO with searchable dropdown */}
            <div className="relative flex min-w-[230px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <MapPin size={20} />
              </div>
              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  To
                </span>
                <input
                  type="search"
                  name="toCity"
                  value={formData.toCity}
                  onChange={handleChange}
                  onFocus={() => setActiveField("toCity")}
                  required
                  placeholder="Search arrival city"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  autoComplete="off"
                />

                {activeField === "toCity" && (
                  <ul className="absolute left-0 top-full z-50 mt-1 max-h-44 w-full overflow-auto rounded-xl border border-slate-200 bg-white text-sm shadow-lg">
                    {filteredCities("toCity").map((city) => (
                      <li
                        key={city}
                        className="cursor-pointer px-3 py-2 text-left hover:bg-slate-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectCity("toCity", city);
                        }}
                      >
                        {city}
                      </li>
                    ))}
                    {filteredCities("toCity").length === 0 && (
                      <li className="px-3 py-2 text-left text-xs text-slate-400">
                        No matches
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* DATE */}
            <div className="flex min-w-[200px] flex-1 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <CalendarDays size={20} />
              </div>
              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Check-in date
                </span>
                <input
                  type="date"
                  name="travelDate"
                  min={today}
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2d3b78] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition sm:w-auto"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/10">
                <Search size={18} />
              </span>
              Search
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default BusSearch;
