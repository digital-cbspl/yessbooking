"use client";

import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  Send,
} from "lucide-react";

export default function InquiryPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Inquiry submitted successfully");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Send Inquiry
        </h1>
        <p className="text-gray-600 mb-8">
          Fill the form below and our team will contact you shortly.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Full Name</label>
            <div className="flex items-center border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <User size={20} className="text-gray-500" />
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Phone Number</label>
            <div className="flex items-center border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <Phone size={20} className="text-gray-500" />
              <input
                type="number"
                required
                placeholder="Enter your phone number"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Email Address</label>
            <div className="flex items-center border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <Mail size={20} className="text-gray-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Pickup */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Pickup Location</label>
            <div className="flex items-center border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <MapPin size={20} className="text-gray-500" />
              <input
                type="text"
                required
                placeholder="Enter pickup location"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Drop Location */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Drop Location</label>
            <div className="flex items-center border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <MapPin size={20} className="text-gray-500" />
              <input
                type="text"
                required
                placeholder="Enter drop location"
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Travel Date</label>
            <div className="flex items-center border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <Calendar size={20} className="text-gray-500" />
              <input
                type="date"
                required
                className="flex-1 bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-sm">Your Message</label>
            <div className="flex items-start border rounded-lg px-3 py-3 gap-3 bg-gray-50">
              <MessageSquare size={20} className="text-gray-500 mt-1" />
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="flex-1 bg-transparent outline-none resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#2d3b78] text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer"
          >
            {loading ? (
              "Sending..."
            ) : (
              <>
                <Send size={18} /> Submit Inquiry
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}
