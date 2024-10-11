import React, { useState } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { useParams } from 'react-router-dom';
import { CreditCard, Lock, Smartphone, CheckCircle } from 'lucide-react';

const DonationPayment = () => {
  const { isTamil } = useTranslation();
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    amount: '',
    paymentType: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });

  const getText = (textObj) => {
    if (!textObj) return ''; // Return empty string if textObj is undefined
    return isTamil ? (textObj.tamil || textObj.english || '') : (textObj.english || textObj.tamil || '');
  };

  const translatedText = {
    title: {
      tamil: 'பாதுகாப்பான கொடுப்பனவு',
      english: 'Secure Payment'
    },
    subTitle: {
      tamil: 'உங்கள் நன்கொடை விவரங்களை உள்ளிடவும்',
      english: 'Enter your donation details'
    },
    personalInfo: {
      tamil: 'தனிப்பட்ட தகவல்',
      english: 'Personal Information'
    },
    paymentDetails: {
      tamil: 'கட்டண விவரங்கள்',
      english: 'Payment Details'
    },
    firstName: {
      tamil: 'முதல் பெயர்',
      english: 'First Name'
    },
    lastName: {
      tamil: 'கடைசி பெயர்',
      english: 'Last Name'
    },
    email: {
      tamil: 'மின்னஞ்சல்',
      english: 'Email'
    },
    amount: {
      tamil: 'நன்கொடை தொகை (₹)',
      english: 'Donation Amount (₹)'
    },
    paymentType: {
      tamil: 'கட்டண முறை',
      english: 'Payment Method'
    },
    credit: {
      tamil: 'கிரெடிட் கார்டு',
      english: 'Credit Card'
    },
    debit: {
      tamil: 'டெபிட் கார்டு',
      english: 'Debit Card'
    },
    upi: {
      tamil: 'UPI',
      english: 'UPI'
    },
    cardNumber: {
      tamil: 'கார்டு எண்',
      english: 'Card Number'
    },
    expiryDate: {
      tamil: 'காலாவதி தேதி',
      english: 'Expiry Date'
    },
    cvv: {
      tamil: 'CVV',
      english: 'CVV'
    },
    upiId: {
      tamil: 'UPI ஐடி',
      english: 'UPI ID'
    },
    submit: {
      tamil: 'நன்கொடை செலுத்து',
      english: 'Complete Donation'
    },
    securePayment: {
      tamil: 'உங்கள் கொடுப்பனவு பாதுகாப்பானது மற்றும் மறைகுறியாக்கப்பட்டது',
      english: 'Your payment is secure and encrypted'
    },
    upiInfo: {
      tamil: 'UPI ஐடியை உள்ளிடவும் (எ.கா. yourname@upi)',
      english: 'Enter your UPI ID (e.g., yourname@upi)'
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Processing donation:', { ...formData, eventId });
    alert('Thank you for your donation!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 pt-40">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl"> {/* Reduced max-width here */}
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-800">{getText(translatedText.title)}</h1>
        <p className="text-center text-gray-600 mb-8">{getText(translatedText.subTitle)}</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{getText(translatedText.personalInfo)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  {getText(translatedText.firstName)}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  {getText(translatedText.lastName)}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {getText(translatedText.email)}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{getText(translatedText.paymentDetails)}</h2>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                {getText(translatedText.amount)}
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-1">
                {getText(translatedText.paymentType)}
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['credit', 'debit', 'upi'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentType: type }))}
                    className={`py-2 px-4 rounded-md flex items-center justify-center transition duration-150 ${
                      formData.paymentType === type
                        ? 'bg-[#F5CB5C] text-black font-semibold'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {type === 'credit' && <CreditCard className="mr-2" size={18} />}
                    {type === 'debit' && <CreditCard className="mr-2" size={18} />}
                    {type === 'upi' && <Smartphone className="mr-2" size={18} />}
                    {getText(translatedText[type])}
                  </button>
                ))}
              </div>
            </div>
            
            {(formData.paymentType === 'credit' || formData.paymentType === 'debit') && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    {getText(translatedText.cardNumber)}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                      required
                    />
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                      {getText(translatedText.expiryDate)}
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                      {getText(translatedText.cvv)}
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentType === 'upi' && (
              <div className="mt-4">
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                  {getText(translatedText.upiId)}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5CB5C] transition duration-150"
                    placeholder="yourname@upi"
                    required
                  />
                  <Smartphone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <p className="mt-1 text-sm text-gray-500">{getText(translatedText.upiInfo)}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mb-6 text-sm text-gray-600">
            <Lock size={16} className="mr-2" />
            <span>{getText(translatedText.securePayment)}</span>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#F5CB5C] text-black font-semibold py-3 px-4 rounded-md shadow-md hover:bg-[#f7d380] transition duration-200 text-lg flex items-center justify-center"
          >
            <CheckCircle size={20} className="mr-2" />
            {getText(translatedText.submit)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonationPayment;