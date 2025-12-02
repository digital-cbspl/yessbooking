"use client";

import { Heart, MapPin, Star } from "lucide-react";
import { About1, Hotel1, Hotel2, Hotel3, Hotel4 } from "../assests/image/image";

export default function Hotels() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADING */}
                <h2 className="text-4xl font-extrabold flex text-black items-center gap-2">
                  Best Hotel  Deals
                </h2>
                <p className="text-gray-600 mt-2 text-lg">
                    Quality as judged by customers. Book at the ideal price!
                </p>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">

                    <HotelCard
                        image={Hotel1.src}
                        tag="Family"
                        discount="-28%"
                        title="Fairmont Resort, Dubai, United Arab Emirates"
                        location="Dubai, UAE"
                        price="148.25"
                    />

                    <HotelCard
                        image={Hotel2.src}
                        tag="Luxury"
                        discount="-25%"
                        title="Fairmont Resort, Dubai, United Arab Emirates"
                        location="Dubai, UAE"
                        price="148.25"
                    />

                    <HotelCard
                        image={Hotel3.src}
                        tag="Standard"
                        discount="-35%"
                        title="Fairmont Resort, Dubai, United Arab Emirates"
                        location="Dubai, UAE"
                        price="148.25"
                    />

                    <HotelCard
                        image={Hotel4.src}
                        tag="Business"
                        discount="-27%"
                        title="Fairmont Resort, Dubai, United Arab Emirates"
                        location="Dubai, UAE"
                        price="148.25"
                    />

                </div>
            </div>
        </section>
    );
}

function HotelCard({ image, title, location, tag, discount, price }: any) {
    return (
        <div className="relative flex items-stretch gap-6">

            {/* LEFT IMAGE */}
            <div className="relative w-[48%]">
                <img
                    src={image}
                    className="w-full h-[260px] rounded-2xl object-cover"
                />

                {/* HEART ICON */}
                <button className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md">
                    <Heart className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            {/* RIGHT CARD PANEL OVERLAPPING IMAGE */}
            <div className="absolute top-0 left-[35%] w-[60%] bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-7 z-10">

                {/* BLUE DISCOUNT RIBBON */}
                <div className="absolute top-0 right-0 bg-[#2d3b78] text-white px-3 py-1 text-sm font-semibold
                                rounded-tr-2xl rounded-bl-xl">
                    {discount}
                </div>

                {/* TAG */}
                <span className="bg-[#8ea1d6] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {tag}
                </span>

                {/* TITLE */}
                <h3 className="mt-3 text-black text-xl font-semibold leading-snug">
                    {title}
                </h3>

                {/* LOCATION */}
                <p className="flex items-center gap-2 text-gray-600 text-sm mt-3">
                    <MapPin className="w-4 h-4" /> {location}
                </p>

                {/* STAR RATING */}
                <div className="flex mt-2 gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                            key={i}
                            className="w-4 h-4 text-black fill-black"
                        />
                    ))}
                </div>

                {/* PRICE + BUTTON */}
                <div className="flex justify-between items-center mt-6">
                    <p className="text-xl text-[#000] font-bold">
                        ${price}
                        <span className="text-gray-500 text-sm"> / night</span>
                    </p>

                    <button className="px-5 py-2 border rounded-full text-sm font-medium bg-[#f2f4f6] cursor-pointer text-black border-gray-300 hover:bg-[#2d3b78] hover:text-white transition">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
