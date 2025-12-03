"use client";
import React, {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MapPin,
  CalendarDays,
  Users,
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

const HotelSearch: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    destination: "",
    checkIn: today,
    checkOut: today,
    roomsGuests: "1 Room, 2 Adults, 0 Children",
  });

  const [activeField, setActiveField] = useState<"destination" | null>(null);

  const [showGuestBox, setShowGuestBox] = useState(false);

  const [guests, setGuests] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const formAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        formAreaRef.current &&
        !formAreaRef.current.contains(e.target as Node)
      ) {
        setActiveField(null);
        setShowGuestBox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = () => {
    const q = formData.destination.toLowerCase();
    return CITIES.filter((c) => c.toLowerCase().includes(q));
  };

  const handleSelectCity = (city: string) => {
    setFormData((prev) => ({ ...prev, destination: city }));
    setActiveField(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateGuest = (
    field: "rooms" | "adults" | "children",
    value: number
  ) => {
    setGuests((prev) => ({ ...prev, [field]: value }));

    const updated = {
      ...guests,
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      roomsGuests: `${updated.rooms} Room, ${updated.adults} Adults, ${updated.children} Children`,
    }));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Destination: ${formData.destination}\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}\nRooms & Guests: ${formData.roomsGuests}`
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

        <div
          ref={formAreaRef}
          className="relative z-30 flex w-full max-w-6xl flex-col items-center gap-8 text-center"
        >
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.5rem] font-bold tracking-wide text-slate-900">
              A Journey of Comfort Awaits You
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Your Trusted Partner for Smooth Hotel Booking
            </p>
          </div>

          {/* SEARCH FORM */}
          <form
            onSubmit={handleSearch}
            className="relative z-40 flex w-full max-w-6xl flex-wrap items-center gap-4 rounded-3xl bg-white px-6 py-5 shadow-[0_20px_50px_rgba(15,23,42,0.2)] lg:flex-nowrap"
          >

            {/* DESTINATION */}
            <div className="relative flex min-w-[230px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <MapPin size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Destination
                </span>

                <input
                  type="search"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onFocus={() => setActiveField("destination")}
                  placeholder="Search destination"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                  autoComplete="off"
                />

                {activeField === "destination" && (
                  <ul className="absolute left-0 top-full z-50 mt-1 max-h-44 w-full overflow-auto rounded-xl border border-slate-200 bg-white text-sm shadow-lg">
                    {filteredCities().map((city) => (
                      <li
                        key={city}
                        className="cursor-pointer px-3 py-2 hover:bg-slate-100"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectCity(city);
                        }}
                      >
                        {city}
                      </li>
                    ))}

                    {filteredCities().length === 0 && (
                      <li className="px-3 py-2 text-xs text-slate-400">
                        No matches
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>

            {/* CHECK-IN */}
            <div className="flex min-w-[200px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <CalendarDays size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Check-in
                </span>

                <input
                  type="date"
                  name="checkIn"
                  min={today}
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* CHECK-OUT */}
            <div className="flex min-w-[200px] flex-1 items-center gap-3 border-slate-200 pr-4 lg:border-r">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <CalendarDays size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Check-out
                </span>

                <input
                  type="date"
                  name="checkOut"
                  min={formData.checkIn}
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* ROOMS & GUESTS */}
            <div className="relative flex min-w-[200px] flex-1 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2d3b78]/10 text-[#2d3b78]">
                <Users size={20} />
              </div>

              <div className="flex flex-1 flex-col text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Rooms & Guests
                </span>

                <div
                  onClick={() => setShowGuestBox(!showGuestBox)}
                  className="mt-0.5 cursor-pointer text-sm font-medium text-slate-900"
                >
                  {formData.roomsGuests}
                </div>
              </div>

              {/* POPUP */}
              {showGuestBox && (
                <div className="absolute left-0 top-full mt-3 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 p-4">

                  {/* ROOMS */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">
                        Rooms
                      </p>
                      <p className="text-xs text-slate-500">
                        Minimum 1
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateGuest(
                            "rooms",
                            Math.max(1, guests.rooms - 1)
                          )
                        }
                        className="h-8 w-8 flex items-center justify-center border rounded-md text-[#2d3b78]"
                        type="button"
                      >
                        -
                      </button>

                      <span className="w-6 text-center font-semibold">
                        {guests.rooms}
                      </span>

                      <button
                        onClick={() =>
                          updateGuest("rooms", guests.rooms + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center border rounded-md text-[#2d3b78]"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  {/* ADULTS */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">
                        Adults
                      </p>
                      <p className="text-xs text-slate-500">
                        13 years & above
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateGuest(
                            "adults",
                            Math.max(1, guests.adults - 1)
                          )
                        }
                        className="h-8 w-8 flex items-center justify-center border rounded-md text-[#2d3b78]"
                        type="button"
                      >
                        -
                      </button>

                      <span className="w-6 text-center font-semibold">
                        {guests.adults}
                      </span>

                      <button
                        onClick={() =>
                          updateGuest("adults", guests.adults + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center border rounded-md text-[#2d3b78]"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <hr className="border-slate-200" />

                  {/* CHILDREN */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-semibold text-sm text-slate-900">
                        Children
                      </p>
                      <p className="text-xs text-slate-500">
                        0–12 years
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateGuest(
                            "children",
                            Math.max(0, guests.children - 1)
                          )
                        }
                        className="h-8 w-8 flex items-center justify-center border rounded-md text-[#2d3b78]"
                        type="button"
                      >
                        -
                      </button>

                      <span className="w-6 text-center font-semibold">
                        {guests.children}
                      </span>

                      <button
                        onClick={() =>
                          updateGuest("children", guests.children + 1)
                        }
                        className="h-8 w-8 flex items-center justify-center border rounded-md text-[#2d3b78]"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* APPLY BUTTON */}
                  <button
                    onClick={() => setShowGuestBox(false)}
                    type="button"
                    className="mt-3 w-full rounded-xl bg-[#2d3b78] py-2.5 text-sm font-semibold text-white hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06]"
                  >
                    Apply
                  </button>
                </div>
              )}
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

export default HotelSearch;
