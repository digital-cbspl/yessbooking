"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Building2,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    User,
} from "lucide-react";
import { Logo, Logob } from "../assests/image/image";

export default function Header() {
    const [hideTopbar, setHideTopbar] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 70) setHideTopbar(true);
            else setHideTopbar(false);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="w-full text-white sticky top-0 z-30 bg-[#2d3b78]">
            
            {/* FIXED LOGO */}
            <a href="/" rel="noopener noreferrer">
                <div className="absolute top-0 left-10 z-40 bg-white p-5 pl-8 cursor-pointer">
                    <Image
                        src={Logo.src}
                        alt="SwiftRide"
                        width={90}
                        height={100}
                        className="object-contain"
                    />
                    <Image
                        src={Logob.src}
                        alt="SwiftRide"
                        width={90}
                        height={80}
                        className="object-contain"
                    />
                </div>
            </a>

            {/* TOPBAR */}
            <div
                className={`relative w-full transition-all duration-300 overflow-hidden
                px-15 border-b border-white bg-[#2d3b78]
                ${hideTopbar ? "h-0 opacity-0" : "h-[40px] opacity-100"}`}
            >
                <div className="absolute inset-0 z-0 flex">
                    <div className="w-[70%] bg-[#2d3b78]"></div>
                    <div className="w-[30%] bg-white diagonal-bg"></div>
                </div>

                <div className="relative z-10 h-full flex items-center justify-between ml-36">
                    <div className="flex items-center gap-10 text-sm">
                        <div className="flex items-center gap-2">
                            <Building2 className="text-[#e92d16]" size={17} />
                            Yess Booking
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="text-[#e92d16]" size={17} />
                            +123-456-7890
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail className="text-[#e92d16]" size={17} />
                            info@example.com
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-black text-lg cursor-pointer">
                        <Facebook size={19} className="hover:text-[#e92d16]" />
                        <Twitter size={19} className="hover:text-[#e92d16]" />
                        <Instagram size={19} className="hover:text-[#e92d16]" />
                        <Linkedin size={19} className="hover:text-[#e92d16]" />
                    </div>
                </div>
            </div>

            {/* NAVBAR */}
            <div className="w-full bg-[#2d3b78] py-5 px-10 flex items-center justify-center shadow-md">
                
                <nav className="flex items-center gap-12 text-lg font-light ml-36">
                    <a href="/Flight" className="hover:text-[#e92d16]">Flights</a>
                    <a href="/Hotel" className="hover:text-[#e92d16]">Hotels</a>
                    <a href="/Train" className="hover:text-[#e92d16]">Trains</a>
                    <a href="/Cab" className="hover:text-[#e92d16]">Cabs</a>
                    <a href="/Bus" className="hover:text-[#e92d16]">Buses</a>
                    {/* <a href="#" className="hover:text-[#e92d16]">Cruises</a>
                    <a href="#" className="hover:text-[#e92d16]">Tours</a> */}
                    <a href="/Inquiry" className="hover:text-[#e92d16]">Inquiry</a>
                </nav>

                {/* RIGHT SIDE — Login / Signup */}
                <div className="flex items-center gap-6 absolute right-14">
                    <button className="bg-white text-black cursor-pointer font-semibold px-6 py-3 rounded-md flex items-center gap-2 transition-all duration-300
                        hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] hover:text-white">
                        <User size={20} />
                        Login / Signup
                    </button>
                </div>

            </div>
        </header>
    );
}
