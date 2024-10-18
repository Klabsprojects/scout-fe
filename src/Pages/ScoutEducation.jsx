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
    strategicPriorities: {
      en: 'Strategic Priorities',
      ta: 'மூலோபாய முன்னுரிமைகள்',
    },
    priorities: {
      youthProgramme: {
        en: 'Youth Programme',
        ta: 'இளைஞர் திட்டம்',
        description: {
          en: 'Delivering a high-quality, engaging youth program focused on personal development, leadership skills, and community service. Our program incorporates outdoor activities, skill-building workshops, and hands-on learning experiences.',
          ta: 'உயர்தர, ஈடுபாடான இளைஞர் திட்டத்தை வழங்குதல்'
        }
      },
      adultResources: {
        en: 'Adult Resources',
        ta: 'பெரியவர்கள் வளங்கள்',
        description: {
          en: 'Building a strong network of skilled adult volunteers through comprehensive training programs, mentorship opportunities, and continuous professional development. We focus on creating a supportive environment for our adult leaders.',
          ta: 'பெரியவர்கள் தன்னார்வலர்களை சேர்த்தல், பயிற்சி மற்றும் ஆதரவு'
        }
      },
      management: {
        en: 'Management',
        ta: 'மேலாண்மை',
        description: {
          en: 'Implementing modern governance practices and efficient organizational systems. This includes digital transformation initiatives, streamlined processes, and data-driven decision-making approaches.',
          ta: 'பயனுள்ள ஆளுமை மற்றும் அமைப்பு மேலாண்மையை செயல்படுத்துதல்'
        }
      },
      finance: {
        en: 'Finance',
        ta: 'நிதி',
        description: {
          en: 'Developing diverse funding streams and maintaining transparent financial management. We focus on creating sustainable revenue models, efficient resource allocation, and building emergency reserves.',
          ta: 'நிதி நிலைத்தன்மை மற்றும் நிலையான நிதியுதவியை உறுதி செய்தல்'
        }
      },
      communication: {
        en: 'Communication & Public Relations',
        ta: 'தகவல் தொடர்பு & பொதுமக்கள் தொடர்பு',
        description: {
          en: 'Enhancing our digital presence and community engagement through strategic communications, social media outreach, and impactful storytelling. We aim to showcase the transformative power of scouting.',
          ta: 'விழிப்புணர்வை ஏற்படுத்துதல் மற்றும் வலுவான பிராண்டை உருவாக்குதல்'
        }
      },
      growth: {
        en: 'Growth',
        ta: 'வளர்ச்சி',
        description: {
          en: 'Expanding our reach through innovative recruitment strategies, partnerships with educational institutions, and development of new scout groups. We focus on inclusive growth that reaches diverse communities.',
          ta: 'உறுப்பினர் எண்ணிக்கை மற்றும் தாக்கத்தை விரிவுபடுத்துதல்'
        }
      }
    },
    videoError: {
      en: 'Your browser does not support the video tag.',
      ta: 'உங்கள் உலாவி வீடியோ டேக்கை ஆதரிக்கவில்லை.'
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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 
            className="text-4xl md:text-6xl font-bold text-center mb-4"
            style={{
              background: 'linear-gradient(to right, #FFD700, #FFA500)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
            data-aos="fade-up"
          >
            {translations.title[isTamil ? 'ta' : 'en']}
          </h1>
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
                className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`${priority.color} w-16 h-16 rounded-full flex items-center justify-center mb-6 transform transition-transform hover:rotate-12`}>
                  <priority.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {translations.priorities[priority.key][isTamil ? 'ta' : 'en']}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {translations.priorities[priority.key].description[isTamil ? 'ta' : 'en']}
                </p>
                <div className="mt-4 w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
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