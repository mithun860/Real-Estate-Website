import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Home,
  Users,
  MessageCircle,
  Building,
  Link as LinkIcon,
} from "lucide-react";
import logo from "../assets/splr-logo.png";
import { useAuth } from "../context/AuthContext";
import PropTypes from "prop-types";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const getInitials = (name) =>
    name ? name.split(" ").map((w) => w[0]).join("").toUpperCase() : "U";

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About Us", path: "/about", icon: Users },
    { name: "Contact", path: "/contact", icon: MessageCircle },
    { name: "Properties", path: "/properties", icon: Building },
    { name: "More Details", path: "/more-details", icon: LinkIcon },
  ];

  const NavLinks = ({ currentPath }) => (
    <div className="flex space-x-6 items-center">
      {navLinks.map(({ name, path, icon: Icon }) => {
        const isActive =
          path === "/" ? currentPath === path : currentPath.startsWith(path);
        return (
          <Link
            key={name}
            to={path}
            className={`relative font-medium transition-colors duration-200 flex items-center gap-1.5 px-2 py-1 rounded-md ${
              isActive
                ? "text-[#066b70] bg-[#e3b07b]/10"
                : "text-gray-700 hover:text-[#066b70] hover:bg-[#e3b07b]/10"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{name}</span>
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#066b70] rounded-full"
                initial={false}
              />
            )}
          </Link>
        );
      })}
    </div>
  );

  const MobileNavLinks = ({
    setMobileMenuOpen,
    isLoggedIn,
    user,
    handleLogout,
    currentPath,
  }) => (
    <div className="flex flex-col space-y-1 pb-3">
      {navLinks.map(({ name, path, icon: Icon }) => {
        const isActive =
          path === "/" ? currentPath === path : currentPath.startsWith(path);
        return (
          <motion.div key={name} whileTap={{ scale: 0.97 }}>
            <Link
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#e3b07b]/10 text-[#066b70] font-medium"
                  : "text-gray-700 hover:bg-gray-50 hover:text-[#066b70]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          </motion.div>
        );
      })}
      {isLoggedIn && (
        <div className="pt-4 mt-2 border-t border-gray-100 space-y-3 px-3">
          <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#066b70] to-[#e3b07b] flex items-center justify-center text-white font-medium text-sm shadow-sm">
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              handleLogout();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign out</span>
          </motion.button>
        </div>
      )}
    </div>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-md backdrop-blur-md"
          : "bg-transparent shadow-none"
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-32 px-4 sm:px-6 lg:px-8">
          {/* ✅ Static Logo (No Animation) */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="SPLR logo"
              className="w-32 h-32 object-contain"
            />
          </Link>

          <div className="flex-1 flex items-center justify-end gap-6">
            <div className="hidden md:flex items-center gap-6 mr-8">
              <NavLinks currentPath={location.pathname} />
            </div>

            <div className="flex items-center gap-4">
              {isLoggedIn && (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={toggleDropdown}
                    className="flex items-center space-x-3 focus:outline-none"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#066b70] to-[#e3b07b] flex items-center justify-center text-white font-medium text-sm shadow-md hover:shadow-lg transition-shadow">
                        {getInitials(user?.name)}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 border border-gray-100 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p
                            className="text-sm font-semibold text-gray-900"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {user?.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center space-x-2 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMobileMenu}
                className="md:hidden rounded-lg p-2 hover:bg-gray-100 transition-colors focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-100/20 overflow-hidden"
          >
            <div className="px-2 pt-3 pb-4">
              <MobileNavLinks
                setMobileMenuOpen={setIsMobileMenuOpen}
                isLoggedIn={isLoggedIn}
                user={user}
                handleLogout={handleLogout}
                currentPath={location.pathname}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

Navbar.propTypes = {
  currentPath: PropTypes.string,
  setMobileMenuOpen: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  handleLogout: PropTypes.func,
};

export default Navbar;