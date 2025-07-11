import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorFallback from "./components/ErrorFallback";
import Login from "./components/login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import AddProperty from "./pages/Add"; // ✅ new
import UploadProperty from "./pages/UploadProperty";
import EditProperty from "./pages/EditProperty"; // ⬅️ Add this
import ManageProperties from './pages/ManageProperties';

export const backendurl = import.meta.env.VITE_BACKEND_URL;

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/add-property" element={<AddProperty />} /> {/* ✅ new */}
                <Route path="/upload-property" element={<UploadProperty />} />
                <Route path="/edit-property/:id" element={<EditProperty />} />
                <Route path="/manage-properties" element={<ManageProperties />} />
              </Route>

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>

        <Toaster position="top-right" />
      </div>
    </ErrorBoundary>
  );
};

export default App;