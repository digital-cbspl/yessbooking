"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plane,
    Hotel,
    Car,
    Ship,
    Globe,
    MapPin,
    Calendar,
    Users,
    ChevronDown,
    Search,
    Bus,
} from "lucide-react";
import { Hero } from "../assests/image/image";

export default function Banner() {
    const [activeTab, setActiveTab] = useState<
        "flights" | "hotels" | "buses" | "cabs" | "cruises" | "tours"
    >("flights");
    const [tripType, setTripType] = useState<"oneway" | "roundtrip" | "multicity">(
        "oneway"
    );
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [passengers, setPassengers] = useState("1 Adult - 0 Child");
    const [coach, setCoach] = useState("First class");

    const [headingIndex, setHeadingIndex] = useState(0);
    const headings = [
        "Amazing Flights Waiting for You",
        "Explore Hotels Around the World",
        "Unforgettable Vacation Packages",
        "Drive Your Dream Car Today",
        "Luxury Cruises and Tours Await",
    ];

    // Rotate headings every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setHeadingIndex((prev) => (prev + 1) % headings.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const red = "#e93216";
    const blue = "#323E7F";

    return (
        <section
            className="relative w-full overflow-hidden"
            aria-label="hero"
            style={{
                backgroundImage: `url(${Hero.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "600px",
            }}
        >
            {/* dark overlay */}
            <div className="absolute inset-0 bg-[rgba(8,22,43,0.55)]" />

            {/* content wrapper */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24 flex flex-col items-center">
                {/* Animated Heading */}
                <div className="h-24 flex items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={headingIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8 }}
                            className="text-white text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight"
                        >
                            {headings[headingIndex]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                {/* Tabs row */}
                <div className="mt-8 flex items-end justify-center w-full">
                    <div className="inline-flex rounded-t-lg shadow-sm bg-transparent">
                        <Tab
                            label="Flights"
                            icon={<Plane size={18} />}
                            active={activeTab === "flights"}
                            onClick={() => setActiveTab("flights")}
                            red={red}
                            blue={blue}
                        />
                        <Tab
                            label="Hotels"
                            icon={<Hotel size={18} />}
                            active={activeTab === "hotels"}
                            onClick={() => setActiveTab("hotels")}
                            red={red}
                            blue={blue}
                        />
                        <Tab
                            label="Buses"
                            icon={<Bus size={18} />}
                            active={activeTab === "buses"}
                            onClick={() => setActiveTab("buses")}
                            red={red}
                            blue={blue}
                        />
                        <Tab
                            label="Cabs"
                            icon={<Car size={18} />}
                            active={activeTab === "cabs"}
                            onClick={() => setActiveTab("cabs")}
                            red={red}
                            blue={blue}
                        />
                        <Tab
                            label="Cruises"
                            icon={<Ship size={18} />}
                            active={activeTab === "cruises"}
                            onClick={() => setActiveTab("cruises")}
                            red={red}
                            blue={blue}
                        />
                        <Tab
                            label="Tours"
                            icon={<Globe size={18} />}
                            active={activeTab === "tours"}
                            onClick={() => setActiveTab("tours")}
                            red={red}
                            blue={blue}
                        />
                    </div>
                </div>

                {/* Form Card */}
                <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                        <div className="p-6 md:p-8">
                            {/* Trip-type radios */}
                            <div className="flex items-center gap-6 mb-6 justify-center">
                                <TripRadio
                                    label="One way"
                                    value="oneway"
                                    group={tripType}
                                    setGroup={(v) => setTripType(v)}
                                />
                                <TripRadio
                                    label="Round-trip"
                                    value="roundtrip"
                                    group={tripType}
                                    setGroup={(v) => setTripType(v)}
                                />
                                <TripRadio
                                    label="Multi-city"
                                    value="multicity"
                                    group={tripType}
                                    setGroup={(v) => setTripType(v)}
                                />
                            </div>

                            {/* First row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                                <Field
                                    label="Flying from"
                                    placeholder="City or airport"
                                    icon={<MapPin size={16} />}
                                    value={from}
                                    onChange={(v) => setFrom(v)}
                                />
                                <Field
                                    label="Flying to"
                                    placeholder="City or airport"
                                    icon={<MapPin size={16} />}
                                    value={to}
                                    onChange={(v) => setTo(v)}
                                />
                            </div>

                            {/* Second row */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 items-center text-black">
                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Departing</label>
                                    <div className="flex items-center border rounded-lg px-3 py-2">
                                        <Calendar size={16} className="text-gray-500 mr-2" />
                                        <input
                                            type="date"
                                            className="w-full outline-none text-sm"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Passengers</label>
                                    <div className="flex items-center border rounded-lg px-3 py-2 justify-between">
                                        <span className="flex items-center gap-2">
                                            <Users size={16} className="text-gray-500" />
                                            <span className="text-sm">{passengers}</span>
                                        </span>
                                        <ChevronDown size={18} className="text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Coach</label>
                                    <div className="flex items-center border rounded-lg px-3 py-2 justify-between">
                                        <span className="text-sm">{coach}</span>
                                        <ChevronDown size={18} className="text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <div className="bg-transparent">
                                        <button
                                            type="button"
                                            className="w-full h-full px-5 py-3 rounded-lg text-white font-semibold transition-all duration-300 bg-[#2d3b78] 
                                            hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer">
                                            <div className="flex items-center justify-center gap-3">
                                                <Search size={18} />
                                                <span>Search Now</span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom curve svg */}
                <div className="mt-8 w-screen absolute left-1/2 -translate-x-1/2 bottom-0">
                    <svg
                        viewBox="0 0 1440 80"
                        className="w-full h-auto block"
                        preserveAspectRatio="none"
                    >
                        <path d="M0 20 C 360 80 1080 0 1440 40 L1440 80 L0 80 Z" fill="white" />
                    </svg>
                </div>
            </div>
        </section>
    );
}

/* ----------------- subcomponents ----------------- */
function Tab({
    label,
    icon,
    active,
    onClick,
    red,
    blue,
}: {
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
    red: string;
    blue: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-3 rounded-t-lg transition-all duration-150 ${active
                ? "bg-white text-[#323E7F] shadow-md border-b-0"
                : "text-white/90 hover:text-white/100"
                }`}
            style={active ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : undefined}
            aria-pressed={active}
        >
            <span className={`${active ? "" : "opacity-90"}`}>{icon}</span>
            <span className="text-sm md:text-base font-medium">{label}</span>
        </button>
    );
}

function TripRadio({
    label,
    value,
    group,
    setGroup,
}: {
    label: string;
    value: "oneway" | "roundtrip" | "multicity";
    group: string;
    setGroup: (v: "oneway" | "roundtrip" | "multicity") => void;
}) {
    return (
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
                type="radio"
                name="trip"
                value={value}
                checked={group === value}
                onChange={() => setGroup(value)}
                className="accent-[#323E7F]"
            />
            <span>{label}</span>
        </label>
    );
}

function Field({
    label,
    placeholder,
    icon,
    value,
    onChange,
}: {
    label: string;
    placeholder?: string;
    icon?: React.ReactNode;
    value?: string;
    onChange?: (v: string) => void;
}) {
    return (
        <div>
            <label className="text-sm text-gray-600 mb-2 block">{label}</label>
            <div className="flex items-center border rounded-lg px-3 py-2">
                <span className="text-gray-500 mr-2">{icon}</span>
                <input
                    className="w-full outline-none text-sm"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            </div>
        </div>
    );
}
