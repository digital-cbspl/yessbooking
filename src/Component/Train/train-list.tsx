"use client";

import React, { JSX, useState } from "react";
import {
  ChevronDown,
  ChevronsLeft,
  TrainFront,
  X,
  Star,
} from "lucide-react";

/* ---------------------------
   Types & Sample Data
   (UI-only availability panel; no data)
---------------------------- */

type TrainClassAvailability = {
  class: string;
  status: string;
  fare: number;
  tatkal?: boolean;
};

type TrainItem = {
  id: number;
  number: string;
  name: string;
  from: string;
  to: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  minutesAgo: number;
  departed: boolean;
  classes: TrainClassAvailability[];
};

const sampleTrains: TrainItem[] = [
  {
    id: 1,
    number: "22823",
    name: "Tejas Raj Exp",
    from: "BBS",
    to: "NDLS",
    departTime: "09:30",
    arriveTime: "09:55",
    duration: "24h 25m",
    minutesAgo: 35,
    departed: true,
    classes: [
      { class: "3A", status: "Train Departed", fare: 3890 },
      { class: "3A Tatkal", status: "Not Available", fare: 3890, tatkal: true },
      { class: "2A", status: "Train Departed", fare: 5315 },
      { class: "2A Tatkal", status: "Not Available", fare: 5315, tatkal: true },
      { class: "1A", status: "Not Available", fare: 8200 },
    ],
  },
  {
    id: 2,
    number: "12801",
    name: "Purushottam Exp",
    from: "BBS",
    to: "NDLS",
    departTime: "21:45",
    arriveTime: "17:10",
    duration: "19h 25m",
    minutesAgo: 39,
    departed: false,
    classes: [
      { class: "SL", status: "AVAILABLE 142", fare: 480 },
      { class: "3A", status: "RAC 12", fare: 1480, tatkal: true },
      { class: "2A", status: "WL 32", fare: 2280 },
      { class: "1A", status: "NOT AVAILABLE", fare: 3890 },
    ],
  },
];

function timeLabel(min: number) {
  if (min === 0) return "Just now";
  if (min < 60) return `${min} mins ago`;
  const hrs = Math.floor(min / 60);
  return `${hrs} hrs ago`;
}

/* ---------------------------
   Availability Panel (UI only)
   Opens for selected train + class (no real availability)
---------------------------- */

