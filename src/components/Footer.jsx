import React from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa'; // React Icons

const Footer = () => {
  const { isTamil } = useTranslation();

  const translations = {
    title: {
      en: "Bharath Scouts And Guides",
      ta: "பாரத் சாரணர்கள் மற்றும் வழிகாட்டிகள்"
    },
    description: {
      en: "Scouting is the world's leading educational youth Movement empowering 57 million young people and volunteers to be active global citizens and agents of change in their communities.",
      ta: "சாரணியம் உலகின் முன்னணி கல்வி இளைஞர் இயக்கமாகும், 57 மில்லியன் இளைஞர்கள் மற்றும் தன்னார்வலர்களை உலகளாவிய குடிமக்களாகவும், தங்கள் சமூகங்களில் மாற்றத்தின் முகவர்களாகவும் அதிகாரம் அளிக்கிறது."
    },
    links: {
      en: ["Complaints", "Careers", "Children online protection", "Privacy", "Help", "About", "Contacts", "Get Newsletter", "Shopping", "Cookies Policy", "Status", "Donation"],
      ta: ["புகார்கள்", "வேலைவாய்ப்புகள்", "குழந்தைகள் ஆன்லைன் பாதுகாப்பு", "தனியுரிமை", "உதவி", "பற்றி", "தொடர்புகள்", "செய்திமடல் பெறுக", "கடைபிடித்தல்", "குக்கீகள் கொள்கை", "நிலை", "நன்கொடை"]
    },
    copyright: {
      en: "Copyright © K Labs Technology & Solutions Pvt. Ltd 2024",
      ta: "பதிப்புரிமை © கே லேப்ஸ் டெக்னாலஜி & சொல்யூஷன்ஸ் பிரைவேட் லிமிடெட் 2024"
    }
  };

  return (
    <footer className="bg-[#0A1F44] text-white p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/Images/tn-logo.png" alt="Bharath Scouts And Guides" className="w-30 h-20 mr-4" />
              <h2 className="text-2xl font-bold">{isTamil ? translations.title.ta : translations.title.en}</h2>
            </div>
            <p className="text-sm max-w-md">
              {isTamil ? translations.description.ta : translations.description.en}
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-wrap md:flex-nowrap space-x-4 mt-6 md:mt-0 md:ml-2 justify-start md:justify-between">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(isTamil ? translations.links.ta : translations.links.en).map((link, index) => (
                <a key={index} href="#" className="text-sm hover:underline">{link}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-wrap justify-between items-center">
          <p className="text-sm">{isTamil ? translations.copyright.ta : translations.copyright.en}</p>
          
          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-gray-300">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaYoutube className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaInstagram className="w-6 h-6" />
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              <FaFacebook className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
