import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import SignupForm from "@/components/SignupForm";
import PremiumSection from "@/components/PremiumSection";
import Testimonials from "@/components/Testimonials";
import UrgencySection from "@/components/UrgencySection";
import Footer from "@/components/Footer";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        {user ? (
          <Button onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        ) : (
          <Button onClick={() => navigate('/auth')}>
            Iniciar Sesión
          </Button>
        )}
      </div>
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
