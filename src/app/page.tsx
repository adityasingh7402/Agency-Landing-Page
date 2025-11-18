import ImpactSection from "@/components/ImpactSection";
import NavbarDemo from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-black font-sans dark:bg-black">
      <NavbarDemo />
      <ImpactSection />
    </div>
  );
}
