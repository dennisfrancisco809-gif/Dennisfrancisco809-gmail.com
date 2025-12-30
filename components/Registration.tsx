
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 animate-fadeIn">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#0084FF] rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-white text-4xl font-black">CO</span>
          </div>
          <h1 className="text-4xl font-black text-[#0084FF] mb-2 tracking-tighter">Chat On</h1>
          <p className="text-gray-400 font-medium">Sua nova forma de conectar.</p>
        </div>

        {step === AuthStep.PHONE && (
          <form onSubmit={handlePhoneSubmit} className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-center text-gray-800">Número de telefone</h2>
                <p className="text-sm text-gray-400 text-center px-4">
                  O Chat On enviará um SMS para verificar seu número.
                </p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 focus-within:border-[#0084FF] transition-all">
              <div className="text-gray-500 font-bold border-r border-gray-200 pr-3">+55</div>
              <input
                type="tel"
                placeholder="DDD + Telefone"
                className="w-full bg-transparent outline-none text-lg font-medium text-gray-700"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0084FF] text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              CONTINUAR
            </button>
          </form>
        )}

        {step === AuthStep.OTP && (
          <form onSubmit={handleOtpSubmit} className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-center text-gray-800">Verificar {phone}</h2>
                <p className="text-sm text-gray-400 text-center">
                  Insira o código de 4 dígitos (use 1234).
                </p>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                maxLength={4}
                className="w-48 bg-gray-50 border-2 border-gray-100 focus:border-[#0084FF] outline-none text-center text-4xl font-black tracking-[0.5em] py-4 rounded-2xl transition-all"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0084FF] text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              VERIFICAR
            </button>
            <button type="button" onClick={() => setStep(AuthStep.PHONE)} className="w-full text-sm text-[#0084FF] font-bold">
                Alterar número
            </button>
          </form>
        )}

        {step === AuthStep.PROFILE && (
          <form onSubmit={handleProfileSubmit} className="space-y-6 animate-fadeIn">
            <div className="space-y-2">
                <h2 className="text-xl font-bold text-center text-gray-800">Seu Perfil</h2>
                <p className="text-sm text-gray-400 text-center">
                  Como os amigos devem te chamar?
                </p>
            </div>
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-[#0084FF]/20 shadow-inner">
                    <img src={`https://picsum.photos/seed/${name || 'anon'}/300`} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#0084FF] p-2 rounded-full text-white shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd"/></svg>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 focus-within:border-[#0084FF] transition-all">
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  className="w-full bg-transparent outline-none text-lg font-medium text-gray-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0084FF] text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-blue-600 active:scale-[0.98] transition-all"
            >
              COMEÇAR AGORA
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Registration;
