import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaPinterest,
  FaHeart,
  FaUtensils,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" from-orange-400 to-amber-600 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
       
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-2 mr-3 shadow-lg">
                <FaUtensils className="text-orange-500 text-xl" />
              </div>
              <h2 className="text-2xl font-bold from-white to-amber-100 bg-clip-text text-transparent">
                RecipeApp
              </h2>
            </div>
            <p className="text-amber-100 text-sm leading-relaxed mb-4">
              Discover, cook, and share amazing recipes from around the world. 
              Your ultimate kitchen companion for culinary adventures.
            </p>
            <div className="flex items-center text-amber-100 text-sm">
              <FaHeart className="text-red-400 mr-1" />
              <span>Made with passion for food lovers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-orange-300 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/", label: "Home" },
                { path: "/recipes", label: "Browse Recipes" },
                { path: "/favourite", label: "Favourites" },
                { path: "/categories", label: "Categories" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="hover:text-amber-200 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-amber-200 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-orange-300 inline-block">
              Contact Info
            </h3>
            <div className="space-y-3 text-amber-100">
              <div className="flex items-center hover:text-white transition-colors">
                <FaMapMarkerAlt className="mr-3 text-orange-300" />
                <span className="text-sm">Andhra Pradesh</span>
              </div>
              <div className="flex items-center hover:text-white transition-colors">
                <FaPhone className="mr-3 text-orange-300" />
                <span className="text-sm">+91 (123) 123-4567</span>
              </div>
              <div className="flex items-center hover:text-white transition-colors">
                <FaEnvelope className="mr-3 text-orange-300" />
                <span className="text-sm">hello@recipeapp.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-orange-300 inline-block">
              Follow Us
            </h3>
            <p className="text-amber-100 text-sm mb-4">
              Join our community of food enthusiasts
            </p>
            <div className="flex space-x-3">
              {[
                { icon: FaFacebookF, url: "https://facebook.com", color: "hover:bg-blue-600" },
                { icon: FaInstagram, url: "https://instagram.com", color: "hover:bg-pink-600" },
                { icon: FaTwitter, url: "https://twitter.com", color: "hover:bg-blue-400" },
                { icon: FaYoutube, url: "https://youtube.com", color: "hover:bg-red-600" },
                { icon: FaPinterest, url: "https://pinterest.com", color: "hover:bg-red-500" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    bg-orange-500 hover:bg-white text-white hover:text-orange-500 
                    rounded-full p-3 transition-all duration-300 transform hover:scale-110 
                    shadow-lg hover:shadow-xl ${social.color}
                  `}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

         
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-amber-100">Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-800"
                />
                <button className="bg-orange-500 hover:bg-orange-400 px-4 py-2 rounded-r-lg text-sm font-semibold transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

       
        <div className="border-t border-orange-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-amber-100 text-sm mb-4 md:mb-0">
            © 2025 RecipeApp. All rights reserved. | Made with <FaHeart className="inline text-red-400 mx-1" /> for food lovers
          </div>
          <div className="flex space-x-6 text-sm text-amber-100">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="/cookies" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;