"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Heart, Users, Briefcase } from "lucide-react";
import Image from "next/image";
import { Car1, Car2, Car3, Car4, Car5, Car6 } from "../assests/image/image";

const cars = [
  {
    tag: "",
    tagColor: "",
    name: "Mercedes-Benz CLA 250",
    category: "Luxury Sedan",
    rating: "4.4/5",
    reviews: 48,
    price: "$23.00",
    passengers: 4,
    luggage: 1,
    img: Car1.src,
  },
  {
    tag: "FEATURED",
    tagColor: "bg-green-500",
    name: "Honda Accord Hybrid",
    category: "Sedan",
    rating: "4.6/5",
    reviews: 63,
    price: "$33.00",
    passengers: 4,
    luggage: 1,
    img: Car2.src,
  },
  {
    tag: "",
    tagColor: "",
    name: "Volvo S60",
    category: "Luxury Sedan",
    rating: "4.3/5",
    reviews: 29,
    price: "$23.00",
    passengers: 4,
    luggage: 1,
    img: Car3.src,
  },
  {
    tag: "BESTSELLER",
    tagColor: "bg-green-500",
    name: "Nissan Versa",
    category: "Sedan",
    rating: "4.7/5",
    reviews: 54,
    price: "$27.00",
    passengers: 4,
    luggage: 1,
    img: Car4.src,
  },
  {
    tag: "FEATURED",
    tagColor: "bg-green-500",
    name: "Chevrolet Cadillac CTS-V",
    category: "luxury performance sedan",
    rating: "4.8/5",
    reviews: 91,
    price: "$49.00",
    passengers: 4,
    luggage: 2,
    img: Car5.src,
  },
  {
    tag: "",
    tagColor: "",
    name: "Fiat 500 hatchback",
    category: "Compact",
    rating: "4.5/5",
    reviews: 36,
    price: "$28.00",
    passengers: 4,
    luggage: 1,
    img: Car6.src,
  },
];

export default function CabCarousel() {
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
      spacing: 24,
    },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 2, spacing: 16 } },
      "(max-width: 640px)": { slides: { perView: 1, spacing: 12 } },
    },
  });

  const goPrev = () => instanceRef.current?.prev();
  const goNext = () => instanceRef.current?.next();

  return (
    <section className="py-16 bg-[#f6f8fb]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-slate-900">
          Recommended Car Rentals
        </h2>

        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {cars.map((car, index) => (
              <div
                key={index}
                className="keen-slider__slide bg-white rounded-2xl shadow-sm border p-6 min-h-[420px] flex flex-col"
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${car.tagColor}`}
                  >
                    {car.tag}
                  </span>
                  <Heart className="w-5 h-5 text-gray-300" />
                </div>

                <div className="mt-4">
                  <Image
                    src={car.img}
                    width={700}
                    height={320}
                    alt={car.name}
                    className="w-full h-[170px] object-contain"
                  />
                </div>

                <div className="mt-4 flex-1">
                  <p className="text-sm text-gray-500">{car.category}</p>

                  <h3 className="text-xl font-semibold mt-1 text-slate-800">
                    {car.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block bg-[#2d3b78] text-white px-2 py-1 rounded-md text-sm font-semibold">
                      {car.rating}
                    </span>
                    <span className="text-gray-500 text-sm">Average</span>
                    <span className="text-gray-400 text-sm">
                      ({car.reviews} Reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{car.passengers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-gray-400" />
                      <span className="text-sm">{car.luggage}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-500">From</p>
                    <p className="text-lg font-bold text-slate-900">{car.price}</p>
                    <p className="text-sm text-gray-500">Per day</p>
                  </div>
                </div>

                <div className="mt-4">
                  <button className="text-blue-600 font-medium flex items-center gap-1">
                    See details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goPrev}
            className="absolute left-[-18px] top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 text-black hover:bg-[#2d3b78] hover:text-white cursor-pointer rounded-full"
          >
            ←
          </button>

          <button
            onClick={goNext}
            className="absolute right-[-18px] top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 text-black hover:bg-[#2d3b78] hover:text-white cursor-pointer rounded-full"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
