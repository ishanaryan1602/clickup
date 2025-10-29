import HeroBanner from "@/components/custom/heroBanner/heroBanner";
import Navbar from "@/components/custom/navbar/navbar";

export default function Home() {
  return (
    <div className="h-screen " >
      <Navbar />
      <HeroBanner />
    </div>
  );
}
