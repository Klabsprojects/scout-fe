import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../Context/TranslationContext';
import NavigationMenu from '../components/NavigationMenu';

const scoutMethodData = {
  heroImage: "/Images/ScoutMarch2.png",
  elements: [
    {
      title: { en: "Scout Promise and Law", ta: "சாரணர் வாக்குறுதி மற்றும் சட்டம்" },
      description: { 
        en: "The Scout Promise and Law form the fundamental principles of Scouting, guiding members in their daily lives and activities.",
        ta: "சாரணர் வாக்குறுதி மற்றும் சட்டம் சாரணியத்தின் அடிப்படை கொள்கைகளை உருவாக்குகின்றன, உறுப்பினர்களின் அன்றாட வாழ்க்கை மற்றும் செயல்பாடுகளில் வழிகாட்டுகின்றன."
      },
      icon: "🏅"
    },
    {
      title: { en: "Learning by Doing", ta: "செய்து கற்றல்" },
      description: { 
        en: "This hands-on approach encourages Scouts to learn through practical experiences and active participation.",
        ta: "இந்த நேரடி அணுகுமுறை நடைமுறை அனுபவங்கள் மற்றும் செயலில் பங்கேற்பதன் மூலம் சாரணர்கள் கற்றுக்கொள்ள ஊக்குவிக்கிறது."
      },
      icon: "🔨"
    },
    {
      title: { en: "Team System", ta: "அணி முறை" },
      description: { 
        en: "Working in small teams develops leadership skills, responsibility, and cooperation.",
        ta: "சிறிய குழுக்களில் பணிபுரிவது தலைமைத்துவ திறன்கள், பொறுப்பு மற்றும் ஒத்துழைப்பை வளர்க்கிறது."
      },
      icon: "👥"
    },
    {
      title: { en: "Symbolic Framework", ta: "சின்ன கட்டமைப்பு" },
      description: { 
        en: "Using symbols, themes and stories to make learning meaningful and fun.",
        ta: "கற்றலை அர்த்தமுள்ளதாகவும் மகிழ்ச்சிகரமானதாகவும் மாற்ற சின்னங்கள், கருப்பொருள்கள் மற்றும் கதைகளைப் பயன்படுத்துதல்."
      },
      icon: "🎭"
    },
  ]
};

