"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import {
  ChevronsLeft,
  Search,
  Globe,
  Thermometer,
  CheckCircle,
  Heart,
  ChevronRight,
  MapPin,
} from "lucide-react";

import { Bed1, Bed2, Bed3 } from "@/src/assests/image/image";

/* -------------------------------------------
   SAMPLE HOTEL DATA (includes conditional discount)
------------------------------------------- */

type HotelOption = {
  id: number;
  title: string;
  subtitle?: string;
  tags: string[];
  shortDesc: string;
  features: string[];
  badges: string[];
  price: number;
  taxes: number;
  rating?: string;
  ratingCount?: number;
  image?: string;
  location?: string;
  distance?: string;
  roomsLeft?: number;
  discount?: {
    amount: number;
    code: string;
  };
};

const sampleHotels: HotelOption[] = [
  {
    id: 1,
    title: "Hotel Golden Nest",
    subtitle: "★★★",
    tags: ["Free Wifi", "Breakfast"],
    shortDesc: "Prime location with excellent hospitality and hygienic environment.",
    features: ["Free Wifi", "Restaurants", "Room Service"],
    badges: ["Exclusive Deal"],
    price: 5672,
    taxes: 868,
    rating: "7.9",
    ratingCount: 78,
    image: Bed1.src,
    location: "Ashok Nagar",
    distance: "820 m from Bhubaneswar (BBS)",
    roomsLeft: 1,
    discount: { amount: 4782, code: "WELCOME" },
  },
  {
    id: 2,
    title: "Sunrise Residency",
    subtitle: "★★",
    tags: ["Free Parking", "Free WiFi"],
    shortDesc: "Comfortable rooms at an affordable price.",
    features: ["Free Parking", "Free WiFi", "Close to airport"],
    badges: ["Best Seller"],
    price: 2499,
    taxes: 350,
    rating: "8.3",
    ratingCount: 142,
    image: Bed2.src,
    location: "Patia",
    distance: "1.2 km from Bhubaneswar (BBS)",
    roomsLeft: 3,
  },
  {
    id: 3,
    title: "Elite Plaza",
    subtitle: "★★★★★",
    tags: ["Gym", "City View"],
    shortDesc: "Perfect for business and premium travellers.",
    features: ["Gym Access", "Complimentary Breakfast", "Meeting Rooms"],
    badges: ["Premium Choice"],
    price: 8999,
    taxes: 980,
    rating: "9.1",
    ratingCount: 312,
    image: Bed3.src,
    location: "Chandrasekharpur",
    distance: "5.4 km from Bhubaneswar (BBS)",
    roomsLeft: 2,
    discount: { amount: 1200, code: "ELITE20" },
  },
];

/* -------------------------------------------
   HELPER COMPONENTS
------------------------------------------- */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center text-xs font-semibold bg-[#f0fff4] text-[#065f46] px-2 py-1 rounded-md">
      {children}
    </span>
  );
}

/* -------------------------------------------
   HOTEL CARD — matches screenshot layout
   — uses theme color #2d3b78 for blue elements
   — keeps orange where screenshot shows orange (Book Now/discount badge)
------------------------------------------- */

