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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Backendurl } from '../App';

// Mobile Collapsible Footer Section
const MobileFooterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-3 lg:border-none lg:py-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left lg:hidden"
      >
        <h3 className="text-sm font-bold tracking-wider text-gray-700 uppercase">
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

// Footer Column Component
const FooterColumn = ({ title, children, className = '', delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {title && (
        <h3 className="hidden lg:block text-sm font-bold tracking-wider text-gray-700 uppercase mb-4">
          {title}
        </h3>
      )}
      {children}
    </motion.div>
  );
};

// Footer Link Component
const FooterLink = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className="flex items-center text-base text-gray-600 transition-all duration-200 hover:text-blue-600 hover:translate-x-1 py-1.5 lg:py-0"
    >
      <ChevronRight className="w-3.5 h-3.5 mr-1 text-blue-500 opacity-0 transition-all duration-200 group-hover:opacity-100" />
      {children}
    </a>
  );
};

// Social Links Component
const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter', color: 'bg-[#1DA1F2]', hoverColor: 'hover:bg-[#1DA1F2]/90' },
  { icon: Facebook, href: '#', label: 'Facebook', color: 'bg-[#1877F2]', hoverColor: 'hover:bg-[#1877F2]/90' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB]', hoverColor: 'hover:opacity-90' },
  { icon: Github, href: 'https://github.com/AAYUSH412/Real-Estate-Website', label: 'GitHub', color: 'bg-[#333]', hoverColor: 'hover:bg-gray-800' },
];

const SocialLinks = () => {
  return (
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
};

// Main Footer Component
const companyLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Sign In', href: '/signin' },
];

const contactInfo = [
  { 
    icon: MapPin, 
    text: 'Flat no 15 Shivom apt, Near Madhuel Electronics, Mahatma nagar Nashik',
    href: 'https://maps.google.com/?q=Flat+no+15+Shivom+apt,+Near+Madhuel+Electronics,+Mahatma+nagar+Nashik' 
  },
  { 
    icon: Phone, 
    text: '8600315351',
    href: 'tel:8600315351'
  },
  { 
    icon: Mail, 
    text: 'splr@gmail.com',
    href: 'mailto:splr@gmail.com' 
  },
];

const Footer = () => {
  return (
    <footer>
      {/* Main Footer */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 pt-12 lg:pt-16 pb-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Brand section - Always visible above other sections on mobile */}
          <div className="mb-10">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-700">
                SPLR Developers
              </span>
            </div>
            
            <p className="text-gray-600 mt-4 text-center lg:text-left lg:mt-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Your reliable companion in discovering your ideal home. We streamline property searching, making it effortless, efficient, and perfectly suited to your individual preferences.
            </p>
            
            <div className="flex justify-center lg:justify-start">
              <SocialLinks />
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden lg:grid grid-cols-12 gap-8">
            {/* Quick Links Column */}
            <FooterColumn title="Quick Links" className="col-span-3" delay={0.2}>
              <ul className="space-y-3">
                {companyLinks.map(link => (
                  <li key={link.name} className="group">
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            {/* Contact Info */}
            <FooterColumn title="Contact Us" className="col-span-9" delay={0.4}>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    >
                      <item.icon className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-blue-500" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </FooterColumn>
          </div>

          {/* Mobile Accordions */}
          <div className="lg:hidden space-y-4">
            <MobileFooterSection title="Quick Links">
              <ul className="space-y-2 py-2">
                {companyLinks.map(link => (
                  <li key={link.name} className="group">
                    <FooterLink href={link.href}>{link.name}</FooterLink>
                  </li>
                ))}
              </ul>
            </MobileFooterSection>

            <MobileFooterSection title="Contact Us">
              <ul className="space-y-3 py-2">
                {contactInfo.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      className="flex items-start text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    >
                      <item.icon className="w-4 h-4 mt-1 mr-3 flex-shrink-0 text-blue-500" />
                      <span className="text-sm">{item.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </MobileFooterSection>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} SPLR Developers. All Rights Reserved.
          </p>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </footer>
  );
};

export default Footer;