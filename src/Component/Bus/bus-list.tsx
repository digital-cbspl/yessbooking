"use client";

import React, { JSX, useEffect, useState } from "react";
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
  BedSingle,
  Armchair,
} from "lucide-react";
import Script from "next/script";

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
    female: ["U2", "U5", "L6", "L2"],
    male: ["U7", "L8", "U12"],
    prices: [1080, 1280, 1980, 2280],
  },
];

/* ---------------------------
   Seat Layout Component
   --------------------------- */
  type SeatLayoutProps = {
  upper: string[];
  lower: string[];
  booked?: string[];
  female?: string[];
  male?: string[];
  prices?: number[];
  onClose: () => void;
};



type SeatStatus = "available" | "booked" | "selected" | "ladies";

/* ---------------- TOOLTIP ---------------- */

function SeatTooltip({ seatNo, price }: { seatNo: string; price: number }) {
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-30">
      <div className="bg-black text-white text-xs px-2 py-1 rounded">
        <div className="font-semibold">{seatNo}</div>
        <div>₹{price}</div>
      </div>
      <span className="w-2 h-2 bg-black rotate-45 -mt-1" />
    </div>
  );
}

/* ---------------- LOWER SEAT (GOIBIBO SVG – HORIZONTAL) ---------------- */

function LowerSeat({
  seatNo,
  price,
  status,
  onClick,
}: {
  seatNo: string;
  price: number;
  status: SeatStatus;
  onClick: () => void;
}) {
  const mainFill =
    status === "booked"
      ? "#D8D8D8"
      : status === "selected"
      ? "#a5f1c1ff"
      : status === "ladies"
      ? "#FA3988"
      : "#FFFFFF";

  return (
    <div
      className="relative group cursor-pointer"
      onClick={status !== "booked" ? onClick : undefined}
    >
      <SeatTooltip seatNo={seatNo} price={price} />

      <svg width="18" height="18" viewBox="0 0 18 18">
        <g fill="none" fillRule="evenodd">
          <rect
            x="0.75"
            y="0.75"
            width="14.5"
            height="14.5"
            rx="2"
            fill={mainFill}
            stroke="#8F908C"
            strokeWidth="0.75"
          />
          <path
            d="M14.55 3.736H8.113a.608.608 0 01-.614-.6V1.184c0-.332.275-.6.614-.6h8.772c.339 0 .614.268.614.6v15.59c0 .332-.275.6-.614.6H8.114a.607.607 0 01-.614-.6v-1.952c0-.331.275-.6.614-.6h6.435V3.736z"
            fill="#C7C7C2"
            stroke="#7C7E7A"
            strokeWidth="0.75"
          />
        </g>
      </svg>
    </div>
  );
}

/* ---------------- UPPER SLEEPER ---------------- */

function UpperSleeper({
  seatNo,
  price,
  status,
  onClick,
}: {
  seatNo: string;
  price: number;
  status: SeatStatus;
  onClick: () => void;
}) {
  const baseFill =
    status === "booked"
      ? "#D8D8D8"
      : status === "selected"
      ? "#a5f1c1ff"
      : "#FFFFFF";

  const sideFill = status === "ladies" ? "#FA3988" : "#C7C7C2";

  return (
    <div
      className="relative group cursor-pointer"
      onClick={status !== "booked" ? onClick : undefined}
    >
      <SeatTooltip seatNo={seatNo} price={price} />

      <svg width="44" height="18" viewBox="0 0 51 22">
        <g fill="none" stroke="#979797" strokeWidth="0.75">
          <path
            fill={baseFill}
            d="M47.875.375h-44.6c-.719 0-1.374.295-1.85.771a2.616 2.616 0 00-.769 1.852v15.086c0 .721.294 1.378.77 1.853.473.475 1.127.77 1.85.77h44.6c.719 0 1.374-.295 1.85-.772a2.61 2.61 0 00.769-1.851V2.998c0-.722-.294-1.378-.77-1.854a2.606 2.606 0 00-1.85-.769z"
          />
          <path
            fill={sideFill}
            d="M42.526 2.68h2.385a1.628 1.628 0 011.631 1.628v12.465c0 .453-.18.86-.475 1.153a1.63 1.63 0 01-1.156.475h-2.385a1.623 1.623 0 01-1.631-1.628V4.308c0-.453.18-.859.474-1.152a1.632 1.632 0 011.157-.476z"
          />
        </g>
      </svg>
    </div>
  );
}

/* ---------------- SEAT LAYOUT ---------------- */

