import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemCheck, setSystemCheck] = useState(null);
  const navigate = useNavigate();

  // Check system status on component mount
  useEffect(() => {
    const checkSystem = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/admin/verify-credentials`);
        setSystemCheck(response.data);
        console.log("System check:", response.data);
      } catch (error) {
        console.error("System check failed:", error);
        setSystemCheck({ error: "Unable to verify system status" });
      }
    };
    checkSystem();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log("Login attempt with:", { email, password });

    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAdmin', 'true');
        
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        console.error("Login failed:", response.data);
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error('Detailed login error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      
      toast.error(
        error.response?.data?.message || 
        error.message || 
        'Login failed. Please check console for details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Admin Portal Login
            </h1>
            
            {systemCheck && (
              <div className="p-3 bg-gray-100 rounded-md text-sm">
                <p>System check: {systemCheck.error || "OK"}</p>
                {!systemCheck.error && (
                  <>
                    <p>Admin exists: {systemCheck.adminExists ? "Yes" : "No"}</p>
                    <p>Password matches: {systemCheck.passwordMatch ? "Yes" : "No"}</p>
                  </>
                )}
              </div>
            )}

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                  Admin Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;