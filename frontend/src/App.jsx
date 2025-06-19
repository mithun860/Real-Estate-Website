import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

import Navbar from './components/Navbar';
import Footer from './components/footer';

import Home from './pages/Home';
import Aboutus from './pages/About';
import Contact from './pages/Contact';
import Properties from './pages/Properties';

import Login from './components/login';
import SignIn from './pages/signin';
import ForgotPassword from './components/forgetpassword';
import ResetPassword from './components/resetpassword';
import NotFoundPage from './components/Notfound';
import StructuredData from './components/SEO/StructuredData';
import { AuthProvider } from './context/AuthContext';

import 'react-toastify/dist/ReactToastify.css';

export const Backendurl = import.meta.env.VITE_API_BASE_URL;

// 🧠 A wrapper to access location inside JSX
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths = ['/login', '/signin', '/forgot-password', '/reset'];

  const shouldHideLayout = hideLayoutPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Show Navbar only if not on login-related pages */}
      {!shouldHideLayout && <Navbar />}

      {children}

      {/* Show Footer only if not on login-related pages */}
      {!shouldHideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <StructuredData type="website" />
          <StructuredData type="organization" />
          
          <LayoutWrapper>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset/:token" element={<ResetPassword />} />
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </LayoutWrapper>

          <ToastContainer />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;