import React from 'react';
import { Globe, Users, Trophy } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import NavigationMenu from '../components/NavigationMenu';

export default function WhoWeAre() {
  const { isTamil } = useTranslation();

  return (
    <div className="relative w-full">
      {/* Hero Image Section */}
      <div className="relative w-full mt-16 sm:mt-24 md:mt-32 lg:mt-38 overflow-hidden">
        <img 
          src="Images/whoweare.png" 
          alt="Scout Hero" 
          className="w-full h-auto max-h-[600px] object-cover"
        />
      </div>

      {/* Navigation Menu Below the Image */}
      <NavigationMenu />

      <div className="max-w-7xl mx-auto px-4 mt-16">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          {isTamil ? 'ஆராய்ச்சி இயக்கம்' : 'Scout Movement'}
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto text-lg sm:text-xl">
          {isTamil
            ? 'ஆராய்ச்சி இயக்கத்திலிருந்து பிறந்தது, இது ஆராய்ச்சியாளர்களை சहிதமையும் மரியாதையும் மிக்கவர்களாக வழிகாட்டுகிறது. இன்று, உலகம் முழுவதும் 57 மில்லியனுக்கும் மேற்பட்ட ஆராய்ச்சியாளர்கள் இந்த இயக்கத்தை சிரம் சாய்த்த உழைப்பால் நடாத்துகின்றனர்.'
            : 'Born from the Scout Movement, it has continued to guide scouts to be tolerant and respectful. Today, over 57 million scouts worldwide make this movement effective and dedicated, with growing membership and a unified global presence.'}
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-12 mt-28">
          <div className="text-center flex-1 min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
            <Globe className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 text-blue-500" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              {isTamil ? '57 மில்லியன் +' : '57 Million+'}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
              {isTamil ? 'உலகம் முழுவதும் உள்ள ஆராய்ச்சியாளர்கள்' : 'Scouts worldwide'}
            </p>
          </div>
          <div className="text-center flex-1 min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 text-blue-500" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              {isTamil ? '172' : '172'}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
              {isTamil ? 'தேசிய ஆராய்ச்சி அமைப்புகள்' : 'National Scout Organizations'}
            </p>
          </div>
          <div className="text-center flex-1 min-w-[120px] sm:min-w-[150px] lg:min-w-[180px]">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mx-auto mb-1 sm:mb-2 text-blue-500" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
              {isTamil ? '1 மில்லியன் +' : '1 Million+'}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
              {isTamil ? 'விருப்பமுள்ள சேவையாளர்கள்' : 'Adult volunteers'}
            </p>
          </div>
        </div>

        <div className="relative w-full mx-auto mb-16">
          <video 
            controls 
            className="w-full h-auto"
            poster="/Images/cover.png"
          >
            <source src="videos/testvideo.mp4" type="video/mp4" />
            {isTamil ? 'உங்கள் உலாவியில் வீடியோ தொகுப்பு ஆதரவு இல்லை.' : 'Your browser does not support the video tag.'}
          </video>
        </div>

        {/* Organization Cards Section */}
        <div className="flex flex-col sm:flex-row gap-8 mb-16">
          {[
            { 
              img: "/Images/worldscout.png", 
              title: isTamil ? 'தேசிய ஆராய்ச்சி அமைப்பு' : 'National Scout Organization',  
              desc: isTamil ? 'உங்கள் நாட்டில் செயல்படும் ஆராய்ச்சி அமைப்பு' : 'A scout organization operates in your country'
            },
            { 
              img: "/Images/worldscout2.png", 
              title: isTamil ? 'உலக ஆராய்ச்சி இயக்கம்' : 'World Scouting', 
              desc: isTamil ? 'உலகம் முழுவதும் நாங்கள் ஒரு இயக்கமாக இருக்கிறோம்' : 'We have a worldwide movement'
            },
            { 
              img: "/Images/worldscout3.png", 
              title: isTamil ? 'ஆராய்ச்சி இயக்கத்தை ஆதரிக்கவும்' : 'Win to Scout Movement', 
              desc: isTamil ? 'உலகளாவிய அளவில் எங்கள் பணிக்கான ஆதரவு' : 'Support our mission worldwide'
            }
          ].map((card, index) => (
            <div key={index} className="relative w-full sm:w-1/3">
              <img 
                src={card.img}
                alt={card.title}
                className="w-full h-auto object-contain"
              />
              <div className="bg-white p-4 shadow-lg rounded-md mt-2">
                <h3 className="font-semibold text-base truncate">{card.title}</h3>
                <p className="text-sm text-gray-600 truncate">{card.desc}</p>
                <button className="border border-black bg-transparent text-black font-medium text-xs py-2 px-4 rounded-md mt-3 transition duration-300 ease-in-out hover:bg-black hover:text-white">
                  {isTamil ? 'மேலும் அறிக' : 'Learn More'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto text-sm sm:text-base">
          {isTamil
            ? '"உலக பொது மக்கள் என்பவர்கள் தங்களை ஒரு தேசத்தின் உறுப்பினர்கள் என்று மட்டுமே பார்க்கவில்லை, அவர்கள் மனித குலத்தின் உறுப்பினர்களாகவும் பார்க்குகிறார்கள். அவர்கள் மற்ற மக்கள் மற்றும் கலாச்சாரங்களை புரிந்துகொள்கிறார்கள் மற்றும் கண்ணியமாக நடத்துகிறார்கள்."'
            : '"Global citizens are those who identify themselves not as members of a single nation, but as members of humanity. They understand and tolerate other people and cultures."'}
        </p>

{/* Updated Ban Ki-moon Section with adjusted positioning and bottom margin */}
<div className="mt-16 mb-24"> {/* Increased bottom margin */}
        {/* Decorative green line */}
        <div className="w-full h-0.5 bg-green-500 mb-12"></div>
        
        {/* Ban Ki-moon content - adjusted to be slightly right-aligned */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:max-w-3xl sm:mx-auto sm:pl-8"> {/* Added pl-8 for slight right alignment */}
          <img 
            src="Images/bankimoon.png"
            alt="Ban Ki-moon"
            className="w-32 h-32 rounded-full object-cover flex-shrink-0"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold mb-2">
              {isTamil ? 'பான் கி-மூன்' : 'Ban Ki-moon'}
            </h2>
            <p className="text-gray-600 text-base max-w-lg">
              {isTamil
                ? 'பான் கி-மூன், ஐக்கிய நாடுகள் சபையின் 8ஆம் செயலாளர் மற்றும் முன்னாள் ஆராய்ச்சியாளர், அமைதியை வளர்ப்பதில் தன்னை அர்ப்பணித்தவர்.'
                : 'Ban Ki-moon, the 8th Secretary-General of the United Nations and former Scout, is dedicated to promoting peace.'}
            </p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
}