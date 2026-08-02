import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HeroBanner from "@/components/home/HeroBanner";
import AboutSection from "@/components/home/AboutSection";
import FeaturedTours from "@/components/home/FeaturedTours";
import ServiceCards from "@/components/home/ServiceCards";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import NewsPreview from "@/components/home/NewsPreview";
import RegistrationForm from "@/components/home/RegistrationForm";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <AboutSection />
        <FeaturedTours />
        <ServiceCards />
        <WhyChooseUs />
        <TestimonialSlider />
        <NewsPreview />
        <RegistrationForm />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
