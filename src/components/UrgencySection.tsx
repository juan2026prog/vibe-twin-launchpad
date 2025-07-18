import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertTriangle } from "lucide-react";

export default function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Calculate time left (7 days from now)
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const targetDate = new Date(now + 7 * 24 * 60 * 60 * 1000).getTime(); // 7 days from now
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    // Update immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Exit intent popup
    let hasShownPopup = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownPopup) {
        hasShownPopup = true;
        if (confirm("¡No te pierdas 1 mes gratis con VibeTwin! ¿Quieres registrarte ahora?")) {
          document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-red-500 to-red-600 text-white">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ⏰ ¡Oferta limitada!
            </h3>
            
            <p className="text-xl mb-8 text-red-100">
              Oferta gratis termina en:
            </p>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-red-100 uppercase tracking-wide">
                  Días
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-red-100 uppercase tracking-wide">
                  Horas
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-red-100 uppercase tracking-wide">
                  Min
                </div>
              </div>
              <div className="bg-white/20 rounded-lg p-4">
                <div className="text-3xl md:text-4xl font-bold">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-red-100 uppercase tracking-wide">
                  Seg
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg text-red-100">
                🔥 Solo quedan <span className="font-bold">247 cupos</span> para el mes gratis
              </p>
              <p className="text-sm text-red-200">
                Después de esta oferta, el precio será $29/mes
              </p>
            </div>

            {/* Urgency indicators */}
            <div className="mt-8 flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Oferta por tiempo limitado</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Cupos limitados</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}