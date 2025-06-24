import React from 'react';
import {
  Home,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import credaiLogo from '../assets/credaiLogo.png';

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="group flex items-center text-base text-gray-300 transition-all duration-200 hover:text-[#066b70] hover:translate-x-1 py-1.5 lg:py-0"
  >
    <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#066b70] opacity-0 transition-all duration-200 group-hover:opacity-100" />
    {children}
  </a>
);

const socialLinks = [
  {
    icon: Facebook,
    href: '#',
    label: 'Facebook',
    color: 'bg-[#1877F2]',
    hoverColor: 'hover:bg-[#1877F2]/90'
  },
  {
    icon: Instagram,
    href: '#',
    label: 'Instagram',
    color: 'bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]',
    hoverColor: 'hover:opacity-90'
  }
];

const SocialLinks = () => (
  <div className="flex items-center gap-3 mt-6">
    {socialLinks.map(({ icon: Icon, href, label, color, hoverColor }) => (
      <motion.a
        key={label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        href={href}
        title={label}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center justify-center text-white ${color} ${hoverColor} rounded-full w-9 h-9 shadow-sm transition-all duration-200`}
      >
        <Icon className="w-4 h-4" />
      </motion.a>
    ))}
  </div>
);

const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  {
    name: 'Sign In',
    href: 'https://real-estate-website-admin.vercel.app/login',
    external: true
  }
];

const contactInfo = [
  {
    icon: MapPin,
    text: 'Three Leaf Green Space, Koroli, Nashik',
    href: 'https://www.google.com/maps/place/19%C2%B052\'41.8%22N+73%C2%B030\'35.6%22E/@19.878280,73.509895,19z'
  },
  {
    icon: Phone,
    text: '8600315351',
    href: 'tel:8600315351'
  },
  {
    icon: Mail,
    text: 'splrdevelopers02@gmail.com',
    href: 'mailto:splrdevelopers02@gmail.com'
  }
];

const Footer = () => {
  return (
    <footer>
      <div className="bg-black pt-12 lg:pt-16 pb-12 border-t border-gray-800 font-[Montserrat]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:w-auto">
              <div className="flex flex-col items-center lg:items-start w-full">
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="p-2 bg-[#066b70] rounded-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#066b70] to-[#066b70]"
                    style={{ fontFamily: "'Queensides', serif" }}
                  >
                    SPLR Developers
                  </span>
                </div>
                <img
                  src={credaiLogo}
                  alt="CREDAI Nashik"
                  className="h-20 object-contain mt-4"
                />
              </div>

              <div className="max-w-md text-center lg:text-left">
                <p className="text-gray-300 mt-4 leading-relaxed">
                  Your reliable companion in discovering your ideal home. We
                  streamline property searching, making it effortless,
                  efficient, and perfectly suited to your individual preferences.
                </p>
                <SocialLinks />
              </div>
            </div>

            <div className="w-full max-w-sm aspect-video rounded-md overflow-hidden shadow-lg border border-gray-700">
              <iframe
                title="SPLR Developers Video"
                src="https://www.youtube.com/embed/MAJsP2RCb08?si=AB6_V3SVJYahIa63"
                width="100%"
                height="100%"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <h3
                className="hidden lg:block text-sm font-bold tracking-wider text-white uppercase mb-4"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-3">
                {companyLinks.map(link => (
                  <li key={link.name} className="group">
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <h3
                className="hidden lg:block text-sm font-bold tracking-wider text-white uppercase mb-4"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                Contact Us
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-start text-gray-300 hover:text-[#066b70] transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.icon className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-[#066b70]" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3
                className="hidden lg:block text-sm font-bold tracking-wider text-white uppercase mb-4"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                Location
              </h3>
              <div className="w-full h-64 rounded-md overflow-hidden shadow-lg border border-gray-700">
                <iframe
                  title="Three Leaf Green Space Location"
                  src="https://www.google.com/maps?q=19.878280,73.509895&z=19&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                  allowFullScreen
                />
              </div>
              <a
                href="https://www.google.com/maps/place/19%C2%B052'41.8%22N+73%C2%B030'35.6%22E/@19.878280,73.509895,19z"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-[#066b70] hover:underline"
              >
                View on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} SPLR Developers. All Rights Reserved.
          </p>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />
    </footer>
  );
};

export default Footer;
