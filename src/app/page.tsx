import ImpactSection from "@/components/ImpactSection";
import NavbarDemo from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import ServiceSection from "@/components/ServiceSection";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Image from "next/image";
import TimelineSection from "@/components/TimelineSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <div className="bg-background font-sans">
      <NavbarDemo />
      <ImpactSection />
      <ThemeSwitcher />
      <ServiceSection />
      <ProjectsSection />
      <TimelineSection />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}