function SeatLayout({
  upper,
  lower,
  booked = [],
  female = [],
  prices = [],
  onClose,
}: SeatLayoutProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [boarding, setBoarding] = useState<string | null>(null);
  const [dropping, setDropping] = useState<string | null>(null);
  const [activeFare, setActiveFare] = useState<number | "All">("All");

  const toggleSeat = (s: string) => {
    if (booked.includes(s)) return;
    setSelected((p) =>
      p.includes(s) ? p.filter((x) => x !== s) : [...p, s]
    );
  };

  const statusOf = (s: string): SeatStatus => {
    if (booked.includes(s)) return "booked";
    if (selected.includes(s)) return "selected";
    if (female.includes(s)) return "ladies";
    return "available";
  };

  const farePerSeat =
    activeFare === "All" ? prices[0] ?? 0 : activeFare;

  const totalFare = selected.length * farePerSeat;

  useEffect(() => {
  console.log("Razorpay on window:", (window as any).Razorpay);
}, []);

const handlePayment = async () => {
  if (!boarding || !dropping || selected.length === 0) return;

  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalFare }),
  });

  const order = await res.json();

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
    amount: order.amount,
    currency: "INR",
    name: "Bus Booking",
    description: `Seats: ${selected.join(", ")}`,
    order_id: order.id,
    handler: function (response: any) {
      alert("Payment Successful");
      console.log(response);
      onClose();
    },
    theme: { color: "#2d3b78" },
  };

  const RazorpayConstructor = (window as any).Razorpay;
  if (!RazorpayConstructor) {
    alert("Razorpay SDK failed to load");
    return;
  }

  const rzp = new RazorpayConstructor(options);
  rzp.open();
};


  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-[1200px] h-[85vh] rounded-lg flex overflow-hidden">

        {/* BOARDING */}
        <div className="w-[260px] border-r border-gray-200 p-4">
          <h3 className="font-semibold mb-3">1 · Boarding Point</h3>

          <label className="block rounded p-3 mb-3 cursor-pointer">
            <input
              type="radio"
              name="boarding"
              onChange={() => setBoarding("Bhubaneswar")}
            />
            <div className="font-medium">13:00 · Bhubaneswar</div>
            <div className="text-xs text-gray-500">
              Apollo Tyre Waiting Lounge
            </div>
          </label>
        </div>

        {/* DROPPING */}
        <div className="w-[260px] border-r border-gray-200 p-4">
          <h3 className="font-semibold mb-3">2 · Dropping Point</h3>

          {[
            { time: "10:00", place: "Gummidipoondi" },
            { time: "10:15", place: "RMK College" },
            { time: "10:30", place: "Red Hills" },
            { time: "10:35", place: "Puzhal" },
          ].map((d) => (
            <label key={d.place} className="block mb-3 cursor-pointer">
              <input
                type="radio"
                name="dropping"
                onChange={() => setDropping(d.place)}
              />
              <div className="font-medium">
                {d.time} · {d.place}
              </div>
            </label>
          ))}
        </div>

        {/* SEATS */}
        <div className="flex-1 p-4 overflow-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Select your seat</h3>
            <button onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          {/* LEGEND + FARE */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">

            {/* LEGEND */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-gray-300 rounded" /> Booked
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-white border rounded" /> Available
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 bg-pink-500 rounded" /> Ladies
              </span>
            </div>

            {/* FARES */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFare("All")}
                className={`px-3 py-1 rounded text-sm ${
                  activeFare === "All"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                All
              </button>

              {prices.map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveFare(p)}
                  className={`px-3 py-1 rounded text-sm ${
                    activeFare === p
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  ₹{p}
                </button>
              ))}
            </div>
          </div>

          {/* UPPER */}
          <div className="border border-gray-200 rounded-lg flex mb-6">
            <div className="w-10 bg-gray-100 flex items-center justify-center">
              <span className="-rotate-90 text-xs font-semibold">UPPER</span>
            </div>
            <div className="p-4 flex flex-col gap-4">
              {[0, 6, 12].map((i) => (
                <div key={i} className="flex gap-3">
                  {upper.slice(i, i + 6).map((s, idx) => (
                    <UpperSleeper
                      key={s}
                      seatNo={s}
                      price={prices[idx % prices.length] ?? farePerSeat}
                      status={statusOf(s)}
                      onClick={() => toggleSeat(s)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* LOWER */}
          <div className="border border-gray-200 rounded-lg flex">
            <div className="w-10 bg-gray-100 flex items-center justify-center">
              <span className="-rotate-90 text-xs font-semibold">LOWER</span>
            </div>
            <div className="p-4 grid grid-cols-6 gap-6">
              {lower.map((s, idx) => (
                <LowerSeat
                  key={s}
                  seatNo={s}
                  price={prices[idx % prices.length] ?? farePerSeat}
                  status={statusOf(s)}
                  onClick={() => toggleSeat(s)}
                />
              ))}
            </div>
          </div>
          <button
  disabled={!boarding || !dropping || selected.length === 0}
  onClick={handlePayment}
  className={`mt-6 w-full py-3 rounded font-semibold text-white cursor-pointer transition hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] ${
    !boarding || !dropping || selected.length === 0
      ? "bg-gray-300"
      : "bg-[#2d3b78]"
  }`}
>
  PROCEED TO PAY
</button>

          {/* SUMMARY */}
          <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between items-center">
            <div className="text-sm">
              <div>
                Seats:{" "}
                <span className="font-semibold">
                  {selected.length ? selected.join(", ") : "-"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold">₹{totalFare}</div>
              <div>
                Fare Details
              </div>
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
    <>
    <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      
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
                      className="mt-4 w-full py-3 rounded text-white font-medium transition hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer"
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
    </>
  );
}
