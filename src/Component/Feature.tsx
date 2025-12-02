import { Megaphone, Globe2, ThumbsUp } from "lucide-react";

export default function FeaturesSection() {
    return (
        <section className="relative w-full py-20 bg-white overflow-hidden">

            {/* Soft floating shapes */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-12 left-16 w-6 h-6 bg-yellow-200 rounded-lg opacity-40"></div>
                <div className="absolute bottom-20 left-10 w-8 h-8 bg-blue-200 rounded-md opacity-40 rotate-12"></div>
                <div className="absolute top-6 right-32 w-6 h-6 bg-green-200 rounded-sm opacity-30"></div>
                <div className="absolute bottom-10 right-12 w-6 h-6 bg-pink-200 rounded-full opacity-40"></div>
                <div className="absolute top-1/2 right-24 w-7 h-7 bg-red-200 rounded-full opacity-30"></div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14 text-center relative z-10">

                {/* Feature 1 */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-[0_0_40px_rgba(0,115,255,0.18)] hover:scale-110 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                            <Megaphone className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#0b1e3f]">
                        You’ll never roam alone
                    </h3>

                    <p className="mt-3 text-gray-500 leading-relaxed max-w-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-[0_0_40px_rgba(0,115,255,0.18)] hover:scale-110 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                            <Globe2 className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#0b1e3f]">
                        A world of choice – anytime, anywhere
                    </h3>

                    <p className="mt-3 text-gray-500 leading-relaxed max-w-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center shadow-[0_0_40px_rgba(0,115,255,0.18)] hover:scale-110 transition-transform duration-300">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                            <ThumbsUp className="w-8 h-8 text-blue-600" />
                        </div>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-[#0b1e3f]">
                        Peace of mind, wherever you wander
                    </h3>

                    <p className="mt-3 text-gray-500 leading-relaxed max-w-xs">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    </p>
                </div>

            </div>
        </section>
    );
}
