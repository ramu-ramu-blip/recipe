import React, { useState, useContext } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaUtensils
} from "react-icons/fa";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Z][A-Za-z0-9!@#]{6,}/;

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) 
      e.name = "Name is required";
    if (!emailRegex.test(form.email)) 
      e.email = "Please enter a valid email address";
    if (!passwordRegex.test(form.password))
      e.password = "Password must start with uppercase and be at least 7 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const res = await api.post("auth/register", form);
      
      await Swal.fire({
        title: "🎉 Welcome to RecipeBook!",
        text: "Your account has been created successfully!",
        icon: "success",
        confirmButtonColor: "#e11d48",
        confirmButtonText: "Please Login now",
      });
      
      login(res.data.user, res.data.token);
      navigate("/login");
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Server error";
      setErrors({ form: errorMessage });
      
      if (errorMessage.toLowerCase().includes("already exists") || 
          errorMessage.toLowerCase().includes("email")) {
        Swal.fire({
          title: "Account Exists",
          text: "You already have an account with this email. Sign in instead?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#e11d48",
          cancelButtonColor: "#6b7280",
          confirmButtonText: "Sign In",
          cancelButtonText: "Try Again"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
        {/* Header */}
        <div className="from-rose-600 to-rose-500 p-6 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUtensils className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Join RecipeBook</h1>
          <p className="text-rose-100">Share and discover amazing recipes</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-rose-400" />
                </div>
                <input
                  className="w-full px-4 py-3 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white/80 transition-all duration-200"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

          
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-rose-400" />
                </div>
                <input
                  className="w-full px-4 py-3 pl-11 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white/80 transition-all duration-200"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

           
            <div className="space-y-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-rose-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 pl-11 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white/80 transition-all duration-200"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-rose-400 hover:text-rose-600 transition-colors"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

        
            <button
              type="submit"
              disabled={isLoading}
              className="w-full from-rose-600 to-rose-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-rose-700 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : null}
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {errors.form && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm text-center">{errors.form}</p>
              </div>
            )}
          </form>

          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Already have an account?",
                    text: "You can sign in to access your recipe collection",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonColor: "#e11d48",
                    cancelButtonColor: "#6b7280",
                    confirmButtonText: "Sign In",
                    cancelButtonText: "Continue Registration"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate("/login");
                    }
                  });
                }}
                className="text-rose-600 hover:text-rose-700 font-semibold transition-colors duration-200 hover:underline"
                disabled={isLoading}
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}