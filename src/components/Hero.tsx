import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen text-white relative overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-vibetwin-dark/90 via-primary/80 to-vibetwin-dark/90" />
      
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              VibeTwin:
            </span>
            <br />
            <span className="text-white">
              Tu clon digital publica 24/7 en{" "}
            </span>
            <span className="text-vibetwin-green">
              YouTube, Shorts, OnlyFans, TikTok
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto leading-relaxed">
            Sube fotos, videos y audio. Nuestra IA crea videos y mensajes personalizados automáticamente.{" "}
            <span className="text-vibetwin-green font-semibold">
              Prueba gratis 1 mes + gana $3 por suscriptor como afiliado.
            </span>
          </p>

          {/* Video Section */}
          <div className="mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-vibetwin-dark to-primary flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-20 h-20 text-white/80 mx-auto mb-4" />
                    <p className="text-white/70 text-lg">
                      Video placeholder: Avatar generando Short + OnlyFans teaser
                    </p>
                    <p className="text-white/50 text-sm mt-2">
                      YouTube Video ID: [PLACEHOLDER]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('signup')}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Prueba Gratis 1 Mes
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection('premium')}
              variant="outline"
              className="bg-vibetwin-green hover:bg-vibetwin-green/90 text-white border-vibetwin-green px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Go Premium ($15/mes)
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-purple-200 text-sm mb-4">Creadores confían en VibeTwin</p>
            <div className="flex justify-center space-x-8 text-white/60">
              <span>YouTube</span>
              <span>•</span>
              <span>TikTok</span>
              <span>•</span>
              <span>OnlyFans</span>
              <span>•</span>
              <span>Instagram</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}