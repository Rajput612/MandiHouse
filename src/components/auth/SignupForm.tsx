import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

interface SignupFormProps {
  userType: 'buyer' | 'seller';
}

export default function SignupForm({ userType: initialUserType }: SignupFormProps) {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(initialUserType);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    otp: '',
    ...(initialUserType === 'seller' && {
      businessName: '',
      businessType: '',
      gstNumber: ''
    })
  });

  const [timer, setTimer] = useState(0);

  const handleUserTypeChange = (newType: 'buyer' | 'seller') => {
    setUserType(newType);
    navigate(`/auth/${newType}/signup`, { replace: true });
    if (newType === 'seller') {
      setFormData(prev => ({
        ...prev,
        businessName: '',
        businessType: '',
        gstNumber: ''
      }));
    }
  };

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
    // Here you would integrate with your OTP service
    console.log('Sending OTP to:', formData.phoneNumber);
    setStep('otp');
    startTimer();
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would verify the OTP
    console.log('Verifying OTP:', formData.otp);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <AuthLayout
      title={`Create a ${userType} account`}
      subtitle="Sign up with your phone number"
      userType={userType}
      showToggle={true}
      onToggleUserType={handleUserTypeChange}
    >
      <form className="space-y-6" onSubmit={step === 'phone' ? handleSendOTP : handleVerifyOTP}>
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
            <p className="mt-2 text-sm text-gray-500">
              We'll send you a one-time password to verify your number
            </p>
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
                pattern="[0-9]{6}"
                maxLength={6}
                value={formData.otp}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Enter 6-digit OTP"
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

        {userType === 'seller' && step === 'otp' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                id="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                Business Type
              </label>
              <select
                name="businessType"
                id="businessType"
                required
                value={formData.businessType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select business type</option>
                <option value="farmer">Farmer</option>
                <option value="wholesaler">Wholesaler</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>
            <div>
              <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700">
                GST Number
              </label>
              <input
                type="text"
                name="gstNumber"
                id="gstNumber"
                required
                value={formData.gstNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {step === 'phone' ? 'Send OTP' : 'Verify & Continue'}
          </button>
        </div>

        <div className="text-sm text-center">
          <span className="text-gray-600">Already have an account? </span>
          <a 
            href={`/auth/${userType}/login`}
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign in
          </a>
        </div>
      </form>
    </AuthLayout>
  );
}
