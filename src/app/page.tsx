import ImpactSection from "@/components/ImpactSection";
import NavbarDemo from "@/components/Navbar";
import { ProjectsSection } from "@/components/ProjectsSection";
import ServiceSection from "@/components/ServiceSection";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import TimelineSection from "@/components/TimelineSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/BlogSection";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="bg-background font-sans">
      <NavbarDemo />
      <div className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 md:pb-16">
        <HeroSection />
      </div>
      <ImpactSection />
      <ThemeSwitcher />
      <ServiceSection />
      <ProjectsSection />
      <TimelineSection />
      <Testimonials />
      <BlogSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
