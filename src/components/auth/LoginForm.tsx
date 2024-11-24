import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  userType: 'buyer' | 'seller';
}

// Dummy credentials
const DUMMY_CREDENTIALS = {
  buyer: {
    phone: '1234567890',
    otp: '1234'
  },
  seller: {
    phone: '0987654321',
    otp: '1234'
  }
};

export default function LoginForm({ userType }: LoginFormProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: ''
  });
  const [error, setError] = useState<string>('');
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if phone number matches dummy credentials
    if (formData.phoneNumber === DUMMY_CREDENTIALS[userType].phone) {
      setStep('otp');
      startTimer();
      console.log('Sending OTP to:', formData.phoneNumber);
    } else {
      setError(`Invalid phone number. Use ${DUMMY_CREDENTIALS[userType].phone} for ${userType} login`);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if OTP matches dummy credentials
    if (formData.otp === DUMMY_CREDENTIALS[userType].otp) {
      // Login successful
      login({
        phoneNumber: formData.phoneNumber,
        userType
      });
      navigate('/');
    } else {
      setError(`Invalid OTP. Use ${DUMMY_CREDENTIALS[userType].otp} for testing`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  return (
    <AuthLayout
      title={`Welcome back, ${userType}!`}
      subtitle="Login with your phone number"
      userType={userType}
    >
      <div className="mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
        <p className="font-medium mb-1">Test Credentials:</p>
        <p>Phone: {DUMMY_CREDENTIALS[userType].phone}</p>
        <p>OTP: {DUMMY_CREDENTIALS[userType].otp}</p>
      </div>

      <form className="space-y-6" onSubmit={step === 'phone' ? handleSendOTP : handleVerifyOTP}>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                +91
              </span>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                value={formData.phoneNumber}
                onChange={handleChange}
                className="pl-12 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter 10-digit number"
              />
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="otp"
                id="otp"
                required
                pattern="[0-9]{4}"
                maxLength={4}
                value={formData.otp}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter 4-digit OTP"
              />
            </div>
            {timer > 0 ? (
              <p className="mt-2 text-sm text-gray-500">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button
                type="button"
                onClick={() => {
                  console.log('Resending OTP');
                  startTimer();
                }}
                className="mt-2 text-sm text-green-600 hover:text-green-500"
              >
                Resend OTP
              </button>
            )}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {step === 'phone' ? 'Send OTP' : 'Login'}
          </button>
        </div>

        <div className="text-sm text-center">
          <span className="text-gray-600">New to Mandiwaley? </span>
          <a 
            href={`/auth/${userType}/signup`}
            className="font-medium text-green-600 hover:text-green-500"
          >
            Create an account
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
