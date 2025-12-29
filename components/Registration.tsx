
import React, { useState } from 'react';
import { AuthStep, User } from '../types';

interface RegistrationProps {
  onComplete: (user: User) => void;
}

const Registration: React.FC<RegistrationProps> = ({ onComplete }) => {
  const [step, setStep] = useState<AuthStep>(AuthStep.PHONE);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 8) setStep(AuthStep.OTP);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') setStep(AuthStep.PROFILE);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      phone,
      avatar: `https://picsum.photos/seed/${name}/200`
    };
    onComplete(newUser);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0084FF] mb-2 tracking-tight">Chat On</h1>
          <p className="text-gray-500">Connecting you with what matters.</p>
        </div>

        {step === AuthStep.PHONE && (
          <form onSubmit={handlePhoneSubmit} className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-center">Enter your phone number</h2>
            <p className="text-sm text-gray-400 text-center">
              Chat On will send an SMS message to verify your phone number.
            </p>
            <div className="flex space-x-2">
              <div className="border-b-2 border-[#0084FF] p-2 text-gray-600">+1</div>
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full border-b-2 border-gray-200 focus:border-[#0084FF] outline-none p-2 text-lg transition-colors"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full messenger-blue text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              NEXT
            </button>
          </form>
        )}

        {step === AuthStep.OTP && (
          <form onSubmit={handleOtpSubmit} className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-center">Verify {phone}</h2>
            <p className="text-sm text-gray-400 text-center">
              Enter the 4-digit code (use 1234 for demo).
            </p>
            <div className="flex justify-center">
              <input
                type="text"
                maxLength={4}
                className="w-32 border-b-2 border-[#0084FF] outline-none text-center text-2xl tracking-widest py-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full messenger-blue text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              VERIFY
            </button>
          </form>
        )}

        {step === AuthStep.PROFILE && (
          <form onSubmit={handleProfileSubmit} className="space-y-4 animate-fadeIn">
            <h2 className="text-xl font-semibold text-center">Profile Info</h2>
            <p className="text-sm text-gray-400 text-center">
              Please provide your name and an optional profile photo.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-[#0084FF]/20">
                <img src={`https://picsum.photos/seed/${name || 'anon'}/200`} alt="avatar" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border-b-2 border-gray-200 focus:border-[#0084FF] outline-none p-2 text-lg transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full messenger-blue text-white py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              FINISH
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Registration;
