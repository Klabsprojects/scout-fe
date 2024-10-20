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
      en: "Scout education nurtures youth into global citizens, equipping them with life skills and inspiring positive change in society. Scouting's non-formal educational approach aims to equip young people with the skills and competencies that enable these ideals. Through a variety of engaging activities and challenges, scouts learn important values such as teamwork, leadership, and environmental stewardship. This holistic approach to education helps young people develop not just practical skills, but also a strong sense of social responsibility and a global perspective.",
      ta: "சாரணர் கல்வி இளைஞர்களை உலகளாவிய குடிமக்களாக வளர்க்கிறது, அவர்களுக்கு வாழ்க்கைத் திறன்களை வழங்குகிறது மற்றும் சமூகத்தில் நேர்மறையான மாற்றத்தை ஊக்குவிக்கிறது.",
    },
    additionalContent: {
      en: "Our educational programs are designed to be adaptable and inclusive, catering to diverse needs and backgrounds. We emphasize experiential learning, allowing scouts to apply their knowledge in real-world situations. This practical approach not only reinforces learning but also builds confidence and problem-solving skills. Furthermore, our international networks provide opportunities for cultural exchange, fostering global understanding and cooperation from a young age.",
      ta: "எங்கள் கல்வித் திட்டங்கள் பல்வேறு தேவைகள் மற்றும் பின்னணிகளுக்கு ஏற்ப தகவமைக்கக்கூடியதாகவும், உள்ளடக்கியதாகவும் வடிவமைக்கப்பட்டுள்ளன. நாங்கள் அனுபவ கற்றலை வலியுறுத்துகிறோம், இது சாரணர்கள் தங்கள் அறிவை உண்மையான உலக சூழ்நிலைகளில் பயன்படுத்த அனுமதிக்கிறது. "
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
          ta: 'தனிப்பட்ட வளர்ச்சி, தலைமைத்துவ திறன்கள் மற்றும் சமூக சேவை ஆகியவற்றில் கவனம் செலுத்தும் உயர்தரமான, ஈடுபாடான இளைஞர் திட்டத்தை வழங்குதல். எங்கள் திட்டம் வெளிப்புற செயல்பாடுகள், திறன் மேம்பாட்டு பட்டறைகள் மற்றும் நடைமுறை கற்றல் அனுபவங்களை உள்ளடக்கியது.'
        }
      },
      adultResources: {
        en: 'Adult Resources',
        ta: 'பெரியவர்கள் வளங்கள்',
        description: {
          en: 'Building a strong network of skilled adult volunteers through comprehensive training programs, mentorship opportunities, and continuous professional development. We focus on creating a supportive environment for our adult leaders.',
          ta: 'விரிவான பயிற்சித் திட்டங்கள், வழிகாட்டுதல் வாய்ப்புகள் மற்றும் தொடர்ச்சியான தொழில்முறை வளர்ச்சி மூலம் திறமையான பெரியவர் தன்னார்வலர்களின் வலுவான வலையமைப்பை உருவாக்குதல். எங்கள் பெரியவர் தலைவர்களுக்கு ஆதரவான சூழலை உருவாக்குவதில் நாங்கள் கவனம் செலுத்துகிறோம்.'
        }
      },
      management: {
        en: 'Management',
        ta: 'மேலாண்மை',
        description: {
          en: 'Implementing modern governance practices and efficient organizational systems. This includes digital transformation initiatives, streamlined processes, and data-driven decision-making approaches.',
          ta: 'நவீன ஆளுமை நடைமுறைகள் மற்றும் திறமையான அமைப்பு முறைமைகளை செயல்படுத்துதல். இது டிஜிட்டல் மாற்ற முயற்சிகள், எளிமைப்படுத்தப்பட்ட செயல்முறைகள் மற்றும் தரவு அடிப்படையிலான முடிவெடுக்கும் அணுகுமுறைகளை உள்ளடக்கியது.'
        }
      },
      finance: {
        en: 'Finance',
        ta: 'நிதி',
        description: {
          en: 'Developing diverse funding streams and maintaining transparent financial management. We focus on creating sustainable revenue models, efficient resource allocation, and building emergency reserves.',
          ta: 'பல்வேறு நிதி ஆதாரங்களை உருவாக்குதல் மற்றும் வெளிப்படையான நிதி நிர்வாகத்தை பராமரித்தல். நிலையான வருவாய் மாதிரிகளை உருவாக்குதல், திறமையான வள ஒதுக்கீடு மற்றும் அவசரகால சேமிப்புகளை உருவாக்குவதில் நாங்கள் கவனம் செலுத்துகிறோம்.'
        }
      },
      communication: {
        en: 'Communication & Public Relations',
        ta: 'தகவல் தொடர்பு & பொதுமக்கள் தொடர்பு',
        description: {
          en: 'Enhancing our digital presence and community engagement through strategic communications, social media outreach, and impactful storytelling. We aim to showcase the transformative power of scouting.',
          ta: 'மூலோபாய தகவல் தொடர்புகள், சமூக ஊடக அணுகல் மற்றும் தாக்கம் மிக்க கதை சொல்லல் மூலம் எங்கள் டிஜிட்டல் இருப்பு மற்றும் சமூக ஈடுபாட்டை மேம்படுத்துதல். சாரணர் இயக்கத்தின் மாற்றும் சக்தியை வெளிப்படுத்துவதே எங்கள் நோக்கம்.'
        }
      },
      growth: {
        en: 'Growth',
        ta: 'வளர்ச்சி',
        description: {
          en: 'Expanding our reach through innovative recruitment strategies, partnerships with educational institutions, and development of new scout groups. We focus on inclusive growth that reaches diverse communities.',
          ta: 'புதுமையான ஆட்சேர்ப்பு உத்திகள், கல்வி நிறுவனங்களுடனான கூட்டாண்மைகள் மற்றும் புதிய சாரணர் குழுக்களின் வளர்ச்சி மூலம் எங்கள் அணுகலை விரிவுபடுத்துதல். பல்வேறு சமூகங்களை அடையும் உள்ளடக்கிய வளர்ச்சியில் நாங்கள் கவனம் செலுத்துகிறோம்.'
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
          className="w-full h-auto max-h-[500px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 px-4"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Vision 2024 Section */}
        <div className="mb-24" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
            {translations.vision[isTamil ? 'ta' : 'en']}
          </h2>
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8">
            <p className="text-lg sm:text-xl text-gray-700 text-center leading-relaxed mb-8">
              {translations.visionStatement[isTamil ? 'ta' : 'en']}
            </p>
          </div>
        </div>

        {/* Strategic Priorities */}
        <div className="mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-up">
            {translations.strategicPriorities[isTamil ? 'ta' : 'en']}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
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
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8" data-aos="fade-right">
            <img
              src={mediaData.scoutEducation.educationImage1}
              alt="Scout Education"
              className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <p className="text-gray-600 leading-relaxed mb-4">
              {translations.description[isTamil ? 'ta' : 'en']}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {translations.additionalContent[isTamil ? 'ta' : 'en']}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center mb-24">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:ml-8" data-aos="fade-left">
            <img
              src={mediaData.scoutEducation.educationImage2}
              alt="Scout Education"
              className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <p className="text-gray-600 leading-relaxed mb-4">
              {translations.description[isTamil ? 'ta' : 'en']}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {translations.additionalContent[isTamil ? 'ta' : 'en']}
            </p>
          </div>
        </div>

        {/* Video Section */}
        {mediaData.scoutEducation.videos && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {mediaData.scoutEducation.videos.map((video, index) => (
              <div key={index} className="flex flex-col items-center" data-aos="flip-left" data-aos-delay={index * 100}>
                <div className="w-full rounded-lg overflow-hidden shadow-2xl mb-4">
                  <video controls className="w-full h-auto" poster={mediaData.scoutEducation.videoPoster}>
                    <source src={video.src} type="video/mp4" />
                    {translations.videoError[isTamil ? 'ta' : 'en']}
                  </video>
                </div>
                <p className="text-lg sm:text-xl text-violet-700 font-semibold text-center">
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