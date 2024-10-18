import React, { useEffect } from 'react';
import { Book, Target, Users, BarChart2, Wallet, MessageCircle, TrendingUp } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import NavigationMenu from '../components/NavigationMenu';
import mediaData from '../MediaData.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ScoutEducation() {
  const { isTamil } = useTranslation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const translations = {
    title: {
      en: 'Our Mission',
      ta: 'எங்கள் நோக்கம்',
    },
    vision: {
      en: 'Vision 2024',
      ta: 'தொலைநோக்கு 2024',
    },
    description: {
      en: "Scout education nurtures youth into global citizens, equipping them with life skills and inspiring positive change in society. Scouting's non-formal educational approach aims to equip young people with the skills and competencies that enable these ideals.",
      ta: "சாரணர் கல்வி இளைஞர்களை உலகளாவிய குடிமக்களாக வளர்க்கிறது, அவர்களுக்கு வாழ்க்கைத் திறன்களை வழங்குகிறது மற்றும் சமூகத்தில் நேர்மறையான மாற்றத்தை ஊக்குவிக்கிறது.",
    },
    visionStatement: {
      en: "By 2024, The Bharat Scouts and Guides will be a globally visible, consistently growing, self-reliant premium youth movement that is gender balanced, vibrant and responsive to trends.",
      ta: "2024 ஆம் ஆண்டளவில், பாரத சாரணர்கள் மற்றும் வழிகாட்டிகள் பாலின சமநிலை, துடிப்பான மற்றும் போக்குகளுக்கு பதிலளிக்கும் வகையில் உலகளவில் தெரியக்கூடிய, தொடர்ந்து வளரும், சுய-சார்பு கொண்ட முன்னணி இளைஞர் இயக்கமாக இருக்கும்.",
    },
    missionStatement: {
      en: "Providing young people with value-based, attractive and challenging youth programme, through competent leaders, effective communication, optimum use of technology and efficient management.",
      ta: "திறமையான தலைவர்கள், பயனுள்ள தகவல் தொடர்பு, தொழில்நுட்பத்தின் உகந்த பயன்பாடு மற்றும் திறமையான மேலாண்மை மூலம் இளைஞர்களுக்கு மதிப்பு சார்ந்த, கவர்ச்சிகரமான மற்றும் சவாலான இளைஞர் திட்டத்தை வழங்குதல்.",
    },
    strategicPriorities: {
      en: 'Strategic Priorities',
      ta: 'மூலோபாய முன்னுரிமைகள்',
    },
    videoError: {
      en: 'Your browser does not support the video tag.',
      ta: 'உங்கள் உலாவி வீடியோ டேக்கை ஆதரிக்கவில்லை.',
    },
    priorities: {
      youthProgramme: {
        en: 'Youth Programme',
        ta: 'இளைஞர் திட்டம்',
        description: {
          en: 'Delivering a high-quality, engaging youth program',
          ta: 'உயர்தர, ஈடுபாடான இளைஞர் திட்டத்தை வழங்குதல்'
        }
      },
      adultResources: {
        en: 'Adult Resources',
        ta: 'பெரியவர்கள் வளங்கள்',
        description: {
          en: 'Recruiting, training and supporting adult volunteers',
          ta: 'பெரியவர்கள் தன்னார்வலர்களை சேர்த்தல், பயிற்சி மற்றும் ஆதரவு'
        }
      },
      management: {
        en: 'Management',
        ta: 'மேலாண்மை',
        description: {
          en: 'Implementing effective governance and organizational management',
          ta: 'பயனுள்ள ஆளுமை மற்றும் அமைப்பு மேலாண்மையை செயல்படுத்துதல்'
        }
      },
      finance: {
        en: 'Finance',
        ta: 'நிதி',
        description: {
          en: 'Ensuring financial stability and sustainable funding',
          ta: 'நிதி நிலைத்தன்மை மற்றும் நிலையான நிதியுதவியை உறுதி செய்தல்'
        }
      },
      communication: {
        en: 'Communication & Public Relations',
        ta: 'தகவல் தொடர்பு & பொதுமக்கள் தொடர்பு',
        description: {
          en: 'Raising awareness and building a strong brand',
          ta: 'விழிப்புணர்வை ஏற்படுத்துதல் மற்றும் வலுவான பிராண்டை உருவாக்குதல்'
        }
      },
      growth: {
        en: 'Growth',
        ta: 'வளர்ச்சி',
        description: {
          en: 'Expanding membership and impact',
          ta: 'உறுப்பினர் எண்ணிக்கை மற்றும் தாக்கத்தை விரிவுபடுத்துதல்'
        }
      }
    }
  };

  const strategicPriorities = [
    { icon: Target, key: 'youthProgramme', color: 'bg-emerald-500' },
    { icon: Users, key: 'adultResources', color: 'bg-blue-500' },
    { icon: BarChart2, key: 'management', color: 'bg-purple-500' },
    { icon: Wallet, key: 'finance', color: 'bg-yellow-500' },
    { icon: MessageCircle, key: 'communication', color: 'bg-red-500' },
    { icon: TrendingUp, key: 'growth', color: 'bg-green-500' }
  ];

  return (
    <div className="relative w-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full mt-16 sm:mt-24 md:mt-32 lg:mt-38 overflow-hidden">
        <img
          src={mediaData.scoutEducation.heroImage}
          alt="Scout Education Hero"
          className="w-full h-auto max-h-[600px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4" data-aos="fade-up">
            {translations.title[isTamil ? 'ta' : 'en']}
          </h1>
          <p className="text-xl text-white text-center max-w-3xl px-4" data-aos="fade-up" data-aos-delay="200">
            {translations.missionStatement[isTamil ? 'ta' : 'en']}
          </p>
        </div>
      </div>

      <NavigationMenu />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Vision 2024 Section */}
        <div className="mb-24" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {translations.vision[isTamil ? 'ta' : 'en']}
          </h2>
          <div className="bg-white rounded-lg shadow-xl p-8">
            <p className="text-xl text-gray-700 text-center leading-relaxed mb-8">
              {translations.visionStatement[isTamil ? 'ta' : 'en']}
            </p>
          </div>
        </div>

        {/* Strategic Priorities */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">
            {translations.strategicPriorities[isTamil ? 'ta' : 'en']}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strategicPriorities.map((priority, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`${priority.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <priority.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {translations.priorities[priority.key][isTamil ? 'ta' : 'en']}
                </h3>
                <p className="text-gray-600">
                  {translations.priorities[priority.key].description[isTamil ? 'ta' : 'en']}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Sections */}
        <div className="flex flex-col md:flex-row items-center mb-24">
          <div className="md:w-3/5 mb-8 md:mb-0 md:mr-8" data-aos="fade-right">
            <img
              src={mediaData.scoutEducation.educationImage1}
              alt="Scout Education"
              className="w-full h-auto object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="md:w-2/5" data-aos="fade-left">
            <p className="text-gray-600 leading-relaxed">
              {translations.description[isTamil ? 'ta' : 'en']}
            </p>
          </div>
        </div>

        {/* Video Section */}
        {mediaData.scoutEducation.videos && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {mediaData.scoutEducation.videos.map((video, index) => (
              <div key={index} className="flex flex-col items-center" data-aos="flip-left" data-aos-delay={index * 100}>
                <div className="w-full rounded-lg overflow-hidden shadow-2xl mb-4">
                  <video controls className="w-full h-auto" poster={mediaData.scoutEducation.videoPoster}>
                    <source src={video.src} type="video/mp4" />
                    {translations.videoError[isTamil ? 'ta' : 'en']}
                  </video>
                </div>
                <p className="text-xl text-violet-700 font-semibold">
                  {isTamil ? video.title.ta : video.title.en}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}