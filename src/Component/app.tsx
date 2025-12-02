"use client";

import Image from "next/image";
import { CheckCircle, Link } from "lucide-react";
import { Application, Appstore, Playstore } from "../assests/image/image";

export default function AppSection() {
  return (
    <section className="relative w-full bg-[#F5F7FC] py-20 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-10 left-20 w-16 h-16 bg-blue-100 rounded-xl opacity-40"></div>
      <div className="absolute bottom-20 right-40 w-20 h-20 bg-purple-100 rounded-xl opacity-40 rotate-45"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight">
            Yess Booking Android and IOS App is Available!
          </h2>

          <div className="bg-white/40 backdrop-blur-sm p-6 mt-8 rounded-xl w-full md:w-[75%]">
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <CheckCircle className="w-7 h-7 text-blue-500" />
                <span className="text-gray-700 text-lg">
                  Access and change your itinerary on-the-go
               </span>
              </li>

              <li className="flex items-center gap-4">
                <CheckCircle className="w-7 h-7 text-blue-500" />
                <span className="text-gray-700 text-lg">
                  Free cancellation on select hotels
                </span>
              </li>

              <li className="flex items-center gap-4">
                <CheckCircle className="w-7 h-7 text-blue-500" />
                <span className="text-gray-700 text-lg">
                  Get real-time trip updates
                </span>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-6 mt-10">
             <a href="https://www.apple.com/in/app-store/" target="_blank" rel="noopener noreferrer">
            <Image
              src={Appstore.src}
              alt="App Store"
              width={180}
              height={55}
              className="cursor-pointer"
            />
            </a>
            <a href="https://play.google.com/" target="_blank" rel="noopener noreferrer">
            <Image
              src={Playstore.src}
              alt="Google Play"
              width={180}
              height={55}
              className="cursor-pointer"
            />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE PHONE IMAGE */}
        <div className="flex justify-center md:justify-end">
          <Image
            src={Application.src}
            alt="App Preview"
            width={550}
            height={550}
            className="rotate-[-10deg] drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
