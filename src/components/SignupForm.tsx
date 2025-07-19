import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, AudioLines } from "lucide-react";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    niche: "",
    photos: null as FileList | null,
    audio: null as FileList | null,
    affiliateCode: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare form data for Make.com webhook
    const submitData = new FormData();
    submitData.append('niche', formData.niche);
    submitData.append('affiliateCode', formData.affiliateCode);
    
    if (formData.photos) {
      Array.from(formData.photos).forEach((file, index) => {
        submitData.append(`photo_${index}`, file);
      });
    }
    
    if (formData.audio && formData.audio[0]) {
      submitData.append('audio', formData.audio[0]);
    }

    try {
      // Placeholder for Make.com integration
      console.log('Submitting to Make.com:', Object.fromEntries(submitData));
      
      // Replace with actual Make.com endpoint
      const response = await fetch('https://hook.us2.make.com/3y2wmjmgeob443z8xcar3z3kg0ybr9p7', {
        method: 'POST',
        body: submitData
      });
      
      if (response.ok) {
        alert('¡Registro exitoso! Te contactaremos pronto.');
        // Reset form
        setFormData({
          niche: "",
          photos: null,
          audio: null,
          affiliateCode: ""
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al enviar. Por favor intenta de nuevo.');
    }
  };

  return (
    <section id="signup" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card border-0">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Crea tu clon digital
              </CardTitle>
              <p className="text-lg text-gray-600">
                Completa el formulario y empieza a generar contenido automáticamente
              </p>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Niche/Platform */}
                <div className="space-y-2">
                  <Label htmlFor="niche" className="text-sm font-medium text-gray-700">
                    Nicho/Plataforma *
                  </Label>
                  <Input
                    id="niche"
                    type="text"
                    required
                    placeholder="Ej: YouTube Shorts - gaming"
                    value={formData.niche}
                    onChange={(e) => setFormData({...formData, niche: e.target.value})}
                    className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>

                {/* Photos/Videos Upload */}
                <div className="space-y-2">
                  <Label htmlFor="photos" className="text-sm font-medium text-gray-700">
                    Fotos/Videos (máx. 5 archivos) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="photos"
                      type="file"
                      required
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => setFormData({...formData, photos: e.target.files})}
                      className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                    />
                    <FileText className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Formatos soportados: JPG, PNG, MP4, MOV
                  </p>
                </div>

                {/* Audio Upload */}
                <div className="space-y-2">
                  <Label htmlFor="audio" className="text-sm font-medium text-gray-700">
                    Audio (máx. 1 min) *
                  </Label>
                  <div className="relative">
                    <Input
                      id="audio"
                      type="file"
                      required
                      accept="audio/*"
                      onChange={(e) => setFormData({...formData, audio: e.target.files})}
                      className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                    />
                    <AudioLines className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500">
                    Formatos soportados: MP3, WAV, M4A
                  </p>
                </div>

                {/* Affiliate Code */}
                <div className="space-y-2">
                  <Label htmlFor="affiliateCode" className="text-sm font-medium text-gray-700">
                    Código de Afiliado (opcional)
                  </Label>
                  <Input
                    id="affiliateCode"
                    type="text"
                    placeholder="Ej: JUAN20"
                    value={formData.affiliateCode}
                    onChange={(e) => setFormData({...formData, affiliateCode: e.target.value})}
                    className="rounded-lg border-gray-300 focus:border-primary focus:ring-primary"
                  />
                  <p className="text-xs text-vibetwin-green">
                    ¿Tienes un código? ¡Úsalo y ahorra en tu suscripción!
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 text-lg font-semibold rounded-lg shadow-glow transition-all duration-300"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Crear mi clon
                </Button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center">
                  Al registrarte aceptas nuestros{" "}
                  <a href="#" className="text-primary hover:underline">
                    Términos de Servicio
                  </a>{" "}
                  y{" "}
                  <a href="#" className="text-primary hover:underline">
                    Política de Privacidad
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
