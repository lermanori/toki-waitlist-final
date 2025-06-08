import React, { useState } from 'react';
import axios from 'axios';

const countries = [
  { code: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' }
];

export default function WaitlistForm() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      country: selectedCountry.name,
      email,
      phone,
      location,
      reason,
    };
    try {
      const response = await axios.post('https://example.com/api/submit', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-200 px-4 py-10">
      <div className="w-full max-w-xl sm:max-w-6xl text-center space-y-8">
        <div>
          <h1 className="text-6xl sm:text-8xl font-bold text-black">Feeling social right now?</h1>
          <p className="text-3xl sm:text-6xl font-extralight italic text-black mt-2 sm:mt-8">
            You're not the only one.<br className="sm:hidden block" />
            Join the mood map.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-4 gap-4 text-left sm:p-10 ">
          <div className="sm:col-span-2 ">
            <textarea
              placeholder="Think you belong to Toki? Tell us why (optional)"
              className="hidden sm:block w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black resize-none sm:h-14 sm:placeholder:text-xl bg-gray-100"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          {/* Email */}
          <input
            type="email"
            placeholder="Your email"
            className="w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black sm:placeholder:text-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Phone Input */}
          <div className="flex items-center">
            <select
              value={selectedCountry.code}
              onChange={(e) => setSelectedCountry(countries.find(country => country.code === e.target.value))}
              className="w-1/3 rounded-md px-4 py-3 border border-gray-300 bg-white"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="508740985"
              className="w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            className="w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black sm:placeholder:text-xl"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Textarea - above the button on all screen sizes */}
          <div className="sm:col-span-2 sm:hidden">
            <textarea
              placeholder="Think you belong to Toki? Tell us why (optional)"
              className="block sm:hidden w-full rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Button */}
          <div className="sm:col-start-2 sm:col-span-1">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-xl rounded-md font-semibold hover:bg-gray-900 transition"
            >
              Join The Waitlist
            </button>
          </div>

          {/* Subtext */}
          <p className="text-md italic text-gray-700 text-center sm:col-span-2 mt-2">
            * We're currently in private beta. If you're invited by someone from the community, let us know.
          </p>
        </form>
      </div>
    </div>
  );
}
