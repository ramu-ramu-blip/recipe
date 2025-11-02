import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Store  in localStorage
    localStorage.setItem("contactFormData", JSON.stringify(formData));
    console.log(formData);
    

    alert("Your message saved locallystorage");

    
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center text-amber-500 mb-6">
        Contact Us
      </h2>
      <form
        className="bg-white shadow rounded-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ram@example.com"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            className="w-full border p-2 rounded h-24"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
