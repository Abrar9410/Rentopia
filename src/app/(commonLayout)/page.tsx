import HeroBanner from "@/components/homepage/HeroBanner";
import HowItWorks from "@/components/homepage/HowItWorks";
import MostRentedItems from "@/components/homepage/MostRentedItems";
import NewArrivals from "@/components/homepage/NewArrivals";
import PopularCategories from "@/components/homepage/PopularCategories";
import Testimonials from "@/components/homepage/Testimonials";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Rentopia | Home",
  description: "This is the homepage of the rental platform Rentopia."
};


export default function Homepage() {
  return (
    <>
      <HeroBanner />
      <PopularCategories />
      <MostRentedItems />
      <NewArrivals />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
