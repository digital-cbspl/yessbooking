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

const InquiryBanner: React.FC = () => {
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
              Submit Your Inquiry
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600">
              Your Trusted Partner for Smooth Travel
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default InquiryBanner;
