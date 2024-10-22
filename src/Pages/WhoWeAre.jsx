import React, { useState, useEffect } from 'react';
import { Globe, Users, Trophy, ChevronDown, ArrowRight, ChevronUp } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import NavigationMenu from '../components/NavigationMenu';
import mediaData from '../MediaData.json';
import { motion } from 'framer-motion';

export default function WhoWeAre() {
  const { isTamil } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeStatistic, setActiveStatistic] = useState(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const cards = [
    { 
      title: isTamil ? 'சிந்தனை நாள் பேநீலப்பறவையர்ரணி குருளையர் போட்டிகள் ' : 'Day of Thought Bluebird Kurulayar competitions',  
      desc: isTamil ? 'சிந்தனை நாள் என்பது ஒரு தமிழ் மரபு விழா ஆகும், இது ஊக்கமோ அல்லது கலாச்சார குருளையர் போட்டிகளை கொண்டுள்ளது. இந்த விழாவில், தமிழ் மொழியின் சிந்தனை, பாரம்பரியம் மற்றும் மரபுகள் ஆகியவற்றை பேணுவதற்கான பல்வேறு போட்டிகள் நடைபெறுகின்றன' : 'Chintanai Naal (Thinking Day) is a Tamil cultural festival that includes various competitions and events. This festival celebrates the thought, tradition, and customs of the Tamil language',
    },
    { 
      title: isTamil ? 'தமிழ்நாடு முழுவதும் வான்வழி மற்றும் இணையவழி திரளணி' : 'Aerial and online mobilization across Tamil Nadu', 
      desc: isTamil ? 'தமிழ்நாடு முழுவதும் சிந்தனை நாள் விழா வான்வழி மற்றும் இணையவழி மூலம் தொடர்ச்சியாக நடத்தப்படுகிறது. பல்வேறு தமிழ் மொழி மற்றும் கலாச்சார அமைப்புகள், பல்கலைக்கழகங்கள், பள்ளிகள் மற்றும் கல்வி நிறுவனங்கள் இணைந்து இந்த விழாவை ஏற்பாடு செய்கின்றன' : 'All over Tamilnadu, Contemplation Day celebrations are being conducted continuously through air and internet. Various Tamil language and cultural organizations, universities, schools and educational institutes jointly organize this festival',
    },
    { 
      title: isTamil ? '74வது நிறுவனர் நாள் கொண்டாட்டம்' : '74th Founders Day Celebration', 
      desc: isTamil ? 'இந்த நிறுவனர் நாளில், பல்வேறு விழிப்புணர்வு நிகழ்ச்சிகள், போட்டிகள், பயிற்சி முகாம்கள் மற்றும் சமூக சேவை நடவடிக்கைகள் ஏற்பாடு செய்யப்பட்டிருந்தன. இந்த நிகழ்வு இளைஞர்களின் தலைமை திறன்கள், சுய-நம்பிக்கை மற்றும் பிற முக்கிய திறன்களை வளர்ப்பதில் முக்கிய பங்காற்றுகிறது.' : ' On this Founders Day, several awareness programs, competitions, training camps, and community service activities were organized. This event plays a crucial role in developing the leadership skills, self-confidence, and other important abilities of the',
    }
  ];

  return (
    <div className="relative w-full bg-gradient-to-b from-blue-100 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-[70vh] mt-16 sm:mt-24 md:mt-32 lg:mt-38 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src={mediaData.whoWeAre.heroImage}
            alt="Scout Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </motion.div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
            {...fadeInUp}
          >
            {isTamil ? 'ஆராய்ச்சி இயக்கம்' : 'Scout Movement'}
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl text-center max-w-2xl mx-4"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {isTamil ? 'உலகத்தை மாற்றும் இளைஞர்கள்' : 'Young People Changing the World'}
          </motion.p>
          <motion.div 
            className="mt-8"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => {
                document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold flex items-center hover:bg-opacity-90 transition-all"
            >
              {isTamil ? 'மேலும் அறிக' : 'Learn More'} <ChevronDown className="ml-2" />
            </button>
          </motion.div>
        </div>
      </div>

      <NavigationMenu />

      <div id="content" className="max-w-7xl mx-auto px-4 mt-22">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
            {isTamil ? 'நமது தாக்கம்' : 'Our Impact'}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed">
            {isTamil
              ? 'ஆராய்ச்சி இயக்கத்திலிருந்து பிறந்தது, இது ஆராய்ச்சியாளர்களை சகிப்புத்தன்மையும் மரியாதையும் மிக்கவர்களாக வழிகாட்டுகிறது.'
              : 'Born from the Scout Movement, we continue to guide scouts to be tolerant and respectful, creating a global community of young leaders.'}
          </p>
        </motion.div>

        {/* Enhanced Statistics Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {[
            { icon: Globe, number: '57M+', label: isTamil ? 'உலகம் முழுவதும் உள்ள ஆராய்ச்சியாளர்கள்' : 'Scouts Worldwide' },
            { icon: Trophy, number: '172', label: isTamil ? 'தேசிய ஆராய்ச்சி அமைப்புகள்' : 'National Organizations' },
            { icon: Users, number: '1M+', label: isTamil ? 'விருப்பமுள்ள சேவையாளர்கள்' : 'Adult Volunteers' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              onHoverStart={() => setActiveStatistic(index)}
              onHoverEnd={() => setActiveStatistic(null)}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg text-center w-64">
                <stat.icon className={`w-16 h-16 mx-auto mb-4 ${activeStatistic === index ? 'text-blue-600' : 'text-blue-500'} transition-colors duration-300`} />
                <motion.h3 
                  className="text-3xl font-bold mb-2"
                  animate={{ scale: activeStatistic === index ? 1.1 : 1 }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Video Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full mx-auto mb-20"
        >
          <div className="aspect-w-16 aspect-h-9 w-full sm:w-3/5 mx-auto">
            <video 
              controls 
              className="w-full rounded-xl shadow-2xl"
              poster={mediaData.whoWeAre.videoPoster}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
            >
              <source src={mediaData.whoWeAre.video} type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Updated Organization Cards Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          {mediaData.whoWeAre.organizationImages.map((img, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={img}
                  alt={cards[index].title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-2">{cards[index].title}</h3>
                <p className="text-gray-600">{cards[index].desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Ban Ki-moon Section */}
        <motion.div 
          className="relative mb-24 bg-gray-50 rounded-2xl p-8 sm:p-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"></div>
          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-40 h-40 rounded-full overflow-hidden shadow-xl"
              >
                <img 
                  src={mediaData.whoWeAre.banKiMoonImage}
                  alt="Ban Ki-moon"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-3xl font-bold mb-4">
                {isTamil ? 'ஸ்ரீ.அன்பில் மகேஷ் பொய்யாமொழி' : 'SHRI.ANBIL MAGESH POIYAMOZHI'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {isTamil
                  ? 'மாநில தலைவர்'
                  : 'STATE PRESEIDENT'}
              </p>
              <p className="text-gray-500 mt-2">
                {isTamil ? 'மாண்புமிகு கல்வி அமைச்சர்' : 'HONOURABLE EDUCATION MINISTER'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}