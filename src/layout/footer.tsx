import { Amex, Mastercard, Visa, Logo, Logob } from "../assests/image/image";
import { Facebook, Twitter, Instagram, Linkedin, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8faff] pt-16 pb-6 text-gray-700">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">

        {/* LOGO + ADDRESS */}
        <div className="h-full">
          <div className="flex items-center gap-3">
            <img src={Logo.src} alt="Logo 1" className="h-10 w-auto" />
            <img src={Logob.src} alt="Logo 2" className="h-10 w-auto" />
          </div>

          <p className="mt-4 leading-relaxed">
            Morbi convallis bibendum urna ut viverra.
            Maecenas consequat.
          </p>

          <p className="mt-4 leading-relaxed">
            3015 Grand Ave, Coconut Grove, <br />
            Cerrick Way, FL 12345
          </p>

          <p className="mt-4">+123-456-789</p>
          <p>trizen@yourwebsite.com</p>
        </div>

        {/* COMPANY */}
        <div className="h-full">
          <h2 className="text-lg font-semibold text-gray-900">Company</h2>
          <div className="w-10 h-[3px] bg-[#2d3b78] mt-1 mb-4 rounded-full"></div>

          <ul className="space-y-2">
            <li>About us</li>
            <li>Services</li>
            <li>Jobs</li>
            <li>News</li>
            <li>Support</li>
            <li>Advertising</li>
          </ul>
        </div>

        {/* OTHER LINKS */}
        <div className="h-full">
          <h2 className="text-lg font-semibold text-gray-900">Other Links</h2>
          <div className="w-10 h-[3px] bg-[#2d3b78] mt-1 mb-4 rounded-full"></div>

          <ul className="space-y-2">
            <li>USA Vacation Packages</li>
            <li>USA Flights</li>
            <li>USA Hotels</li>
            <li>USA Car Hire</li>
            <li>Create an Account</li>
            <li>Trizen Reviews</li>
          </ul>
        </div>

        {/* SUBSCRIBE */}
        <div className="h-full">
          <h2 className="text-lg font-semibold text-gray-900">Subscribe now</h2>
          <div className="w-10 h-[3px] bg-[#2d3b78] mt-1 mb-4 rounded-full"></div>

          <p className="leading-relaxed">
            Subscribe for latest updates & promotions
          </p>

          <div className="mt-4">
            <div className="flex items-center border rounded-xl shadow-sm bg-white overflow-hidden">
              <input
                type="email"
                className="flex-1 px-4 py-3 outline-none bg-transparent"
                placeholder="Email address"
              />
              <button className="bg-[#2d3b78] text-white px-5 py-2 font-semibold hover:bg-[#1b254f] hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06] cursor-pointer transition">
                Go
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <Lock className="w-4 h-4" /> Your information is safe with us.
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM LINKS + SOCIAL ICONS ON SAME LINE */}
      <div className="max-w-7xl mx-auto px-6 mt-4 flex flex-wrap justify-between items-center gap-6 text-sm text-gray-600">

        {/* BOTTOM LINKS */}
        <div className="flex items-center gap-4">
          <span>Terms & Conditions</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>Privacy Policy</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>Help Center</span>
        </div>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#2d3b78] hover:text-white cursor-pointer">
            <Facebook className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#2d3b78] hover:text-white cursor-pointer">
            <Twitter className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#2d3b78] hover:text-white cursor-pointer">
            <Instagram className="w-5 h-5" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#2d3b78] hover:text-white cursor-pointer">
            <Linkedin className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* SEPARATOR */}
      <div className="max-w-7xl mx-auto px-6 mt-2">
        <div className="h-px w-full bg-gray-300"></div>
      </div>

      {/* COPYRIGHT + WE ACCEPT ON SAME LINE */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">

        {/* COPYRIGHT */}
        <div>
          © 2025 Yess Booking | All Rights Reserved || Developed by{" "}
          <a href="/" target="_blank" rel="noopener noreferrer">CBSPL</a>.
        </div>

        {/* WE ACCEPT */}
        <div className="flex items-center gap-3">
          <span>We Accept</span>
          <img src={Visa.src} className="h-6" />
          <img src={Mastercard.src} className="h-6" />
          <img src={Amex.src} className="h-6" />
        </div>
      </div>
    </footer>
  );
}