function AvailabilityPanel({
  train,
  selectedClass,
  onClose,
}: {
  train: TrainItem;
  selectedClass: TrainClassAvailability | null;
  onClose: () => void;
}) {
  const tabs = ["General", "Tatkal", "Senior Citizen", "Ladies"];
  const [activeTab, setActiveTab] = useState<string>("General");

  // Placeholder next dates (UI only)
  const nextDates = [
    { label: "09 Dec", day: "Tue", status: "—", badge: "WL 58" },
    { label: "11 Dec", day: "Thu", status: "—", badge: "WL 34" },
    { label: "12 Dec", day: "Fri", status: "—", badge: "WL 49" },
    { label: "15 Dec", day: "Mon", status: "—", badge: "WL 36" },
    { label: "16 Dec", day: "Tue", status: "—", badge: "WL 39" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black/40 p-4">
      <div className="bg-white rounded-lg w-full max-w-[920px] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">
                {train.number} {train.name}
              </h3>
              <div className="ml-2 text-xs text-gray-500 px-2 py-1 rounded">  
                <Star size={12} /> 4.1
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-700">
              <span className="font-semibold text-base">{train.departTime} {train.from}</span>
              <span className="mx-3 text-gray-400">•</span>
              <span className="text-sm">{train.duration}</span>
              <span className="mx-3 text-gray-400">•</span>
              <span className="font-semibold text-base">{train.arriveTime} {train.to}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Class row (left style) */}
        <div className="px-5 pt-4">
          <div className="flex gap-3 overflow-x-auto pb-4">
            {train.classes.map((c, idx) => {
              const active = selectedClass && selectedClass.class === c.class;
              return (
                <button
                  key={idx}
                  className={`min-w-[110px] rounded-md border px-4 py-3 text-left ${
                    active ? "bg-blue-50 border-blue-300" : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{c.class}</div>
                    {c.tatkal && (
                      <div className="text-[10px] bg-green-600 text-white px-1 rounded">Tatkal</div>
                    )}
                  </div>
                  <div className="text-xs mt-2 text-red-700">{c.status}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t">
          <div className="flex items-center gap-6 px-5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-sm ${
                  activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-5 pt-4 pb-8">
            {/* Today block */}
            <div className="flex items-center justify-between border rounded p-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <div className="text-xs">08 Dec</div>
                  <div className="text-sm">Mon</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-red-600">Train Departed</div>
                  <div className="text-xs text-gray-500">No more booking</div>
                </div>
              </div>

              <div>
                {/* Book button disabled for departed (UI-only) */}
                <button className="px-5 py-2 rounded bg-gray-100 text-gray-400 cursor-not-allowed">
                  Book ₹3890
                </button>
              </div>
            </div>

            {/* Next Dates (UI-only placeholders) */}
            <div className="text-xs text-gray-500 mb-2">Next Dates</div>
            <div className="divide-y">
              {nextDates.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <div className="font-semibold">{d.label}</div>
                      <div className="text-xs text-gray-500">{d.day}</div>
                    </div>

                    <div>
                      <div className="text-sm text-green-700 font-semibold">{d.badge}</div>
                      <div className="text-xs text-gray-500">Waitlist</div>
                    </div>
                  </div>

                  <div>
                    <button className="px-4 py-2 border rounded text-green-700 font-semibold">
                      Book ₹— 
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-right">
              <a className="text-orange-500 cursor-pointer">Check 2 Months Calendar</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   Main Train Results Page
---------------------------- */

export default function TrainResultsPage(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTrain, setActiveTrain] = useState<TrainItem | null>(null);
  const [activeClass, setActiveClass] = useState<TrainClassAvailability | null>(null);

  const openPanel = (train: TrainItem, cls: TrainClassAvailability) => {
    setActiveTrain(train);
    setActiveClass(cls);
    setModalOpen(true);
  };

  const closePanel = () => {
    setModalOpen(false);
    setActiveTrain(null);
    setActiveClass(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* Sort bar (kept minimal) */}
        <div className="bg-white rounded-md px-6 py-4 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <span className="font-medium">Sort By:</span>
            <span>Departure</span>
            <span>Arrival</span>
            <span>Duration</span>
            <span>Fare</span>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-[320px] bg-white rounded-lg p-6 shadow-sm shrink-0 sticky top-4 h-max">
            <h3 className="text-lg font-semibold mb-5">Filters</h3>
            <div className="mb-6">
              <h4 className="text-sm font-semibold mb-2">Train Type</h4>
              <div className="grid grid-cols-2 gap-3">
                {["Express", "Superfast", "Rajdhani", "Duronto"].map((t) => (
                  <button key={t} className="border rounded-md py-3 text-sm hover:bg-[#2d3b78] hover:text-white">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main list */}
          <main className="flex-1 space-y-5">
            {sampleTrains.map((t) => (
              <article
                key={t.id}
                className={`bg-white shadow-sm rounded-lg border overflow-hidden transition p-5 ${t.departed ? "opacity-60" : "hover:shadow-lg"}`}
              >
                {/* Header */}
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {t.number} {t.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1 border rounded-full px-2 py-1 text-xs">
                      <Star size={12} /> 4.1
                    </span>
                    <button className="underline text-sm text-gray-600">Schedule</button>
                  </div>
                </div>

                {/* Time row */}
                <div className="flex items-center gap-6 mt-2">
                  <div>
                    <p className="text-xl font-semibold">{t.departTime}</p>
                    <p className="text-xs text-gray-500">{t.from}</p>
                  </div>

                  <p className="text-gray-400 text-sm">→</p>

                  <div>
                    <p className="text-xl font-semibold">{t.arriveTime}</p>
                    <p className="text-xs text-gray-500">{t.to}</p>
                  </div>

                  <span className="ml-6 border px-3 py-1 rounded-full text-sm text-gray-600">{t.duration}</span>
                </div>

                <p className="mt-2 text-xs text-gray-500">{timeLabel(t.minutesAgo)}</p>

                {/* CLASS CARDS (clickable) */}
                <div className="mt-4 grid grid-cols-5 gap-3">
                  {t.classes.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => openPanel(t, c)}
                      className="border rounded-lg px-3 py-2 text-center bg-red-50 border-red-300 hover:shadow"
                    >
                      <div className="text-sm font-semibold flex justify-center gap-1">
                        {c.class}
                        {c.tatkal && (
                          <span className="text-[10px] bg-green-600 text-white px-1 rounded">Tatkal</span>
                        )}
                      </div>

                      <div className="text-xs text-red-600 mt-2">{c.status}</div>

                      <div className="text-sm font-bold mt-1">₹{c.fare}</div>

                      {c.status.includes("Departed") && (
                        <div className="text-[10px] text-red-500 mt-1">No more booking</div>
                      )}
                    </button>
                  ))}
                </div>
              </article>
            ))}
          </main>
        </div>
      </div>

      {/* Availability modal (UI-only) */}
      {modalOpen && activeTrain && (
        <AvailabilityPanel train={activeTrain} selectedClass={activeClass} onClose={closePanel} />
      )}
    </div>
  );
}
