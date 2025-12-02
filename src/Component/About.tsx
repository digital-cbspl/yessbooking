import { Car, CheckCircle } from "lucide-react";
import { About1, About2 } from "../assests/image/image";

export default function AboutSection() {
    return (
        <section className="w-full bg-[#f4f6fc] py-20">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT IMAGE GROUP */}
                <div className="grid grid-cols-6 gap-6">

                    {/* TOP full-width image */}
                    <div className="col-span-6">
                        <img
                            src={About1.src}
                            className="w-full h-[250px] object-cover object-top rounded-2xl"
                        />
                    </div>

                    {/* Bottom-left small image */}
                    <div className="col-span-3">
                        <img
                            src={About2.src}
                            className="w-full h-[220px] object-cover rounded-2xl"
                        />
                    </div>

                    {/* Bottom-right feature box */}
                    <div className="col-span-3 bg-[#2d3b78] text-white rounded-2xl p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3">
                            <Car className="w-10 h-10 text-white" />
                            <h2 className="text-4xl font-bold">2+</h2>
                        </div>
                        <p className="mt-3 text-xl">Years Of Service</p>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="flex flex-col justify-center">

                    <p className="text-lg font-semibold text-[#0a3d91] flex items-center gap-2">
                        About Us
                        <Car className="w-5 h-5 text-[#0a3d91]" />
                    </p>

                    <h2 className="mt-2 text-4xl font-extrabold text-black leading-tight">
                        Your All-in-One Travel & Service Partner
                    </h2>

                    <p className="mt-4 text-gray-600 leading-relaxed">
                        Yess Booking provides every type of booking service in one place—whether it’s taxis, buses, flights, hotels, or complete travel packages. A seamless platform designed to make every journey simple, fast, and reliable.
                    </p>

                    {/* Bullet Points */}
                    <div className="mt-6 space-y-3">
                        <p className="flex items-center gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-[#0a3d91]" />
                            Multi-Service Booking
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-[#0a3d91]" />
                            Fast & Easy Process
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-[#0a3d91]" />
                            Trusted & Affordable
                        </p>
                        <p className="flex items-center gap-3 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-[#0a3d91]" />
                            24/7 Availability
                        </p>
                    </div>

                    {/* BUTTON */}
                    <button className="mt-8 bg-[#2d3b78] text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 w-fit cursor-pointer hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] hover:text-white">
                        BOOK NOW
                    </button>
                </div>

            </div>
        </section>
    );
}
