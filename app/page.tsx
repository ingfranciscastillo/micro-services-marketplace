"use client";
import { Navbar } from "@/components/layout/Navbar";
import HeaderSection from "@/components/layout/HeaderSection";
import CategoriesSection from "@/components/layout/Categories";
import FeaturedSection from "@/components/layout/FeaturedSection";
import StatsSection from "@/components/layout/StatsSection";
import CtaSection from "@/components/layout/CtaSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      <main className="flex-1">
        <HeaderSection />
        <CategoriesSection />
        <FeaturedSection />
        <StatsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
