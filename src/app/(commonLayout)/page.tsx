import HeroBanner from "@/components/homepage/HeroBanner";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Rentopia | Home",
  description: "This is the homepage of the rental platform Rentopia."
};


export default function Homepage() {
  return (
    <>
      <HeroBanner />
    </>
  );
}
