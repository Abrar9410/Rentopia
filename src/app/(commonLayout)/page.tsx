import HeroBanner from "@/components/homepage/HeroBanner";
import HowItWorks from "@/components/homepage/HowItWorks";
import PopularCategories from "@/components/homepage/PopularCategories";
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
      <HowItWorks />
    </>
  );
}
