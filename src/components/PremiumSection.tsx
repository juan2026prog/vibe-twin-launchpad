import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, DollarSign, Users, Trophy } from "lucide-react";

export default function PremiumSection() {
  const features = [
    {
      icon: <Check className="w-5 h-5" />,
      text: "Videos/mensajes ilimitados para YouTube, Shorts, OnlyFans, TikTok"
    },
    {
      icon: <Crown className="w-5 h-5" />,
      text: "Alta calidad, sin marca de agua"
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: "Integración con YouTube, TikTok, Instagram, OnlyFans"
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      text: "Gana $3 por suscriptor (20% comisión)"
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      text: "1 año gratis si generas $1,000+"
    }
  ];

  const handlePremiumClick = () => {
    // Open Stripe checkout in new tab
    window.open('https://checkout.stripe.com/PAYMENT_LINK', '_blank');
  };

  return (
    <section id="premium" className="py-20 bg-vibetwin-light-gray">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Premium + Programa de Afiliados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Desbloquea todo el potencial de VibeTwin y empieza a ganar dinero como afiliado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Premium Features */}
            <Card className="shadow-card border-0 bg-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Plan Premium
                </CardTitle>
                <div className="text-4xl font-bold text-primary">
                  $15<span className="text-lg text-gray-500">/mes</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-vibetwin-green rounded-full flex items-center justify-center text-white">
                        {feature.icon}
                      </div>
                      <span className="text-gray-700 leading-relaxed">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={handlePremiumClick}
                  size="lg"
                  className="w-full bg-vibetwin-green hover:bg-vibetwin-green/90 text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Suscribirme ($15/mes)
                </Button>
              </CardContent>
            </Card>

            {/* Affiliate Program */}
            <Card className="shadow-card border-0 bg-gradient-to-br from-primary to-vibetwin-dark text-white">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  Programa de Afiliados
                </CardTitle>
                <div className="text-4xl font-bold text-vibetwin-green">
                  20%<span className="text-lg text-purple-200">comisión</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6 mb-8">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">💰 Gana por cada referido</h4>
                    <p className="text-purple-100 text-sm">
                      $3 por cada suscriptor que traigas = 20% de comisión recurrente
                    </p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🎯 Bonificación especial</h4>
                    <p className="text-purple-100 text-sm">
                      Genera $1,000+ y obtén 1 año gratis de Premium
                    </p>
                  </div>
                  
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📊 Dashboard completo</h4>
                    <p className="text-purple-100 text-sm">
                      Tracking en tiempo real de tus ganancias y referidos
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handlePremiumClick}
                  variant="outline"
                  size="lg"
                  className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Únete como Afiliado
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Trust badges */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Pagos seguros procesados por</p>
            <div className="flex justify-center items-center space-x-8 text-gray-400">
              <span className="font-semibold">Stripe</span>
              <span>•</span>
              <span className="font-semibold">PayPal</span>
              <span>•</span>
              <span className="font-semibold">Secure SSL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}