import React, { useRef } from 'react';
import { useTranslation } from '../Context/TranslationContext';

const DonationPage = () => {
  const { isTamil } = useTranslation();
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const donationText = {
    /* ... */
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement secure donation processing
    alert('Thank you for your donation!');
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 bg-gray-50">
      {/* Banner section */}
      <div className="relative w-full mb-12 pt-20">
        <img
          src="/images/banner.jpg" 
          alt="Bharat Scouts & Guides Banner"
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 text-center max-w-3xl mx-auto">
            {donationText.supportText}
          </h1>
          <button
            className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 flex items-center space-x-2 text-lg"
            onClick={scrollToForm}
          >
            <span>{donationText.donateButton}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Testimonial */}
      <blockquote className="text-2xl md:text-3xl italic text-center mb-12 max-w-3xl mx-auto">
        &ldquo;The Bharat Scouts and Guides program taught me invaluable life skills and shaped me into a responsible citizen. I&apos;m proud to support their mission.&rdquo;
      </blockquote>
      <p className="text-lg text-gray-600 text-center mb-16">
        - Rajeev S., Scout Leader and Donor
      </p>

      {/* Impact section */}
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-8 mb-20 max-w-6xl w-full">
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{isTamil ? 'நமது தாக்கம்' : 'Our Impact'}</h2>
          <p className="text-lg">
            {isTamil
              ? 'பாரத் ஸ்கவுட்ஸ் மற்றும் கைட்ஸ் பல தசாப்தங்களாக இளைஞர்களின் வாழ்க்கையை மாற்றியமைத்து வருகிறது. உங்கள் தானம் இந்த முக்கிய திட்டத்தை ஒரு உறங்குமட்டத்தை அடையச் செய்யும்.'
              : 'Bharat Scouts and Guides has been transforming young lives for decades. Your donation helps sustain this critical program to reach new heights.'}  
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-green-600 text-white p-3 rounded-full mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">500,000+</h3>
            <p className="text-gray-600">{isTamil ? 'பயனாளிகள்' : 'Beneficiaries'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 text-white p-3 rounded-full mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>  
            </div>  
            <h3 className="text-xl font-bold">2,500+</h3>
            <p className="text-gray-600">{isTamil ? 'முகாம்கள்' : 'Camps Organized'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white p-3 rounded-full mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold">50,000,000+</h3>  
            <p className="text-gray-600">{isTamil ? 'நிதி திரட்டப்பட்டது' : 'Funds Raised'}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-red-600 text-white p-3 rounded-full mb-3">
              <img src="/images/partner-logo.png" alt="Partner" className="w-6 h-6" />  
            </div>
            <h3 className="text-xl font-bold">50+</h3>
            <p className="text-gray-600">{isTamil ? 'பங்குதாரர்கள்' : 'Partner NGOs'}</p>  
          </div>
        </div>
      </div>

      {/* Donation stats */}
      {/* ... */}

      {/* Donation form */}
      <div ref={formRef} className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 mb-12">
        <div className="w-full bg-white p-8 md:p-12 rounded-lg shadow-lg">
          {/* ... */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* ... */}

            {/* Add recurring donation option */}
            <div>
              <label htmlFor="recurring" className="block text-sm font-medium text-gray-700 mb-2">
                {isTamil ? 'தொடர் தானம்' : 'Recurring Donation'}  
              </label>
              <select 
                id="recurring"
                name="recurring"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="one-time">{isTamil ? 'ஒரு முறை' : 'One Time'}</option>
                <option value="monthly">{isTamil ? 'மாதந்தோறும்' : 'Monthly'}</option>
                <option value="quarterly">{isTamil ? 'காலாண்டு' : 'Quarterly'}</option>  
                <option value="annual">{isTamil ? 'வருடாந்திரம்' : 'Annually'}</option>
              </select>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-3 text-lg rounded-md shadow-lg hover:bg-green-700 transition duration-200"  
            >
              {donationText.submitButton}
            </button>
          </form>
        </div>
      </div>

      {/* Call to action section */}
      {/* ... */}
    </div>
  );
};

export default DonationPage;