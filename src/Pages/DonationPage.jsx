import React, { useRef } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { Users, HandHeart, IndianRupee, Copy } from 'lucide-react';

const DonationPage = () => {
  const { isTamil } = useTranslation();
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const donationText = {
    banner: {
      tamil: 'இன்றே கொடுங்கள் - பாரத சாரணர் & சாரணியரை ஆதரியுங்கள்!',
      english: 'Give Today - Support Bharat Scouts & Guides!'
    },
    statsTitle: {
      tamil: 'நன்கொடை புள்ளிவிவரங்கள்',
      english: 'Donation Statistics'
    },
    statsLabels: {
      donors: {
        tamil: 'நன்கொடையாளர்கள்',
        english: 'Donors'
      },
      volunteers: {
        tamil: 'தன்னார்வலர்கள்',
        english: 'Volunteers'
      },
      funds: {
        tamil: 'திரட்டிய நிதி',
        english: 'Raised Funds'
      }
    },
    buttons: {
      donateNow: {
        tamil: 'நன்கொடை அளி',
        english: 'Donate Now'
      },
      seeDetails: {
        tamil: 'விவரங்கள்',
        english: 'See Details'
      }
    },
    description: {
      tamil: 'பாரத சாரணர் மற்றும் சாரணியர் இந்தியாவின் எதிர்கால தலைவர்களை உருவாக்குவதில் முக்கிய பங்கு வகிக்கிறது. நாங்கள் இளைஞர்களுக்கு தலைமைத்துவம், சமூக சேவை மற்றும் வாழ்க்கைத் திறன்கள் பயிற்சிகளை வழங்குகிறோம்.',
      english: 'Bharat Scouts and Guides play a crucial role in shaping the future leaders of India. We provide youth with training in leadership, community service, and life skills.'
    },
    contact: {
      address: 'Bharat Scouts & Guides HQ, Lakshmi Mazumdar Bhawan, 16, M. G. Marg, New Delhi-110002',
      phone: '+91-11-2337-0724',
      email: 'info@bsgindia.org'
    },
    // New translations
    donateHere: {
      tamil: 'இங்கே நன்கொடை அளியுங்கள்',
      english: 'Donate Here'
    },
    donateDescription: {
      tamil: 'வெனியாம் குவே. எங்கள் செயல்பாட்டை மறுக்கும் குறைவான விஷயங்கள் அல்லது எதையும் நேக்குஎ.',
      english: 'Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque.'
    },
    scanQRCode: {
      tamil: 'இந்த QR குறியீட்டை ஸ்கேன் செய்யவும்<br />நன்கொடை அளிக்க <span class="text-red-500 font-semibold">வெல்ஃபேர்</span>',
      english: 'Scan this QR code<br />to Donate <span class="text-red-500 font-semibold">WALFARE</span>'
    },
    bankDetails: {
      tamil: 'வங்கி விவரங்கள்',
      english: 'Bank Details'
    },
    bankDescription: {
      tamil: 'தலைப்புகள், பத்திகள், பிளாக்கோட்ஸ் படங்கள் மற்றும் வீடியோக்களை ஒரே இடத்தில் உருவாக்கி வடிவமைக்கவும்',
      english: 'Create and format headings, paragraphs, blockquotes images and video all in one place instead'
    },
    accountNumber: {
      tamil: 'கணக்கு எண்',
      english: 'Account Number'
    },
    beneficiaryName: {
      tamil: 'பயனாளியின் பெயர்',
      english: 'Beneficiary Name'
    },
    ifscCode: {
      tamil: 'IFSC குறியீடு',
      english: 'IFSC Code'
    },
    copyAccountDetails: {
      tamil: 'கணக்கு விவரங்களை நகலெடுக்கவும்',
      english: 'COPY ACCOUNT DETAILS'
    },
    acceptedPaymentMethods: {
      tamil: 'ஏற்றுக்கொள்ளப்பட்ட கட்டண முறைகள்',
      english: 'Accepted Payment Methods'
    }
  };

  const events = [
    {
      id: 1,
      image: "/Images/stories1.png",
      name: {
        tamil: "வருடாந்திர சாரணர் சந்திப்பு 2023",
        english: "Annual Scouts Meet 2023"
      },
      target: 320000,
      raised: 200000
    },
    {
      id: 2,
      image: "/Images/stories2.png",
      name: {
        tamil: "சாரணர் தலைமைத்துவ முகாம்",
        english: "Scouts Leadership Camp"
      },
      target: 250000,
      raised: 15000
    },
    {
      id: 3,
      image: "/Images/stories3.png",
      name: {
        tamil: "சுற்றுச்சூழலுக்கான சாரணர்கள்",
        english: "Scouts for Environment"
      },
      target: 500000,
      raised: 30000
    }
  ];

  const stats = [
    { icon: Users, label: donationText.statsLabels.donors, value: '14,670' },
    { icon: HandHeart, label: donationText.statsLabels.volunteers, value: '35,608' },
    { icon: IndianRupee, label: donationText.statsLabels.funds, value: '2,45,150' }
  ];

  const getText = (textObj) => isTamil ? textObj.tamil : textObj.english;

  const copyAccountDetails = () => {
    const details = `Account Number: 2223330000456987\nBeneficiary Name: Walfare Organization\nIFSC Code: WRDSBIOBNKPIS`;
    navigator.clipboard.writeText(details).then(() => {
      alert('Account details copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white pt-20 md:pt-32">
      {/* Hero Image */}
      <div className="relative w-full h-48 md:h-96 mb-4 md:mb-8">
        <img 
          src="/Images/ScoutMarch2.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Banner */}
      <div className="relative w-full mb-6 md:mb-8 px-4">
        <div className="p-4 md:p-6 bg-black bg-opacity-50 text-white rounded-lg">
          <h1 className="text-lg md:text-xl font-semibold mb-2">{getText(donationText.banner)}</h1>
          <button 
            className="bg-[#F5CB5C] text-black font-semibold py-2 px-4 md:px-6 rounded-full shadow-md hover:bg-[#f7d380] transition duration-200 text-sm md:text-base"
            onClick={scrollToForm}
          >
            {getText(donationText.buttons.donateNow)}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full mb-8 md:mb-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
          {getText(donationText.statsTitle)}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 md:p-6 transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="flex items-center justify-center mb-3 md:mb-4">
                <stat.icon size={32} className="text-[#F5CB5C]" />
              </div>
              <p className="text-2xl md:text-4xl font-bold text-center mb-1 md:mb-2">{stat.value}</p>
              <p className="text-gray-600 text-center text-sm md:text-base">
                {getText(stat.label)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-[#F4F4F4] p-4 md:p-6 rounded-xl text-gray-700 mb-6 md:mb-8 w-full text-center text-sm md:text-base px-4">
        <p className="mb-1">{donationText.contact.address}</p>
        <p>{donationText.contact.phone} | {donationText.contact.email}</p>
      </div>

      {/* Description with Image */}
      <div className="flex flex-col items-center mb-6 md:mb-8 w-full px-4">
        <div className="w-full md:w-1/2 mb-4">
          <img 
            src="/Images/ScoutMarch.png"
            alt="Scouts Education"
            className="w-full h-auto rounded-xl object-contain"
          />
        </div>
        <p className="text-gray-700 text-center text-sm md:text-base max-w-2xl">
          {getText(donationText.description)}
        </p>
      </div>
      
      {/* Donation Events */}
      <div ref={formRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 px-4 w-full">
        {events.map(event => (
          <div key={event.id} className="bg-white shadow-lg rounded-xl overflow-hidden">
            <img 
              src={event.image}
              alt={getText(event.name)}
              className="w-full h-48 md:h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg md:text-xl font-semibold mb-2 h-12 md:h-14 flex items-center">
                {getText(event.name)}
              </h3>
              <div className="flex items-center space-x-2 md:space-x-4 mb-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-[#F5CB5C] h-2.5 rounded-full" 
                    style={{ width: `${(event.raised / event.target) * 100}%` }}
                  ></div>
                </div>
                <p className="text-gray-700 text-xs md:text-sm whitespace-nowrap">
                  ₹{event.raised.toLocaleString()}/₹{event.target.toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <button 
                  className="bg-[#F5CB5C] text-black font-semibold py-2 md:py-3 px-3 md:px-5 rounded-full shadow-md hover:bg-[#f7d380] transition duration-200 text-xs md:text-sm"
                  onClick={scrollToForm}
                >
                  {getText(donationText.buttons.donateNow)}
                </button>
                <button className="bg-gray-200 text-gray-700 font-semibold py-2 md:py-3 px-3 md:px-5 rounded-full shadow-md hover:bg-gray-300 transition duration-200 text-xs md:text-sm">
                  {getText(donationText.buttons.seeDetails)}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Donation and Bank Details Section */}
      <div className="w-full bg-gray-100 p-6 md:p-8 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donate Here Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Donate Here</h2>
            <p className="text-gray-600 mb-4">Veniam quae. Nostrum facere repellendus minus quod aut aliquam neque.</p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <img 
                src="/Images/qrimage.png" 
                alt="QR Code" 
                className="w-32 h-32 mx-auto mb-2"
              />
              <p className="text-center text-sm">
                Scan this QR code<br />to Donate <span className="text-red-500 font-semibold">WALFARE</span>
              </p>
            </div>
          </div>

        {/* Bank Details Section */}
    <div>
      <h2 className="text-2xl font-bold mb-4">{getText(donationText.bankDetails)}</h2>
      <p className="text-gray-600 mb-4">{getText(donationText.bankDescription)}</p>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-2">
          <p className="font-semibold">{getText(donationText.accountNumber)}</p>
          <p>2223330000456987</p>
        </div>
        <div className="mb-2">
          <p className="font-semibold">{getText(donationText.beneficiaryName)}</p>
          <p>Walfare Organization</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">{getText(donationText.ifscCode)}</p>
          <p>WRDSBIOBNKPIS</p>
        </div>
        <button 
          onClick={copyAccountDetails}
          className="flex items-center justify-center w-full bg-[#F5CB5C] text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#f7d380] transition duration-200"
        >
          <Copy size={18} className="mr-2" />
          {getText(donationText.copyAccountDetails)}
        </button>
      </div>
    </div>
  </div>
</div>
<div className="w-full mb-8">
  <h3 className="text-xl font-semibold mb-4 text-center">{getText(donationText.acceptedPaymentMethods)}</h3>
  <div className="flex justify-center space-x-4">
    <img src="/Images/VisaLogo.png" alt="Visa" className="h-8" />
    <img src="/Images/mastercardlogo.png" alt="Mastercard" className="h-8" />
    <img src="/Images/paypallogo.png" alt="PayPal" className="h-8" />
    <img src="/Images/amazonpay.png" alt="Amazon Pay" className="h-8" />
  </div>
</div>
    </div>
  );
};

export default DonationPage;