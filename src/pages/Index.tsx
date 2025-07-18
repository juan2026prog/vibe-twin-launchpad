import Hero from "@/components/Hero";
import SignupForm from "@/components/SignupForm";
import PremiumSection from "@/components/PremiumSection";
import Testimonials from "@/components/Testimonials";
import UrgencySection from "@/components/UrgencySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <SignupForm />
      <Testimonials />
      <PremiumSection />
      <UrgencySection />
      <Footer />
    </div>
  );
};

export default Index;
