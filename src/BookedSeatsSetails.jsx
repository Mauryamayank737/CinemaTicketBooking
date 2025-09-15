import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BookedSeatsDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedSeats = [], totalPrice = 0, currency = "₹", title } = state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (e.g., send data to a server)
    console.log("Booking confirmed:", {
      ...formData,
      seats: selectedSeats,
      totalPrice,
      currency,
      title
    });
    // Navigate back to the home page with a confirmation message
    navigate("/", { state: { message: "Booking confirmed successfully!" } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Booking Details
          </h1>
          <p className="text-center mt-2 opacity-90">Complete your reservation</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking Summary */}
          <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Booking Summary
            </h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Movie:</span>
                <span className="font-medium text-gray-800">{title}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Selected Seats:</span>
                <span className="font-medium text-gray-800">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
              
              <div className="flex justify-between pt-2 border-t border-blue-100">
                <span className="text-gray-600">Total Price:</span>
                <span className="text-lg font-bold text-blue-700">
                  {currency} {totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* User Details Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Your Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Confirm Booking
              </button>
              
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Back to Selection
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookedSeatsDetails;