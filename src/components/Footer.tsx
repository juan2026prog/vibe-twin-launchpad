import { MessageCircle, Youtube, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "X (Twitter)",
      icon: <Twitter className="w-5 h-5" />,
      url: "https://twitter.com/VibeTwin",
      handle: "@VibeTwin"
    },
    {
      name: "TikTok",
      icon: <div className="w-5 h-5 font-bold text-center">T</div>,
      url: "https://tiktok.com/@VibeTwin",
      handle: "@VibeTwin"
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      url: "https://youtube.com/@VibeTwin",
      handle: "@VibeTwin"
    },
    {
      name: "Reddit",
      icon: <MessageCircle className="w-5 h-5" />,
      url: "https://reddit.com/r/VibeTwin",
      handle: "r/VibeTwin"
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      url: "mailto:contact@vibetwin.com",
      handle: "contact@vibetwin.com"
    }
  ];

  const quickLinks = [
    { name: "Prueba Gratis", href: "#signup" },
    { name: "Premium", href: "#premium" },
    { name: "Afiliados", href: "#premium" },
    { name: "Soporte", href: "mailto:contact@vibetwin.com" }
  ];

  const legalLinks = [
    { name: "Términos de Servicio", href: "#" },
    { name: "Política de Privacidad", href: "#" },
    { name: "DMCA", href: "#" },
    { name: "Cookies", href: "#" }
  ];

  return (
    <footer className="bg-vibetwin-dark-gray text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-vibetwin-green bg-clip-text text-transparent mb-4">
              VibeTwin
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              La plataforma de IA líder para crear avatares digitales 3D. 
              Automatiza tu contenido en YouTube, TikTok, OnlyFans e Instagram las 24 horas del día.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg"
                >
                  {social.icon}
                  <span className="text-sm">{social.handle}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 VibeTwin. Todos los derechos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Hecho con ❤️ para creadores</span>
              <span>•</span>
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}