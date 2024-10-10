import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';

const WhatWeDoPage = () => {
  const { isTamil } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % mediaData.carouselImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  const translations = {
    title: {
      en: "What We Do",
      ta: "நாம் என்ன செய்கிறோம்",
    },
    subtitle: {
      en: "Empowering Youth, Building Character",
      ta: "இளைஞர்களை வலுப்படுத்துதல், குணாதிசயத்தை உருவாக்குதல்",
    },
    description: {
      en: "Tamil Nadu Scouts and Guides is dedicated to fostering leadership, outdoor skills, and community service among young people. Through our diverse programs and activities, we aim to develop well-rounded individuals who are prepared for life's challenges.",
      ta: "தமிழ்நாடு சாரணர் மற்றும் சாரணியர் இயக்கம் இளைஞர்களிடையே தலைமைத்துவம், வெளிப்புற திறன்கள் மற்றும் சமூக சேவையை வளர்ப்பதில் அர்ப்பணிப்புடன் உள்ளது. எங்களின் பல்வேறு திட்டங்கள் மற்றும் செயல்பாடுகள் மூலம், வாழ்க்கையின் சவால்களுக்கு தயாராக இருக்கும் முழுமையான தனிநபர்களை உருவாக்க நாங்கள் முயற்சிக்கிறோம்.",
    },
    activities: {
      en: "Our Core Activities",
      ta: "எங்களின் முக்கிய செயல்பாடுகள்",
    },
    activity1: {
      en: "Outdoor Adventures",
      ta: "வெளிப்புற சாகசங்கள்",
    },
    activity1Description: {
      en: "Experience nature, develop survival skills, and build resilience through camping, hiking, and environmental conservation projects.",
      ta: "முகாமிடல், நடைபயணம் மற்றும் சுற்றுச்சூழல் பாதுகாப்பு திட்டங்கள் மூலம் இயற்கையை அனுபவித்து, உயிர்வாழும் திறன்களை வளர்த்து, நெகிழ்திறனை வளர்க்கவும்.",
    },
    activity2: {
      en: "Leadership Training",
      ta: "தலைமைத்துவ பயிற்சி",
    },
    activity2Description: {
      en: "Develop crucial leadership skills through workshops, team-building exercises, and real-world problem-solving challenges.",
      ta: "பட்டறைகள், குழு உருவாக்கும் பயிற்சிகள் மற்றும் உண்மையான உலக சிக்கல் தீர்க்கும் சவால்கள் மூலம் முக்கியமான தலைமைத்துவ திறன்களை வளர்க்கவும்.",
    },
    activity3: {
      en: "Community Service",
      ta: "சமூக சேவை",
    },
    activity3Description: {
      en: "Make a positive impact in local communities through volunteer work, social initiatives, and awareness campaigns.",
      ta: "தன்னார்வ வேலை, சமூக முயற்சிகள் மற்றும் விழிப்புணர்வு பிரச்சாரங்கள் மூலம் உள்ளூர் சமூகங்களில் நேர்மறையான தாக்கத்தை ஏற்படுத்துங்கள்.",
    },
    impact: {
      en: "Our Impact",
      ta: "எங்கள் தாக்கம்",
    },
    impactDescription: {
      en: "Over the years, we've made a significant difference in the lives of thousands of young people across Tamil Nadu.",
      ta: "பல ஆண்டுகளாக, தமிழ்நாடு முழுவதும் ஆயிரக்கணக்கான இளைஞர்களின் வாழ்க்கையில் நாங்கள் குறிப்பிடத்தக்க மாற்றத்தை ஏற்படுத்தியுள்ளோம்.",
    },
    impactStats: [
      { 
        title: { en: "Youth Reached", ta: "சென்றடைந்த இளைஞர்கள்" },
        value: "50,000+"
      },
      {
        title: { en: "Community Projects", ta: "சமூகத் திட்டங்கள்" },
        value: "1,000+"
      },
      {
        title: { en: "Volunteer Hours", ta: "தன்னார்வ மணிநேரங்கள்" },
        value: "500,000+"
      }
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
<header className="bg-blue-600 text-white py-10">
  <div className="container mx-auto text-center mt-32"> {/* Increased mt to mt-12 */}
    <h1 className="text-4xl font-bold mb-4">{translations.title[isTamil ? 'ta' : 'en']}</h1>
    <p className="text-xl">{translations.subtitle[isTamil ? 'ta' : 'en']}</p>
  </div>
</header>






      <main className="container mx-auto py-12">
        <section className="mb-16">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="text-center mb-8"
          >
            <p className="text-lg leading-relaxed max-w-3xl mx-auto">
              {translations.description[isTamil ? 'ta' : 'en']}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={imageVariants}
            className="relative h-96 overflow-hidden rounded-lg shadow-xl"
          >
            {mediaData.carouselImages.map((image, index) => (
              <motion.div
                key={index}
                className={`absolute top-0 left-0 w-full h-full ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={image}
                  alt={`Scout Activity ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="mb-16">
          <motion.h2
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="text-3xl font-bold text-center mb-8"
          >
            {translations.activities[isTamil ? 'ta' : 'en']}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: translations.activity1, description: translations.activity1Description },
              { title: translations.activity2, description: translations.activity2Description },
              { title: translations.activity3, description: translations.activity3Description }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={mediaData.organizationImages[index]}
                  alt={activity.title[isTamil ? 'ta' : 'en']}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-2">{activity.title[isTamil ? 'ta' : 'en']}</h3>
                  <p className="text-gray-600">{activity.description[isTamil ? 'ta' : 'en']}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.h2
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="text-3xl font-bold text-center mb-8"
          >
            {translations.impact[isTamil ? 'ta' : 'en']}
          </motion.h2>
          <motion.p
            initial="hidden"
            animate={controls}
            variants={textVariants}
            className="text-lg text-center mb-8"
          >
            {translations.impactDescription[isTamil ? 'ta' : 'en']}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {translations.impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.title[isTamil ? 'ta' : 'en']}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaData.featuredStories.map((image, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img src={image} alt={`Featured Story ${index + 1}`} className="w-full h-48 object-cover" />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default WhatWeDoPage;