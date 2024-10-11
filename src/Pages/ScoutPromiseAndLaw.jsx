import React, { useState, useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import NavigationMenu from '../components/NavigationMenu';

// Complete content data object
const contentData = {
  carouselImages: [
    "/Images/ScoutMarch.png",
    "/Images/ScoutMarch2.png",
    "/Images/ScoutMarch3.png",
    "/Images/ScoutMarch4.png"
  ],
  promise: {
    title: {
      en: "Scout Promise",
      ta: "சாரணர் வாக்குறுதி"
    },
    content: {
      en: [
        "On my honour, I promise that I will do my best",
        "To do my duty to God* and my Country,",
        "To help other people, and",
        "To obey the Scout Law."
      ],
      ta: [
        "என் மரியாதையின் பேரில், நான் என்னால் இயன்றவரை",
        "கடவுளுக்கும்* என் நாட்டிற்கும் என் கடமையைச் செய்வேன் என்றும்,",
        "மற்றவர்களுக்கு உதவி செய்வேன் என்றும்,",
        "சாரணர் சட்டத்திற்குக் கீழ்ப்படிவேன் என்றும் வாக்குறுதி அளிக்கிறேன்."
      ]
    },
    note: {
      en: "*The word Dharma may be substituted for the word god if so desired.",
      ta: "*விரும்பினால் 'கடவுள்' என்ற சொல்லுக்குப் பதிலாக 'தர்மம்' என்ற சொல்லைப் பயன்படுத்தலாம்."
    }
  },
  law: {
    title: {
      en: "Scout Law",
      ta: "சாரணர் சட்டம்"
    },
    content: {
      en: [
        "1. A Scout is trustworthy",
        "2. A Scout is loyal",
        "3. A Scout is a friend to all and a brother/sister to every other Scout",
        "4. A Scout is courteous",
        "5. A Scout is a friend to animals and loves nature",
        "6. A Scout is disciplined and helps protect public property",
        "7. A Scout is courageous",
        "8. A Scout is thrifty",
        "9. A Scout is pure in thought, word and deed"
      ],
      ta: [
        "1. சாரணர் நம்பிக்கைக்கு உரியவர்",
        "2. சாரணர் விசுவாசமானவர்",
        "3. சாரணர் அனைவருக்கும் நண்பர், மற்ற சாரணர்களுக்கு சகோதரர்/சகோதரி",
        "4. சாரணர் மரியாதையானவர்",
        "5. சாரணர் விலங்குகளுக்கு நண்பர், இயற்கையை நேசிப்பவர்",
        "6. சாரணர் ஒழுங்குள்ளவர், பொதுச் சொத்துக்களைப் பாதுகாக்க உதவுபவர்",
        "7. சாரணர் தைரியமானவர்",
        "8. சாரணர் சிக்கனமானவர்",
        "9. சாரணர் எண்ணத்திலும், சொல்லிலும், செயலிலும் தூய்மையானவர்"
      ]
    }
  },
  history: {
    title: {
      en: "History of the Scout Promise and Law",
      ta: "சாரணர் வாக்குறுதி மற்றும் சட்டத்தின் வரலாறு"
    },
    content: {
      en: "The Scout Promise and Law were first introduced by Lord Baden-Powell in 1908. The original Promise focused on honor and duty, while the Law outlined the moral code all Scouts should follow. Over the years, the wording has been slightly modified in different countries to reflect cultural values while maintaining the core principles.",
      ta: "சாரணர் வாக்குறுதி மற்றும் சட்டம் 1908 ஆம் ஆண்டில் லார்ட் பேடன்-பவெல் அவர்களால் முதன்முதலில் அறிமுகப்படுத்தப்பட்டது. முதல் வாக்குறுதி மரியாதை மற்றும் கடமை மீது கவனம் செலுத்தியது, சட்டம் அனைத்து சாரணர்களும் பின்பற்ற வேண்டிய நெறிமுறைக் குறியீட்டை வகுத்தது."
    }
  },
  significance: {
    title: {
      en: "Significance of the Promise and Law",
      ta: "வாக்குறுதி மற்றும் சட்டத்தின் முக்கியத்துவம்"
    },
    content: {
      en: "The Scout Promise and Law are the guiding principles that shape the character and conduct of every Scout. They embody the core values of Scouting, emphasizing duty to God and country, service to others, personal integrity, and adherence to a moral code.",
      ta: "சாரணர் வாக்குறுதி மற்றும் சட்டம் ஒவ்வொரு சாரணரின் குணம் மற்றும் நடத்தையை வடிவமைக்கும் வழிகாட்டும் கொள்கைகளாகும். இவை சாரணியத்தின் முக்கிய விழுமியங்களை உள்ளடக்கியவை."
    }
  },
  timeline: {
    en: [
      {
        year: "1907",
        title: "First Scout Camp",
        description: "Lord Baden-Powell held the first Scout camp on Brownsea Island."
      },
      {
        year: "1908",
        title: "Scouting for Boys",
        description: "The Scout Promise and Law were first published in 'Scouting for Boys'."
      },
      {
        year: "1909",
        title: "Global Movement",
        description: "Scouting began spreading internationally, adapting the Promise and Law to different cultures."
      }
    ],
    ta: [
      {
        year: "1907",
        title: "முதல் சாரணர் முகாம்",
        description: "லார்ட் பேடன்-பவெல் பிரவுன்சி தீவில் முதல் சாரணர் முகாமை நடத்தினார்."
      },
      {
        year: "1908",
        title: "சாரணர்களுக்கான புத்தகம்",
        description: "சாரணர் வாக்குறுதி மற்றும் சட்டம் முதன்முதலில் 'சாரணர்களுக்கான புத்தகத்தில்' வெளியிடப்பட்டது."
      },
      {
        year: "1909",
        title: "உலகளாவிய இயக்கம்",
        description: "சாரணியம் சர்வதேச அளவில் பரவத் தொடங்கியது, வாக்குறுதி மற்றும் சட்டம் வெவ்வேறு கலாச்சாரங்களுக்கு ஏற்ப தழுவப்பட்டது."
      }
    ]
  }
};

export default function ScoutPromiseLaw() {
  const { isTamil } = useTranslation();
  const [activeSection, setActiveSection] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === contentData.carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Sections renderer
  const renderSection = (sectionKey, content) => (
    <div 
      className="bg-white rounded-xl shadow-lg p-8 mb-8 cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
      onClick={() => handleSectionClick(sectionKey)}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {content.title[isTamil ? 'ta' : 'en']}
      </h2>
      <div className={`transition-all duration-500 ${activeSection === sectionKey ? 'opacity-100' : 'opacity-70'}`}>
        {Array.isArray(content.content[isTamil ? 'ta' : 'en']) ? (
          <div className="space-y-4">
            {content.content[isTamil ? 'ta' : 'en'].map((item, index) => (
              <p 
                key={index}
                className="text-lg text-gray-700 font-medium"
                style={{
                  transform: activeSection === sectionKey ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: activeSection === sectionKey ? 1 : 0.7,
                  transition: `all 0.5s ${index * 0.1}s`
                }}
              >
                {item}
              </p>
            ))}
            {content.note && (
              <p className="text-sm text-gray-500 italic mt-4">
                {content.note[isTamil ? 'ta' : 'en']}
              </p>
            )}
          </div>
        ) : (
          <p className="text-lg text-gray-600 leading-relaxed">
            {content.content[isTamil ? 'ta' : 'en']}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Hero Section with Image Carousel */}
      <div className="relative w-full h-[500px] mt-16 sm:mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60" />
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out">
          {contentData.carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Scout Image ${index + 1}`}
              className={`w-full h-full object-cover transition-opacity duration-500 absolute ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {contentData.promise.title[isTamil ? 'ta' : 'en']}
          </h1>
          <div className="w-24 h-1 bg-yellow-400 rounded-full mb-4" />
          <p className="text-xl text-white">
            {contentData.law.title[isTamil ? 'ta' : 'en']}
          </p>
        </div>
      </div>

      <NavigationMenu />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Promise and Law Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {renderSection('promise', contentData.promise)}
          {renderSection('law', contentData.law)}
        </div>

        {/* History Section */}
        {renderSection('history', contentData.history)}

        {/* Timeline Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {contentData.significance.title[isTamil ? 'ta' : 'en']}
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="relative z-10">
              {contentData.timeline[isTamil ? 'ta' : 'en'].map((point, index) => (
                <div key={index} className={`mb-8 flex ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                  <div className="flex-1" />
                  <div className="w-6 h-6 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <div className={`bg-blue-50 p-6 rounded-lg ${index % 2 === 0 ? 'mr-4' : 'ml-4'}`}>
                      <h3 className="text-xl font-bold mb-2">{point.year}: {point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}