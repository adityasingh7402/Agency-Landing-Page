import ImpactSection from "@/components/ImpactSection";
import NavbarDemo from "@/components/Navbar";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-background font-sans">
      <NavbarDemo />
      <ImpactSection />
      <ThemeSwitcher />
    </div>
  );
}