const translations = {
  title: {
    en: 'The Scout Method',
    ta: 'சாரணர் முறை',
  },
  introduction: {
    en: "The Scout Method is the cornerstone of Scouting's educational approach. It's a comprehensive system designed to support and encourage the development of young people, helping them to realize their full physical, intellectual, emotional, social, and spiritual potentials as individuals, as responsible citizens, and as members of their local, national, and international communities.",
    ta: "சாரணர் முறை என்பது சாரணியத்தின் கல்வி அணுகுமுறையின் அடித்தளமாகும். இது இளைஞர்களின் வளர்ச்சியை ஆதரிக்கவும் ஊக்குவிக்கவும் வடிவமைக்கப்பட்ட ஒரு விரிவான அமைப்பாகும், தனிநபர்களாகவும், பொறுப்பான குடிமக்களாகவும், உள்ளூர், தேசிய மற்றும் சர்வதேச சமூகங்களின் உறுப்பினர்களாகவும் அவர்களின் முழு உடல், அறிவு, உணர்ச்சி, சமூக மற்றும் ஆன்மீக திறன்களை உணர உதவுகிறது."
  },
  keyFeatures: {
    en: 'Key Features of the Scout Method',
    ta: 'சாரணர் முறையின் முக்கிய அம்சங்கள்',
  },
  elements: {
    en: 'The Seven Elements of the Scout Method',
    ta: 'சாரணர் முறையின் ஏழு கூறுகள்',
  },
  implementation: {
    en: 'Implementing the Scout Method',
    ta: 'சாரணர் முறையை செயல்படுத்துதல்',
  },
  implementationContent: {
    en: "Implementing the Scout Method requires a balanced application of all seven elements. Scout leaders play a crucial role in this process, acting as facilitators and mentors. They create opportunities for Scouts to experience each element of the method, ensuring a well-rounded development. The implementation is flexible and adaptable to different cultural contexts and age groups, allowing Scouting to remain relevant and effective across diverse communities worldwide.",
    ta: "சாரணர் முறையை செயல்படுத்த அனைத்து ஏழு கூறுகளின் சமநிலையான பயன்பாடு தேவை. இந்த செயல்முறையில் சாரணர் தலைவர்கள் முக்கிய பங்கு வகிக்கின்றனர், வசதி செய்பவர்கள் மற்றும் வழிகாட்டிகளாக செயல்படுகின்றனர். முறையின் ஒவ்வொரு கூறையும் அனுபவிக்க சாரணர்களுக்கு வாய்ப்புகளை உருவாக்குகிறார்கள், நன்கு வளர்ச்சியை உறுதி செய்கிறார்கள். செயலாக்கம் நெகிழ்வானது மற்றும் வெவ்வேறு கலாச்சார சூழல்கள் மற்றும் வயது குழுக்களுக்கு ஏற்றதாக உள்ளது, உலகெங்கிலும் உள்ள பல்வேறு சமூகங்களில் சாரணியம் தொடர்புடையதாகவும் பயனுள்ளதாகவும் இருக்க அனுமதிக்கிறது."
  },
  impact: {
    en: 'The Impact of the Scout Method',
    ta: 'சாரணர் முறையின் தாக்கம்',
  },
  impactContent: {
    en: "The Scout Method has proven to be an effective approach in youth development. Its impact is seen in the personal growth of Scouts, who often demonstrate enhanced leadership skills, improved self-confidence, stronger ethical values, and a greater sense of civic responsibility. The method's emphasis on learning by doing and progressive self-development equips young people with practical skills and adaptability, preparing them for the challenges of the modern world.",
    ta: "இளைஞர் மேம்பாட்டில் சாரணர் முறை ஒரு பயனுள்ள அணுகுமுறையாக நிரூபிக்கப்பட்டுள்ளது. இதன் தாக்கம் சாரணர்களின் தனிப்பட்ட வளர்ச்சியில் காணப்படுகிறது, அவர்கள் பெரும்பாலும் மேம்படுத்தப்பட்ட தலைமைத்துவ திறன்கள், மேம்படுத்தப்பட்ட தன்னம்பிக்கை, வலுவான நெறிமுறை மதிப்புகள் மற்றும் குடிமைப் பொறுப்பு பற்றிய பெரிய உணர்வைக் காட்டுகிறார்கள். செய்து கற்றல் மற்றும் முன்னேற்ற சுய வளர்ச்சி மீதான முறையின் வலியுறுத்தல் இளைஞர்களுக்கு நடைமுறைத் திறன்கள் மற்றும் தகவமைப்புத் திறனை வழங்குகிறது, நவீன உலகின் சவால்களுக்கு அவர்களைத் தயார்படுத்துகிறது."
  }
};

export default function ScoutMethod() {
  const { isTamil } = useTranslation();
  const [activeElement, setActiveElement] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleElementClick = (index) => {
    setActiveElement(activeElement === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Hero Section */}
      <motion.div 
        className="relative w-full h-[500px] mt-16 sm:mt-24 md:mt-32 lg:mt-38 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <img
          src={scoutMethodData.heroImage}
          alt="Scout Method Hero"
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            {translations.title[isTamil ? 'ta' : 'en']}
          </h1>
          <motion.div 
            className="w-24 h-1 bg-yellow-400 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
        </motion.div>
      </motion.div>

      <NavigationMenu />

      <motion.div 
        className="max-w-6xl mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Introduction Card */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-12 transform hover:scale-[1.02] transition-transform"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {translations.title[isTamil ? 'ta' : 'en']}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {translations.introduction[isTamil ? 'ta' : 'en']}
          </p>
        </motion.div>
{/* Elements Grid */}
<motion.h2 
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
          variants={itemVariants}
        >
          {translations.elements[isTamil ? 'ta' : 'en']}
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          variants={containerVariants}
        >
          {scoutMethodData.elements.map((element, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-xl shadow-md p-6 cursor-pointer transform transition-all duration-300 ${
                activeElement === index ? 'scale-[1.02] shadow-lg' : 'hover:scale-[1.01]'
              }`}
              onClick={() => handleElementClick(index)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{element.icon}</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {element.title[isTamil ? 'ta' : 'en']}
                </h3>
              </div>
              <AnimatePresence>
                {activeElement === index && (
                  <motion.p
                    className="text-gray-600 mt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {element.description[isTamil ? 'ta' : 'en']}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Implementation Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {translations.implementation[isTamil ? 'ta' : 'en']}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {translations.implementationContent[isTamil ? 'ta' : 'en']}
          </p>
        </motion.div>

        {/* Impact Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {translations.impact[isTamil ? 'ta' : 'en']}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {translations.impactContent[isTamil ? 'ta' : 'en']}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}