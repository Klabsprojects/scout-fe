import React from 'react';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';
import NavigationMenu from '../components/NavigationMenu';

const ScoutingHistoryPage = () => {
  const { isTamil } = useTranslation();

  const content = {
    en: {
      title: "The Rich History of Bharat Scouts and Guides",
      subtitle: "A Journey of Leadership, Service & Adventure",
      timeline: [
        {
          year: "1909",
          title: "Birth of Indian Scouting",
          description: "Scouting movement begins in India, inspired by Lord Baden-Powell's vision"
        },
        {
          year: "1911",
          title: "Guide Movement Introduced",
          description: "The Guide movement launches in India, empowering young women"
        },
        {
          year: "1950",
          title: "Official Establishment",
          description: "Bharat Scouts and Guides officially formed, uniting various scouting organizations"
        }
      ],
      sections: {
        growth: {
          title: "Growth & Development",
          description: "From its humble beginnings to becoming one of India's largest youth organizations, our journey has been marked by continuous growth and adaptation to meet the changing needs of young people."
        },
        impact: {
          title: "Our Impact",
          description: "Millions of young Indians have developed leadership skills, civic responsibility, and outdoor expertise through our programs."
        },
        future: {
          title: "Looking to the Future",
          description: "As we move forward, we remain committed to shaping responsible, self-reliant citizens and fostering global brotherhood."
        }
      },
      stats: [
        { number: "5M+", label: "Active Members" },
        { number: "75+", label: "Years of Service" },
        { number: "28", label: "State Associations" }
      ]
    },
    ta: {
      title: "பாரத சாரணர் மற்றும் சாரணியர் இயக்கத்தின் வளமான வரலாறு",
      subtitle: "தலைமைத்துவம், சேவை & சாகசத்தின் பயணம்",
      timeline: [
        {
          year: "1909",
          title: "இந்திய சாரணர் இயக்கத்தின் பிறப்பு",
          description: "லார்ட் பேடன்-பாவெல்லின் பார்வையால் ஊக்கமளித்து இந்தியாவில் சாரணர் இயக்கம் தொடங்கியது"
        },
        {
          year: "1911",
          title: "சாரணியர் இயக்கம் அறிமுகம்",
          description: "இந்தியாவில் சாரணியர் இயக்கம் தொடங்கப்பட்டது, இளம் பெண்களுக்கு அதிகாரம் அளித்தது"
        },
        {
          year: "1950",
          title: "அதிகாரப்பூர்வ நிறுவனம்",
          description: "பல்வேறு சாரணர் அமைப்புகளை ஒன்றிணைத்து பாரத சாரணர் மற்றும் சாரணியர் அதிகாரப்பூர்வமாக உருவாக்கப்பட்டது"
        }
      ],
      sections: {
        growth: {
          title: "வளர்ச்சி & முன்னேற்றம்",
          description: "எளிமையான தொடக்கத்திலிருந்து இந்தியாவின் மிகப்பெரிய இளைஞர் அமைப்புகளில் ஒன்றாக மாறும் வரை, எங்கள் பயணம் தொடர்ச்சியான வளர்ச்சி மற்றும் இளைஞர்களின் மாறும் தேவைகளை பூர்த்தி செய்வதற்கான தகவமைப்புகளால் குறிக்கப்பட்டுள்ளது."
        },
        impact: {
          title: "எங்கள் தாக்கம்",
          description: "லட்சக்கணக்கான இளம் இந்தியர்கள் எங்கள் திட்டங்கள் மூலம் தலைமைத்துவ திறன்கள், குடிமைப் பொறுப்பு மற்றும் வெளிப்புற நிபுணத்துவத்தை வளர்த்துள்ளனர்."
        },
        future: {
          title: "எதிர்காலத்தை நோக்கி",
          description: "நாங்கள் முன்னேறும்போது, பொறுப்புள்ள, சுய சார்புடைய குடிமக்களை உருவாக்குவதிலும், உலகளாவிய சகோதரத்துவத்தை வளர்ப்பதிலும் அர்ப்பணிப்புடன் இருக்கிறோம்."
        }
      },
      stats: [
        { number: "5M+", label: "செயலில் உள்ள உறுப்பினர்கள்" },
        { number: "75+", label: "சேவை ஆண்டுகள்" },
        { number: "28", label: "மாநில சங்கங்கள்" }
      ]
    }
  };

  const t = content[isTamil ? 'ta' : 'en'];

  return (
    <div className="bg-gray-50">
      {/* Top Logo Bar */}
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <img 
          src={mediaData.headerImages.scoutLogo} 
          alt="Scout Logo" 
          className="h-16 object-contain"
        />
        <img 
          src={mediaData.headerImages.tnLogo} 
          alt="TN Logo" 
          className="h-16 object-contain"
        />
      </div>
      
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <img 
          src={mediaData.carouselImages[1]}
          alt="Scouts marching"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t.title}</h1>
            <p className="text-2xl md:text-3xl">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto">
          <NavigationMenu />
        </div>
      </div>

      {/* Content Sections */}
      <div className="pt-8">
        {/* Timeline Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey Through Time</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.timeline.map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-4">{item.year}</div>
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Our Impact in Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {t.stats.map((stat, index) => (
                <div key={index} className="bg-white bg-opacity-10 p-8 rounded-lg">
                  <div className="text-5xl font-bold mb-4">{stat.number}</div>
                  <div className="text-2xl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          {/* Growth & Development Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">{t.sections.growth.title}</h2>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg mb-8">{t.sections.growth.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <img 
                    src={mediaData.organizationImages[0]}
                    alt="Organization growth"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <img 
                    src={mediaData.organizationImages[1]}
                    alt="Organization development"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src={mediaData.carouselImages[2]}
                  alt="Scouts in action"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Our Impact Section */}
          <div>
            <h2 className="text-4xl font-bold mb-8 text-center">{t.sections.impact.title}</h2>
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="md:w-1/2">
                <p className="text-gray-700 text-lg mb-8">{t.sections.impact.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {mediaData.featuredStories.slice(0, 2).map((img, index) => (
                    <img 
                      key={index}
                      src={img}
                      alt={`Impact story ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src={mediaData.carouselImages[3]}
                  alt="Scouts making an impact"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Future Section */}
        <div className="bg-gray-100 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">{t.sections.future.title}</h2>
              <p className="text-gray-700 text-lg max-w-3xl mx-auto">{t.sections.future.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mediaData.carouselImages.slice(1, 4).map((img, index) => (
                <img 
                  key={index}
                  src={img}
                  alt={`Future vision ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutingHistoryPage;