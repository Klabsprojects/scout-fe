import React, { useState, useEffect } from 'react';
import { Globe, Users, Trophy, ChevronDown, ArrowRight } from 'lucide-react';
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

  return (
    <div className="relative w-full bg-gradient-to-b from-gray-50 to-white">
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

      <div id="content" className="max-w-7xl mx-auto px-4 mt-16">
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
          <div className="aspect-w-16 aspect-h-9">
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

        {/* Enhanced Organization Cards Section */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.2 }}
        >
          {mediaData.organizationImages.map((img, index) => {
            const cards = [
              { 
                title: isTamil ? 'தேசிய ஆராய்ச்சி அமைப்பு' : 'National Scout Organization',  
                desc: isTamil ? 'உங்கள் நாட்டில் செயல்படும் ஆராய்ச்சி அமைப்பு' : 'A scout organization operates in your country'
              },
              { 
                title: isTamil ? 'உலக ஆராய்ச்சி இயக்கம்' : 'World Scouting', 
                desc: isTamil ? 'உலகம் முழுவதும் நாங்கள் ஒரு இயக்கமாக இருக்கிறோம்' : 'We have a worldwide movement'
              },
              { 
                title: isTamil ? 'ஆராய்ச்சி இயக்கத்தை ஆதரிக்கவும்' : 'Join Scout Movement', 
                desc: isTamil ? 'உலகளாவிய அளவில் எங்கள் பணிக்கான ஆதரவு' : 'Support our mission worldwide'
              }
            ];
            return (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={img}
                    alt={cards[index].title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{cards[index].title}</h3>
                  <p className="text-gray-600 mb-4">{cards[index].desc}</p>
                  <button className="flex items-center justify-between w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    {isTamil ? 'மேலும் அறிக' : 'Learn More'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
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
                {isTamil ? 'பான் கி-மூன்' : 'Ban Ki-moon'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                {isTamil
                  ? 'பான் கி-மூன், ஐக்கிய நாடுகள் தலைமைக்கு முன்னாள் தலைவர், ஆராய்ச்சியாளர்கள் ஆகியவர்.'
                  : '"Scouting teaches young people to be active citizens and contribute to society. It gives them the opportunity to dream big and to achieve those dreams."'}
              </p>
              <p className="text-gray-500 mt-2">
                {isTamil ? 'முன்னாள் ஐக்கிய நாடுகள் பொதுச் செயலாளர்' : 'Former UN Secretary-General'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}