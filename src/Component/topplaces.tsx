import { Star } from "lucide-react";
import { Place1, Place2, Place3, Place4, Place5 } from "../assests/image/image";

export default function TopPlaces() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-4xl font-extrabold text-black mb-3">Top Places to Visit</h2>
                        <p className="text-gray-600 max-w-xl">
                            Morbi convallis bibendum urna ut viverra Maecenas quis
                        </p>
                    </div>
                    <button className="bg-[#2d3b78] text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 w-fit cursor-pointer hover:bg-gradient-to-r hover:from-[#e93216] hover:to-[#c01d06]">
                        Discover More
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {/* NEW YORK */}
                    <div className="relative rounded-xl overflow-hidden shadow-md group">
                        <img src={Place1.src} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded">NEW YORK</div>

                        <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 to-transparent transform translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-xl font-semibold">Main Street Park</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex text-yellow-400">{[...Array(4)].map((_, i) => (<Star key={i} size={16} />))}<Star size={16} className="text-gray-400" /></div>
                                <p>(70694 Reviews)</p>
                            </div>
                        </div>
                    </div>

                    {/* HONG KONG */}
                    <div className="relative rounded-xl overflow-hidden shadow-md group">
                        <img src={Place2.src} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded">HONG KONG</div>

                        <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 to-transparent transform translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-xl font-semibold">Lugard Road Lookout</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex text-yellow-400">{[...Array(4)].map((_, i) => (<Star key={i} size={16} />))}<Star size={16} className="text-gray-400" /></div>
                                <p>(70694 Reviews)</p>
                            </div>
                        </div>
                    </div>

                    {/* SHANGHAI (BIG CARD) */}
                    <div className="relative row-span-2 rounded-xl overflow-hidden shadow-md group">
                        <img src={Place5.src} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded">SHANGHAI</div>


                        <div className="absolute bottom-0 left-0 w-full p-6 text-white bg-gradient-to-t from-black/100 to-transparent transform translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-2xl font-semibold">Oriental Pearl TV Tower</h3>
                            <div className="flex items-center gap-2 text-sm mt-1">
                                <div className="flex text-yellow-400">{[...Array(5)].map((_, i) => (<Star key={i} size={16} />))}</div>
                                <p>(70694 Reviews)</p>
                            </div>
                        </div>
                    </div>

                    {/* CHICAGO */}
                    <div className="relative rounded-xl overflow-hidden shadow-md group">
                        <img src={Place3.src} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded">CHICAGO</div>

                        <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 to-transparent transform translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-xl font-semibold">Chicago Cultural Center</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex text-yellow-400">{[...Array(4)].map((_, i) => (<Star key={i} size={16} />))}<Star size={16} className="text-gray-400" /></div>
                                <p>(70694 Reviews)</p>
                            </div>
                        </div>
                    </div>

                    {/* LAS VEGAS */}
                    <div className="relative rounded-xl overflow-hidden shadow-md group">
                        <img src={Place4.src} className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-xs font-semibold rounded">LAS VEGAS</div>

                        <div className="absolute bottom-0 left-0 w-full p-4 text-white bg-gradient-to-t from-black/80 to-transparent transform translate-y-20 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <h3 className="text-xl font-semibold">Planet Hollywood Resort</h3>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex text-yellow-400">{[...Array(4)].map((_, i) => (<Star key={i} size={16} />))}<Star size={16} className="text-gray-400" /></div>
                                <p>(70694 Reviews)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
