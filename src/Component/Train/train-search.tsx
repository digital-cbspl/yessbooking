"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { MapPin, CalendarDays, Repeat, Search } from "lucide-react";

const STATIONS = [
  "Bhubaneswar (BBS)",
  "New Delhi (NDLS)",
  "Howrah (HWH)",
  "Mumbai Central (MMCT)",
  "Chennai Central (MAS)",
  "Bangalore City (SBC)",
  "Pune (PUNE)",
  "Hyderabad (HYB)",
  "Cuttack (CTC)",
  "Puri (PURI)",
];

const TrainSearch: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: today,
  });

  const [activeField, setActiveField] =
    useState<"from" | "to" | null>(null);

  const dropdownRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveField(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredStations = () => {
    const q =
      activeField === "from"
        ? formData.from.toLowerCase()
        : formData.to.toLowerCase();

    return STATIONS.filter((s) => s.toLowerCase().includes(q));
  };

  const selectStation = (station: string) => {
    if (activeField === "from") {
      setFormData((prev) => ({ ...prev, from: station }));
    } else {
      setFormData((prev) => ({ ...prev, to: station }));
    }
    setActiveField(null);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setActiveField(name as "from" | "to");
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `From: ${formData.from}\nTo: ${formData.to}\nDate: ${formData.date}`
    );
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative z-20 flex min-h-[55vh] items-center justify-center bg-gradient-to-br from-sky-100 via-sky-50 to-white px-4 py-8">

        <div
          className="pointer-events-none absolute inset-0 bg-right bg-cover opacity-25"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        />

        <div className="relative z-30 flex w-full max-w-6xl flex-col items-center gap-8 text-center">

          {/* Heading stays same */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-wide text-slate-900">
              A Journey of Comfort Awaits You
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Your Trusted Partner for Smooth Train Booking
            </p>
          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="relative z-40 flex w-full max-w-6xl flex-wrap items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.2)] lg:flex-nowrap"
            ref={dropdownRef}
          >

            {/* FROM */}
            <div className="relative flex min-w-[260px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <MapPin size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  From
                </span>

                <input
                  name="from"
                  placeholder="From"
                  value={formData.from}
                  onChange={handleChange}
                  onFocus={() => setActiveField("from")}
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                />

                {activeField === "from" && (
                  <ul className="absolute left-0 top-full mt-1 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white text-sm shadow-xl z-50">
                    {filteredStations().map((station) => (
                      <li
                        key={station}
                        className="cursor-pointer px-3 py-2 hover:bg-slate-100"
                        onMouseDown={() => selectStation(station)}
                      >
                        {station}
                      </li>
                    ))}
                    {filteredStations().length === 0 && (
                      <li className="px-3 py-2 text-xs text-slate-400">
                        No stations found
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* SWAP */}
            <button
              type="button"
              onClick={() => {
                  setFormData((prev) => ({ ...prev, from: prev.to, to: prev.from }));
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition"
            >
              <Repeat size={18} />
            </button>

            {/* TO */}
            <div className="relative flex min-w-[260px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <MapPin size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  To
                </span>

                <input
                  name="to"
                  placeholder="To"
                  value={formData.to}
                  onChange={handleChange}
                  onFocus={() => setActiveField("to")}
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                />

                {activeField === "to" && (
                  <ul className="absolute left-0 top-full mt-1 max-h-52 w-full overflow-auto rounded-xl border border-slate-200 bg-white text-sm shadow-xl z-50">
                    {filteredStations().map((station) => (
                      <li
                        key={station}
                        className="cursor-pointer px-3 py-2 hover:bg-slate-100"
                        onMouseDown={() => selectStation(station)}
                      >
                        {station}
                      </li>
                    ))}
                    {filteredStations().length === 0 && (
                      <li className="px-3 py-2 text-xs text-slate-400">
                        No stations found
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* DATE */}
            <div className="relative flex min-w-[230px] flex-1 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <CalendarDays size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Departure Date
                </span>

                {/* Browser native calendar popup */}
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none cursor-pointer"
                />

                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        date: new Date(
                          Date.now() + 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0],
                      }))
                    }
                    className="px-3 py-[3px] text-xs rounded-md border border-green-600 text-green-600"
                  >
                    Tomorrow
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        date: new Date(
                          Date.now() + 2 * 24 * 60 * 60 * 1000
                        )
                          .toISOString()
                          .split("T")[0],
                      }))
                    }
                    className="px-3 py-[3px] text-xs rounded-md border border-green-600 text-green-600"
                  >
                    Day After
                  </button>
                </div>
              </div>
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2d3b78] px-7 py-3.5 text-sm font-semibold text-white hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer sm:w-auto"
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

export default TrainSearch;
