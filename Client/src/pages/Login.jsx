import React, { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaUtensils
} from "react-icons/fa";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);

      Swal.fire({
        title: "Welcome Back! 🎉",
        text: `Great to see you again, ${res.data.user.name || "Chef"}!`,
        icon: "success",
        confirmButtonColor: "#e11d48",
      }).then(() => {
        login(res.data.user, res.data.token);
        navigate("/home");
      });
    } catch (err) {
      const message = err.response?.data?.message || "Invalid credentials";

      if (message.toLowerCase().includes("not found") || message.toLowerCase().includes("no account")) {
        Swal.fire({
          title: "Account Not Found",
          text: "No account found with this email. Would you like to create one?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#e11d48",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Sign Up",
          cancelButtonText: "Try Again"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register");
          }
        });
      } else {
        Swal.fire({
          title: "Login Failed",
          text: message,
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex">   
      <div className="flex-1 flex items-center justify-center p-8 from-rose-50 to-pink-100">
        <div className=" max-w-md w-full">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-rose-600 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaUtensils className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">RecipeBook</h1>
            <p className="text-gray-600 ">Sign in to your account</p>
          </div>

         
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-rose-100">
            <form onSubmit={handleSubmit} className="space-y-6">
             
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5  text-rose-500" />
                  </div>
                  <input
                    className="w-full px-4 py-4 pl-12  pr-4 border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
              </div>

             
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-rose-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-4 pl-12 pr-12 border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 bg-white transition-all duration-200 placeholder-gray-400"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute bg-gradient-to-r inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-rose-600 transition-colors"
                    onClick={togglePasswordVisibility}
                    disabled={isLoading}
                  >
                    {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

            
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-rose-600 to-rose-500 text-white py-4 px-4 rounded-xl font-bold hover:from-rose-700 hover:to-rose-600 focus:outline-none focus:ring-4 focus:ring-rose-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaUtensils className="w-5 h-5" />
                )}
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

           
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-rose-600 hover:text-rose-700 font-bold transition-colors duration-200 hover:underline"
                  disabled={isLoading}
                >
                  Sign up here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div 
        className="hidden lg:flex flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        }}
      >
        <div className="w-full h-full flex items-center justify-center p-12">
          <div className="text-white text-center">
            <FaUtensils className="text-6xl mb-6 mx-auto opacity-90" />
            <h2 className="text-5xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl opacity-90">Continue your culinary journey with us</p>
          </div>
        </div>
      </div>
    </div>
  );
}