function HotelCard({ hotel }: { hotel: HotelOption }) {
  const THEME = "#2d3b78";

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="p-4 md:p-6 flex gap-6 items-start">
        {/* IMAGE + slider dots */}
        <div className="w-[320px] max-w-[40%] relative rounded-lg overflow-hidden">
          {/* Badge (Exclusive Deal) top-left */}
          {hotel.badges?.length > 0 && (
            <div className="absolute left-4 top-4 z-20">
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium border">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#16a34a" strokeWidth="1" />
                  <path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Exclusive Deal</span>
              </div>
            </div>
          )}

          {/* wishlist heart top-right */}
          <button className="absolute right-4 top-4 z-20 bg-white/80 rounded-full p-2 hover:bg-white">
            <Heart size={18} className="text-gray-600" />
          </button>

          {/* Hotel image */}
          <img
            src={hotel.image}
            alt={hotel.title}
            className="w-full h-44 md:h-52 object-cover rounded-lg"
          />

          {/* slider dots */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex items-center gap-2">
            <span className="h-2 w-6 bg-white/80 rounded-full" />
            <span className="h-2 w-2 bg-white/60 rounded-full" />
            <span className="h-2 w-2 bg-white/60 rounded-full" />
          </div>
        </div>

        {/* MIDDLE: details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {hotel.title}
                </h3>
                {/* star icons kept small as subtitle */}
                <span className="text-sm text-gray-500">{hotel.subtitle}</span>
              </div>

              <div className="mt-2 text-sm text-gray-500 flex items-center gap-3">
                <div className="inline-flex items-center gap-1">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{hotel.location}</span>
                </div>
                <span>•</span>
                <span>{hotel.distance}</span>
              </div>

              {/* Rating box */}
              <div className="mt-4 flex items-center gap-4">
                <div
                  style={{ background: THEME }}
                  className="text-white rounded-md px-3 py-2 inline-flex items-center gap-3 shadow-sm"
                >
                  <div className="text-lg font-bold">{hotel.rating}</div>
                  <div className="text-xs font-medium">Very Good</div>
                </div>

                <div className="text-sm text-gray-600">{hotel.ratingCount} Ratings</div>
              </div>

              {/* Amenities (green tick + labels) */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-700">
                {hotel.features.map((f, i) => (
                  <div key={i} className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17l-5-5" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Short description */}
              <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h18" stroke="#f97316" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <span>{hotel.shortDesc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: price block */}
        <div className="w-[260px] flex flex-col items-end justify-between">
          <div className="text-right">
            {/* last room badge */}
            {hotel.roomsLeft && hotel.roomsLeft <= 1 && (
              <div className="text-sm inline-flex items-center gap-2 bg-[#fff1f0] text-[#9a3412] px-3 py-1 rounded-full">
                <span>Last {hotel.roomsLeft} room left</span>
              </div>
            )}

            <div className="mt-6 text-3xl font-bold text-gray-900">₹{hotel.price.toLocaleString()}</div>
            <div className="text-xs text-gray-500">+ ₹{hotel.taxes.toLocaleString()} taxes & fees</div>
            <div className="text-xs line-through text-gray-400 mt-1">₹{Math.round(hotel.price + (hotel.discount?.amount ?? 2000)).toLocaleString()}</div>
          </div>

          <div className="w-full mt-4">
            <button className="w-full py-3 rounded-md bg-[#2d3b78] text-white font-semibold transition hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Conditional discount banner */}
      {hotel.discount && (
        <div className="bg-green-50 border-t border-green-100 px-6 py-3 text-sm text-green-800">
          Discount of ₹{hotel.discount.amount.toLocaleString()} included. Coupon code{" "}
          <span className="font-semibold">{hotel.discount.code}</span> applied!
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------
   Location Tabs (replaces date tabs)
   — uses Popular Areas list (Option B)
------------------------------------------- */

function LocationTabs({
  locations,
  active,
  onSelect,
}: {
  locations: string[];
  active: string;
  onSelect: (loc: string) => void;
}) {
  return (
    <div className="bg-white rounded-lg p-3 mb-6 shadow-sm">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-3 min-w-[220px]">
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
            <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none">
              <path d="M12 2c3.866 0 7 3.134 7 7 0 5.25-7 13-7 13s-7-7.75-7-13c0-3.866 3.134-7 7-7z" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="text-xs text-gray-500">Locations in</div>
              <div className="text-sm font-semibold">Bhubaneswar</div>
            </div>
          </div>
        </div>

        {locations.map((loc) => (
          <button
            key={loc}
            onClick={() => onSelect(loc)}
            className={`min-w-[100px] px-4 py-2 rounded-full text-sm border ${
              active === loc ? "bg-[#fff7ed] border-[#ffedd5] text-[#2d3b78]" : "bg-white"
            }`}
          >
            {loc}
          </button>
        ))}

        <button className="ml-auto inline-flex items-center justify-center w-10 h-10 rounded-full border">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------
   SidebarFilters (kept as before, unchanged)
   (Only minimal integration for click-outside)
------------------------------------------- */

function SidebarFilters() {
  const PRIMARY = "#2d3b78";

  // city search click-outside
  const cityRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setShowCityDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* SEARCH CITIES */
  const CITY_LIST = [
    "Patia",
    "Ashok Nagar",
    "Patrapada",
    "Nayapalli",
    "Khandagiri",
    "Saheed Nagar",
    "Chandrasekharpur",
  ];

  const [searchQ, setSearchQ] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const filteredCities = CITY_LIST.filter((c) =>
    c.toLowerCase().includes(searchQ.toLowerCase())
  );

  /* MULTI SELECTS */
  const ACCOM_TYPES = [
    "Bed and Breakfast (11)",
    "Hotel (332)",
    "Homestay (5)",
    "Resort (3)",
    "Hostel (2)",
    "Lodge (3)",
    "Capsule hotel (1)",
  ];

  const STAR_TYPES = [
    "5 Star (25)",
    "4 Star (53)",
    "3 Star (213)",
    "2 Star (40)",
    "1 Star (7)",
  ];

  const [selectedAccomps, setSelectedAccomps] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);

  const toggleAccom = (v: string) =>
    setSelectedAccomps((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
  const toggleStar = (v: string) =>
    setSelectedStars((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  /* POPULAR AREAS */
  const AREAS = [
    { name: "Patia", count: 45 },
    { name: "Ashok Nagar", count: 23 },
    { name: "Patrapada", count: 19 },
    { name: "Nayapalli", count: 13 },
    { name: "Khandagiri", count: 9 },
    { name: "Saheed Nagar", count: 11 },
    { name: "Chandrasekharpur", count: 8 },
  ];

  const [areaState, setAreaState] = useState<Record<string, boolean>>({});
  const [showMoreAreas, setShowMoreAreas] = useState(false);

  /* FACILITIES */
  const FACILITIES = [
    { name: "Internet access", count: 321 },
    { name: "Room Service", count: 284 },
    { name: "CCTV/Security", count: 278 },
    { name: "Facilities for kids", count: 258 },
    { name: "Swimming Pool", count: 190 },
    { name: "Parking Available", count: 210 },
    { name: "Fitness Center", count: 155 },
    { name: "Breakfast Included", count: 140 },
  ];

  const [facilityState, setFacilityState] = useState<Record<string, boolean>>({});
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);

  /* PRICE */
  const PRICE_MIN = 400;
  const PRICE_MAX = 20000;
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  /* USER RATING */
  const [userRating, setUserRating] = useState<string | null>(null);

  /* MOST POPULAR */
  const MOST_POPULAR = [
    { label: "Free Cancellation", count: 158 },
    { label: "Couple Friendly", count: 44 },
    { label: "Free Breakfast", count: 144 },
    { label: "Rated Exceptional(9+)", count: 22 },
  ];

  const [popularState, setPopularState] = useState<Record<string, boolean>>({});

  return (
    <aside className="w-[320px] bg-white rounded-lg p-6 shadow-sm h-max space-y-6">
      {/* 1. BEST PRICE */}
      <div className="rounded-lg border p-3 flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-md bg-green-50">
          <span className="text-green-600 font-semibold">₹</span>
        </div>
        <div>
          <div className="font-semibold text-sm">Best Price Guarantee</div>
          <div className="text-xs text-gray-500">Hotels with cheapest price</div>
        </div>
        <input type="checkbox" className="ml-auto w-5 h-5" />
      </div>

      {/* 2. SEARCH */}
      <div>
        <label className="block text-sm font-semibold mb-2">Search within Bhubaneswar</label>

        <div className="relative" ref={cityRef}>
          <input
            value={searchQ}
            onChange={(e) => {
              setSearchQ(e.target.value);
              setShowCityDropdown(true);
            }}
            onFocus={() => setShowCityDropdown(true)}
            placeholder="Enter area, locality or hotel"
            className="w-full rounded-full border px-4 py-2 text-sm outline-none"
          />

          <Search className="absolute right-3 top-3 text-gray-400" size={16} />

          {showCityDropdown && (
            <ul className="absolute top-full left-0 bg-white border rounded-md mt-1 w-full max-h-56 overflow-auto shadow z-50">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <li
                    key={city}
                    onMouseDown={() => {
                      setSearchQ(city);
                      setShowCityDropdown(false);
                    }}
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {city}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-400">No results</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* 3. MOST POPULAR */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Most Popular</h4>

        <div className="space-y-2">
          {MOST_POPULAR.map((p) => (
            <label key={p.label} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={popularState[p.label] || false}
                onChange={(e) =>
                  setPopularState((s) => ({ ...s, [p.label]: e.target.checked }))
                }
              />
              {p.label}
              <span className="ml-auto text-xs text-gray-500">{p.count}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. PAYMENT MODE */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Payment Mode</h4>
        {[
          { label: "Prepaid", count: 312 },
          { label: "Book with ₹0 Payment", count: 0 },
          { label: "Pay at Hotel", count: 140 },
        ].map((p) => (
          <label key={p.label} className="flex items-center gap-3 text-sm py-1">
            <input type="checkbox" />
            {p.label}
            <span className="ml-auto text-xs text-gray-500">{p.count}</span>
          </label>
        ))}
      </div>

      {/* 5. MEALS */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Meals</h4>
        {[
          { label: "Breakfast Included", count: 144 },
          { label: "Lunch Included", count: 17 },
          { label: "Dinner Included", count: 20 },
        ].map((m) => (
          <label key={m.label} className="flex items-center gap-3 text-sm py-1">
            <input type="checkbox" />
            {m.label}
            <span className="ml-auto text-xs text-gray-500">{m.count}</span>
          </label>
        ))}
      </div>

      {/* 6. ACCOMMODATION */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Accommodation Type</h4>

        <div className="flex flex-wrap gap-2">
          {ACCOM_TYPES.map((item) => {
            const active = selectedAccomps.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleAccom(item)}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  active ? "bg-[#edf2ff] border-[#c7d2fe] text-[#2d3b78]" : "bg-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. POPULAR AREAS */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Popular Areas</h4>

        <div className="space-y-2">
          {(showMoreAreas ? AREAS : AREAS.slice(0, 4)).map((a) => (
            <label key={a.name} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={areaState[a.name] || false}
                onChange={(e) =>
                  setAreaState((s) => ({ ...s, [a.name]: e.target.checked }))
                }
              />
              {a.name}
              <span className="ml-auto text-xs text-gray-500">{a.count}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowMoreAreas((s) => !s)}
          className="text-sm font-semibold cursor-pointer"
          style={{ color: PRIMARY }}
        >
          {showMoreAreas ? "Show Less" : "View More"}
        </button>
      </div>

      {/* 8. FACILITIES (full) */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Facilities</h4>

        <div className="space-y-2">
          {(showMoreFacilities ? FACILITIES : FACILITIES.slice(0, 4)).map((f) => (
            <label key={f.name} className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={facilityState[f.name] || false}
                onChange={(e) =>
                  setFacilityState((s) => ({ ...s, [f.name]: e.target.checked }))
                }
              />
              {f.name}
              <span className="ml-auto text-xs text-gray-500">{f.count}</span>
            </label>
          ))}
        </div>

        <button
          onClick={() => setShowMoreFacilities((s) => !s)}
          className="text-sm font-semibold cursor-pointer"
          style={{ color: PRIMARY }}
        >
          {showMoreFacilities ? "Show Less" : "View More"}
        </button>
      </div>

      {/* 9. STAR RATING */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Star Rating</h4>

        <div className="flex flex-wrap gap-2">
          {STAR_TYPES.map((item) => {
            const active = selectedStars.includes(item);
            return (
              <button
                key={item}
                onClick={() => toggleStar(item)}
                className={`px-3 py-1.5 rounded-full border text-sm ${
                  active ? "bg-[#edf2ff] border-[#c7d2fe] text-[#2d3b78]" : "bg-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* 10. PRICE (basic values shown) */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Price</h4>

        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>

        {/* Simple fallback slider pair — visual only */}
        <div className="relative">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={minPrice}
            onChange={(e) =>
              setMinPrice(Math.min(Number(e.target.value), maxPrice - 200))
            }
            className="w-full accent-[#2d3b78]"
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Math.max(Number(e.target.value), minPrice + 200))
            }
            className="w-full accent-[#2d3b78] absolute top-0 left-0"
          />
        </div>
      </div>

      {/* 11. USER RATING */}
      <div>
        <h4 className="text-sm font-semibold mb-3">User Rating</h4>

        {[
          { label: "Exceptional: 9+", count: 22, value: "9" },
          { label: "Excellent: 8+", count: 68, value: "8" },
          { label: "Very Good: 7+", count: 123, value: "7" },
          { label: "Good: 6+", count: 160, value: "6" },
          { label: "Pleasant: 5+", count: 188, value: "5" },
        ].map((r) => (
          <label key={r.value} className="flex items-center gap-3 text-sm py-1">
            <input
              type="radio"
              name="userRating"
              checked={userRating === r.value}
              onChange={() => setUserRating(r.value)}
            />
            {r.label}
            <span className="ml-auto text-xs text-gray-500">{r.count}</span>
          </label>
        ))}
      </div>

      {/* 12. FACILITIES (short) */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Facilities</h4>

        <label className="flex items-center gap-3 text-sm py-1">
          <input type="checkbox" />
          Internet access
        </label>

        <label className="flex items-center gap-3 text-sm py-1">
          <input type="checkbox" />
          Room Service
        </label>
      </div>
    </aside>
  );
}

/* -------------------------------------------
   MAIN PAGE — HOTEL SEARCH (final)
------------------------------------------- */

export default function HotelSearchFullPage(): JSX.Element {
  const LOCATIONS = [
    "Patia",
    "Ashok Nagar",
    "Patrapada",
    "Nayapalli",
    "Khandagiri",
    "Saheed Nagar",
    "Chandrasekharpur",
  ];
  const [activeLocation, setActiveLocation] = useState<string>(LOCATIONS[0]);

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="max-w-7xl mx-auto py-6 px-4">
        {/* LOCATION TABS (replaces date tabs) */}
        <LocationTabs
          locations={LOCATIONS}
          active={activeLocation}
          onSelect={(l) => setActiveLocation(l)}
        />

        <div className="flex gap-6">
          <SidebarFilters />

          <main className="flex-1">
            {/* Results count / sort bar */}
            <div className="bg-white rounded-md px-6 py-4 mb-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <span className="font-medium">Sort By:</span>
                <span>Price</span>
                <span>Star Rating</span>
                <span>User Rating</span>
                <span>Distance</span>
              </div>
              <div className="text-sm text-[#2d3b78]">Showing {sampleHotels.length} Hotels</div>
            </div>

            <div className="space-y-6">
              {sampleHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
