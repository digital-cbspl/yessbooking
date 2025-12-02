import Image from "next/image";
import Header from "../layout/header";
import Banner from "../Component/Banner";
import FeaturesSection from "../Component/Feature";
import AboutSection from "../Component/About";
import Hotels from "../Component/Hotel";
import TopPlaces from "../Component/topplaces";
import CabCarousel from "../Component/Cab";
import AppSection from "../Component/app";
import Flights from "../Component/Flights";

export default function Home() {
  return (
    <>
    <Banner />
    <FeaturesSection />
    <AboutSection />
    <Hotels />
    <CabCarousel />
    <TopPlaces />
    <AppSection />
    <Flights />
    </>
  );
}
