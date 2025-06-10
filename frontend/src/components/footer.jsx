import React, { useState } from 'react';
import { 
  Home, 
  Twitter, 
  Facebook, 
  Instagram, 
  Github, 
  Mail, 
  MapPin, 
  Phone,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MobileFooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 py-3 lg:border-none lg:py-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left lg:hidden"
      >
        <h3 className="text-sm font-heading font-bold tracking-wider text-white uppercase">
          {title}
        </h3>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-3 lg:mt-0 lg:h-auto lg:opacity-100"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="flex items-center text-base text-gray-300 transition-all duration-200 hover:text-[#066b70] hover:translate-x-1 py-1.5 lg:py-0"
  >
    <ChevronRight className="w-3.5 h-3.5 mr-1 text-[#066b70] opacity-0 transition-all duration-200 group-hover:opacity-100" />
    {children}
  </a>
);

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter', color: 'bg-[#1DA1F2]', hoverColor: 'hover:bg-[#1DA1F2]/90' },
  { icon: Facebook, href: '#', label: 'Facebook', color: 'bg-[#1877F2]', hoverColor: 'hover:bg-[#1877F2]/90' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]', hoverColor: 'hover:opacity-90' },
  { icon: Github, href: 'https://github.com/mithun860/Real-Estate-Website', label: 'GitHub', color: 'bg-[#333]', hoverColor: 'hover:bg-gray-800' },
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
  { name: 'Sign In', href: './signin' },
];

const contactInfo = [
  { 
    icon: MapPin, 
    text: 'Flat no 15 Shivom apt, Near Madhu Electronics, Mahatma nagar Nashik',
    href: 'https://maps.google.com/?q=Flat+no+15+Shivom+apt,+Near+Madhuel+Electronics,+Mahatma+nagar+Nashik' 
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
  },
];

const Footer = () => {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-black pt-12 lg:pt-16 pb-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white font-body">
          {/* Brand + Video side-by-side */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
            {/* Brand & Tagline */}
            <div className="max-w-md text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <div className="p-2 bg-[#066b70] rounded-lg">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#066b70] to-[#066b70]">
                  SPLR Developers
                </span>
              </div>
              
              <p className="text-gray-300 mt-4 leading-relaxed">
                Your reliable companion in discovering your ideal home. We streamline property searching, making it effortless, efficient, and perfectly suited to your individual preferences.
              </p>
              
              <SocialLinks />
            </div>

            {/* YouTube video */}
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

          {/* Footer links and contact info below */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <h3 className="hidden lg:block text-sm font-heading font-bold tracking-wider text-white uppercase mb-4">
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
              <h3 className="hidden lg:block text-sm font-heading font-bold tracking-wider text-white uppercase mb-4">
                Contact Us
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="flex items-start text-gray-300 hover:text-[#066b70] transition-colors duration-200"
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    >
                      <item.icon className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-[#066b70]" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h3 className="hidden lg:block text-sm font-heading font-bold tracking-wider text-white uppercase mb-4">
                Location
              </h3>
              <div className="w-full h-48 rounded-md overflow-hidden shadow-lg border border-gray-700">
                <iframe
                  title="Three Leaf Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.190800301357!2d73.77914841490606!3d20.00287808579127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb08bc13e3ff%3A0x4e4e4f4d7a441390!2sFlat%20No.%2015%20Shivom%20Apt%2C%20Near%20Madhuel%20Electronics%2C%20Mahatma%20Nagar%2C%20Nashik%2C%20Maharashtra%20422003!5e0!3m2!1sen!2sin!4v1683380318345!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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