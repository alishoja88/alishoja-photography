import Link from "next/link";
import { FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="w-[90%] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white/90 hover:text-[#4895EF]">About Me</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Exploring the world through my lens, capturing moments that tell unique stories.
              Professional photographer based in Iran, specializing in street and nature photography.
            </p>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white/90">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'About', href: '/about' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-white/70 hover:text-[#4895EF] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-white/90">Connect With Me</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                href="https://www.instagram.com/ali_shoja88/profilecard/?igsh=cmNmM2RyczdqZnUw"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-[#F72585] transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="w-6 h-6 text-white/90" />
              </Link>
              <Link
                href="https://github.com/alishoja88"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-[#F72585] transition-all duration-300 hover:scale-110"
              >
                <FaGithub className="w-6 h-6 text-white/90" />
              </Link>
              <Link
                href="https://www.youtube.com/@alishoja4810"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/5 hover:bg-[#F72585] transition-all duration-300 hover:scale-110"
              >
                <FaYoutube className="w-6 h-6 text-white/90" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/50">
              © {currentYear} Ali Shoja. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-white/50">
              <Link href="/privacy" className="hover:text-[#4895EF] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#4895EF] transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;