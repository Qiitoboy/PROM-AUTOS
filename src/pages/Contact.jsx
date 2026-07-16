import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheck } from "react-icons/fa";

const Contact = ({ onSubmitLead, vehicles = [], parts = [] }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    // Call state handler in App.jsx
    onSubmitLead({
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      vehicleInterest: formData.interest,
      date: new Date().toISOString().split('T')[0],
      status: "New"
    });

    setSubmitted(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      interest: "",
      message: ""
    });

    // Auto dismiss success alert after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-[#0B0C10] min-h-screen pb-16">
      {/* Page Header */}
      <PageHeader
        title="Contact Our Team"
        breadcrumbs={["Contact Us"]}
        backgroundImage="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Contact Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[#BF1E2E] font-black text-xs uppercase tracking-wider">Connect With Us</span>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-1">Get In Touch</h2>
            <p className="text-gray-400 text-xs mt-3 leading-relaxed">
              Have questions about vehicle allocation, finance options, or performance parts compatibility? Reach out to our advisors for customized assistance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {/* Phone Card */}
            <div className="bg-[#171923] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-[#BF1E2E]/10 border border-[#BF1E2E]/20 text-[#BF1E2E] p-3.5 rounded-lg shrink-0">
                <FaPhoneAlt className="text-sm" />
              </span>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Phone Support</h4>
                <p className="text-gray-400 text-xs mt-1">+1 (555) 019-9900</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Toll-free | Mon - Sat</p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/233545526710" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#171923] border border-gray-800 hover:border-green-600/40 rounded-xl p-5 flex items-start gap-4 transition-all"
            >
              <span className="bg-green-600/10 border border-green-500/20 text-green-500 p-3.5 rounded-lg shrink-0">
                <FaWhatsapp className="text-sm" />
              </span>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">WhatsApp Advisor</h4>
                <p className="text-gray-400 text-xs mt-1">+1 (555) 019-9900</p>
                <p className="text-green-500 text-[10px] mt-0.5 font-bold">Online Now</p>
              </div>
            </a>

            {/* Email Card */}
            <div className="bg-[#171923] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-blue-600/10 border border-blue-500/20 text-blue-500 p-3.5 rounded-lg shrink-0">
                <FaEnvelope className="text-sm" />
              </span>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Inquiries</h4>
                <p className="text-gray-400 text-xs mt-1">sales@promautos.com</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Response within 24 hours</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-[#171923] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-purple-600/10 border border-purple-500/20 text-purple-500 p-3.5 rounded-lg shrink-0">
                <FaMapMarkerAlt className="text-sm" />
              </span>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Showroom Location</h4>
                <p className="text-gray-400 text-xs mt-1">450 Performance Drive, Suite 100</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Silicon Valley, CA 94025</p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-[#171923] border border-gray-800 rounded-xl p-5 flex items-start gap-4">
              <span className="bg-amber-600/10 border border-amber-500/20 text-amber-500 p-3.5 rounded-lg shrink-0">
                <FaClock className="text-sm" />
              </span>
              <div>
                <h4 className="text-white font-extrabold text-xs uppercase tracking-wider">Working Hours</h4>
                <p className="text-gray-400 text-xs mt-1">Mon - Sat: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-500 text-[10px] mt-0.5">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7 bg-[#171923] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
          <h3 className="text-lg font-extrabold uppercase tracking-tight text-white mb-6">
            Send Message / Request Allocation
          </h3>

          {submitted && (
            <div className="bg-green-950 border border-green-900 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3 animate-fade-in">
              <span className="bg-green-900 text-green-400 p-1.5 rounded-full shrink-0">
                <FaCheck className="text-xs" />
              </span>
              <div>
                <h4 className="font-bold text-xs">Submission Successful!</h4>
                <p className="text-[10px] text-green-500 mt-0.5">Your inquiry was logged. Our sales team will follow up, and it is now viewable in the Command Center leads tab.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lewis"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-[#0F111A] border border-gray-800 text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#BF1E2E] transition-all"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Last Name</label>
                <input
                  type="text"
                  placeholder="e.g. Hamilton"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-[#0F111A] border border-gray-800 text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#BF1E2E] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. l.hamilton@mercedes.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0F111A] border border-gray-800 text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#BF1E2E] transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 019-4433"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#0F111A] border border-gray-800 text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#BF1E2E] transition-all"
                />
              </div>
            </div>

            {/* Interest */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Item / Vehicle of Interest</label>
              <select
                value={formData.interest}
                onChange={(e) => setFormData({...formData, interest: e.target.value})}
                className="w-full bg-[#0F111A] border border-gray-800 text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#BF1E2E] cursor-pointer"
              >
                <option value="">General Inquiry / Custom Request</option>
                <optgroup label="Vehicles">
                  {vehicles.map(v => (
                    <option key={v.id} value={v.name}>{v.name} ({v.condition})</option>
                  ))}
                </optgroup>
                <optgroup label="Performance Parts">
                  {parts.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-gray-400 block">Message Details *</label>
              <textarea
                required
                rows={5}
                placeholder="Details of your request..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-[#0F111A] border border-gray-800 text-white rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-[#BF1E2E] transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#BF1E2E] hover:bg-red-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-lg transition-all shadow-md cursor-pointer"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
