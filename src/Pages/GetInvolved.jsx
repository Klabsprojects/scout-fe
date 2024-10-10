import React, { useState } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Globe, Users, Map, Award, Compass } from 'lucide-react';

const GetInvolved = () => {
  const { isTamil } = useTranslation();
  const [activeSection, setActiveSection] = useState(null);

  const content = {
    english: {
      title: "Discover the Scout Movement",
      subtitle: "Embark on a Journey of Growth, Adventure, and Global Impact",
      sections: [
        {
          icon: <Heart size={32} />,
          title: "Values and Principles",
          description: "Scouting is built on a foundation of strong values including honesty, responsibility, and respect. These principles guide Scouts in their personal growth and their interactions with others and the world around them.",
          details: [
            "Scout Promise: On my honour, I promise that I will do my best to do my duty to God and my Country; To help other people at all times; To obey the Scout Law.",
            "Scout Law: A Scout is trustworthy, loyal, helpful, friendly, courteous, kind, obedient, cheerful, thrifty, brave, clean, and reverent.",
            "Motto: Be Prepared"
          ]
        },
        {
          icon: <Globe size={32} />,
          title: "Global Brotherhood",
          description: "Scouting is a worldwide movement that brings together  people from diverse backgrounds, fostering understanding and peace across cultures.",
          details: [
            "54 million Scouts across 175 countries",
            "Annual events like World Scout  and JOTA-JOTI",
            "International exchange programs and partnerships"
          ]
        },
        {
          icon: <Users size={32} />,
          title: "Leadership Development",
          description: "Scouting provides a unique environment for young people to develop leadership skills through hands-on experiences and progressive responsibilities.",
          details: [
            "Patrol system for teamwork and leadership practice",
            "Youth-led planning and decision-making",
            "Mentoring opportunities and skill-sharing"
          ]
        },
        {
          icon: <Map size={32} />,
          title: "Outdoor Adventure",
          description: "Scouts learn to appreciate and care for the natural world through exciting outdoor activities and environmental education programs.",
          details: [
            "Camping, hiking, and wilderness survival skills",
            "Environmental conservation projects",
            "Adventure sports like rock climbing and kayaking"
          ]
        },
        {
          icon: <Award size={32} />,
          title: "Personal Growth",
          description: "The Scout program encourages continuous learning and self-improvement through a diverse range of activities and achievements.",
          details: [
            "Progressive badge system covering various skills and knowledge areas",
            "Personal reflection and goal-setting practices",
            "Challenges that push Scouts out of their comfort zones"
          ]
        },
        {
          icon: <Compass size={32} />,
          title: "Community Service",
          description: "Scouts are active citizens, making a positive impact in their local communities and addressing global challenges.",
          details: [
            "Regular community services",
            "Disaster relief and emergency preparedness training",
            "Sustainable development initiatives aligned with UN SDGs"
          ]
        }
      ]
    },
    tamil: {
      title: "சாரணர் இயக்கத்தைக் கண்டறியுங்கள்",
      subtitle: "வளர்ச்சி, சாகசம் மற்றும் உலகளாவிய தாக்கத்தின் பயணத்தைத் தொடங்குங்கள்",
      sections: [
        {
          icon: <Heart size={32} />,
          title: "மலர்வுகள் மற்றும் உத்திகள்",
          description: "சாரணர் இயக்கம், நேர்மை, பொறுப்பு மற்றும் மரியாதை போன்ற வலுவான மதிப்புகளின் அடிப்படையில் கட்டமைக்கப்பட்டுள்ளது. இவைச் சிலர் மேலும் வளர்ச்சி மற்றும் மற்றவர்களுடன் மற்றும் உலகத்தின் முழுவதும் உள்ளவர்கள் தொடர்பான குறிக்கோள்கள் மீது அழுத்தம் அளிக்கின்றன.",
          details: [
            "சாணை குறிப்பு: என் விகிதத்தில், நான் என் கடமைகளை கடைபிடிக்க, மற்றவர்களுக்கு உதவ வேண்டும்; சாணை சட்டத்தை ஒப்புக்கொள்ள வேண்டும்.",
            "சாணை சட்டம்: ஒரு சாணை நம்பிக்கையான, நிலைத்த, உதவியாக, நட்பாக, courteous, Kind, obedient, cheerful, thrifty, brave, clean, and reverent.",
            "குறிப்பு: தயார் இருங்கள்"
          ]
        },
        {
          icon: <Globe size={32} />,
          title: "உலகளாவிய சகோதரত্ব",
          description: "சாரணர் இயக்கம், உலகம் முழுவதும் 170 நாடுகளில் உள்ள இளம் மக்கள் ஒருங்கிணைக்கப்படுகிறது, கலாச்சாரங்களைப்போன்ற மதிப்பீடுகளை விரிவாகப் பரப்புகிறது.",
          details: [
            "170 நாடுகளில் 54 மில்லியன் சாணைகள்",
            "சாமானிய சாணைகள் மற்றும் JOTA-JOTI மாதாந்திர நிகழ்வுகள்",
            "உலகளாவிய பரிமாற்ற நிகழ்வுகள் மற்றும் கூட்டாளிகள்"
          ]
        },
        {
          icon: <Users size={32} />,
          title: "குழு வளர்ச்சி",
          description: "சாரணர் இயக்கம், இளைஞர்களுக்கான நடவடிக்கைகளைப் பெறும் மற்றும் முன்னேற்றங்களை பெற்று கொள்ளுங்கள்.",
          details: [
            "குழு அமைப்பு குழு மற்றும் நடைமுறை வளர்ச்சி",
            "இளைஞர்கள் முன்னிலை திட்டமிடல் மற்றும் தீர்மானம்",
            "கற்றல் வாய்ப்பு மற்றும் திறமைகளைப் பகிர்வு"
          ]
        },
        {
          icon: <Map size={32} />,
          title: "வெளிப்புற சாகசம்",
          description: "சாணைகள், வெளிப்புற செயல்பாடுகள் மற்றும் சுற்றுச்சூழல் கல்வித் திட்டங்கள் மூலம் இயற்கை உலகத்தை புரிந்து கொள்ளவும் பராமரிக்கவும் கற்றுக்கொள்கிறார்கள்.",
          details: [
            "கேம்பிங், நீர்மக்கள் மற்றும் காடுகள்",
            "சுற்றுச்சூழல் பாதுகாப்பு திட்டங்கள்",
            "சாகச விளையாட்டுகள் போன்ற கடல் நீர்மாக்கள் மற்றும் கயாகிங்"
          ]
        },
        {
          icon: <Award size={32} />,
          title: "தனிப்பட்ட வளர்ச்சி",
          description: "சாணை திட்டம், மிகப்பெரிய திறன்களுக்கான மதிப்பீடுகளை அடைந்துவரும் மற்றும் முழுமையாக வரையறுக்கப்பட்ட திட்டங்களை வழங்குகிறது.",
          details: [
            "விவசாயத் திறன்கள் மற்றும் அறிவியல் பகுதிகளை உள்ளடக்கிய விருப்பத் திட்டம்",
            "தனிப்பட்ட கருத்துக்களும், குறிக்கோள்களை அமைப்பதற்கான நடைமுறைகள்",
            "சாணைகளை தங்கள் வசதி மாறுகளை கற்பிக்கவும்"
          ]
        },
        {
          icon: <Compass size={32} />,
          title: "சமூக சேவை",
          description: "சாணைகள், அவர்களது சமூகத்தில் நேர்மையான நிதிகள் மேற்கொண்டு கொண்டுள்ளவர்களாகவும், உலகளாவிய சவால்களை சந்திக்கும் போது.",
          details: [
            "தினமும் சமுதாய சேவைகள் திட்டங்கள்",
            "பாரம்பரிய பாதுகாப்பு மற்றும் அவசர உதவி பயிற்சிகள்",
            "UN SDG உடன் இணைந்த நிலையான வளர்ச்சி திட்டங்கள்"
          ]
        }
      ]
    }
  };
  

  const currentContent = isTamil ? content.tamil : content.english;

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-sans pb-20">
<header className="py-20 mt-20 text-center relative overflow-hidden pt-77">
  <motion.h1 
    className="text-5xl font-bold mb-4 text-green-800"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {currentContent.title}
  </motion.h1>
  <motion.p 
    className="text-xl text-green-600"
    initial={{ y: 50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    {currentContent.subtitle}
  </motion.p>
</header>



      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentContent.sections.map((section, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => toggleSection(index)}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4 text-green-500">{section.icon}</div>
                  <h2 className="text-2xl font-semibold text-green-800">{section.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{section.description}</p>
                <AnimatePresence>
                  {activeSection === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="list-disc list-inside text-gray-700 mt-4">
                        {section.details.map((detail, i) => (
                          <li key={i} className="mb-2">{detail}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default GetInvolved;