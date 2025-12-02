import { Amex, Mastercard, Visa } from "../assests/image/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8faff] pt-16 pb-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* LOGO + ADDRESS */}
        <div>
          <h1 className="text-3xl font-semibold text-[#2d3b78] flex items-center gap-2">
            <span className="text-4xl">◎</span> Trizen
          </h1>

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
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Company
          </h2>
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
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Other Links
          </h2>
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

        {/* SUBSCRIBE NOW */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Subscribe now
          </h2>
          <div className="w-10 h-[3px] bg-[#2d3b78] mt-1 mb-4 rounded-full"></div>

          <p className="leading-relaxed">
            Subscribe for latest updates & promotions
          </p>

          {/* EMAIL BOX */}
          <div className="mt-4">
            <div className="flex items-center border rounded-xl shadow-sm bg-white">
              <input
                type="email"
                className="flex-1 px-4 py-3 outline-none bg-transparent"
                placeholder="Email address"
              />
              <button className="bg-[#2d3b78] text-white px-5 py-2 rounded-r-xl font-semibold">
                Go
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <span>🔒</span> Your information is safe with us.
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 mt-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">f</div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">t</div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">i</div>
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">in</div>
          </div>
        </div>
      </div>

      {/* BOTTOM LINKS */}
      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">

        <div className="flex items-center gap-4">
          <span>Terms & Conditions</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>Privacy Policy</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>Help Center</span>
        </div>

        <div className="flex items-center gap-3">
          <span>We Accept</span>
          <img src={Visa.src} className="h-6" />
          <img src={Mastercard.src} className="h-6" />
          <img src={Amex.src} className="h-6" />
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="max-w-7xl mx-auto px-6 mt-6 text-center text-sm text-gray-600">
        © 2025 Yess Booking | All Rights Reserved || Developed by <a href="/" target="_blank" rel="noopener noreferrer">CBSPL</a>.
      </div>
    </footer>
  );
}
