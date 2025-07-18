import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alex",
      role: "Creador de OnlyFans",
      text: "VibeTwin duplicó mi presencia en OnlyFans sin esfuerzo. Ahora genero contenido las 24 horas mientras duermo.",
      avatar: "A",
      rating: 5,
      platform: "OnlyFans"
    },
    {
      name: "Mia",
      role: "YouTuber",
      text: "Mis Shorts en YouTube ahora son automáticos. ¡Increíble! Mi canal creció 300% en solo 2 meses.",
      avatar: "M",
      rating: 5,
      platform: "YouTube"
    },
    {
      name: "Sam",
      role: "Creador de IA",
      text: "Como creador de IA, VibeTwin es un game-changer. La calidad de los avatares es impresionante y muy realista.",
      avatar: "S",
      rating: 5,
      platform: "TikTok"
    }
  ];

  const platformColors = {
    "OnlyFans": "bg-blue-500",
    "YouTube": "bg-red-500",
    "TikTok": "bg-black"
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que dicen los creadores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Miles de creadores ya están usando VibeTwin para hacer crecer sus plataformas
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card hover:shadow-glow transition-all duration-300 border-0 bg-white group hover:-translate-y-2">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-10 h-10 text-primary/20 group-hover:text-primary/40 transition-colors duration-300" />
                  </div>

                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {testimonial.role}
                      </div>
                      <div className="flex items-center mt-1">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            platformColors[testimonial.platform as keyof typeof platformColors]
                          }`}
                        />
                        <span className="text-xs text-gray-500 font-medium">
                          {testimonial.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                5,000+
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Creadores activos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-vibetwin-green mb-2">
                1M+
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Videos generados
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                98%
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Satisfacción
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-vibetwin-green mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-sm uppercase tracking-wide">
                Generación activa
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}