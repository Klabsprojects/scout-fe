
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import mediaData from '../MediaData.json';

import './TamilFont.css';

const ScoutHomepage = () => {
  const { isTamil } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState({});
  const [showAllNews, setShowAllNews] = useState(false);

  const translations = {
    title: {
      en: (
        <>
          Creating transformative learning experiences for young people, everywhere.<br />
        </>
      ),
      ta: "எங்கும் இளைஞர்களுக்கான மாற்றமளிக்கும் கற்றல் அனுபவங்களை உருவாக்குகிறோம்."
    },
    learnMore: {
      en: "Scout Movement",
      ta: "சாரணர் இயக்கம்"
    },
    featuredStories: {
      en: "Featured Stories",
      ta: "சிறப்பு கதைகள்"
    },
    latestNews: {
      en: "Latest News",
      ta: "சமீபத்திய செய்திகள்"
    },
    watchScoutingStories: {
      en: "Watch Scouting Stories",
      ta: "சாரண கதைகளைப் பாருங்கள்"
    },
    newOrganization: {
      title: {
        en: "New Organization",
        ta: "புதிய அமைப்பு"
      },
      description: {
        en: "Scouting is the world's leading educational youth Movement empowering 57 million young people and volunteers to be active global citizens and agents of change in their communities.",
        ta: "சாரணம் உலகின் முன்னணி கல்வி இளைஞர் இயக்கமாகும், 57 மில்லியன் இளைஞர்கள் மற்றும் தொண்டர்களை செயல்பாட்டிற்காக உலகளாவிய குடிமக்களாகவும், தங்கள் சமூகங்களில் மாற்றங்களை செய்யும் ஏஜெண்ட்களாகவும் உருக்கொடுக்கிறது."
      }
    },
    featuredStoryTitles: {
      story1: {
        en: "South Zone Gathering",
        ta: "தென் மண்டல திரளணி"
      },
      story2: {
        en: "East Zone Gathering",
        ta: "கிழக்கு மண்டல திரளணி"
      },
      story3: {
        en: "State Special Rally North Zone",
        ta: "மாநில சிறப்பு திரளணி வடக்கு மண்டலம்"
      }
    },
    seeAllNews: {
      en: "See All News",
      ta: "அனைத்து செய்திகளையும் காண்க"
    },
    videoDescription: {
      en: "Description of the scouting story video",
      ta: "சாரண கதை வீடியோவின் விளக்கம்"
    },
    readMore: {
      en: "Read more",
      ta: "மேலும் படிக்க"
    },
    readLess: {
      en: "Read less",
      ta: "குறைவாக படிக்க"
    },
    showLess: {
      en: "Show Less",
      ta: "குறைவாகக் காட்டு"
    }
  };

  // Your existing newsContent array
  const newsContent = [
    {
      title: "World Thought Day 2023",
      titleTa: "உலக சிந்தனை தினம் 2023",
      description: "Scouts celebrated World Thought Day, reflecting on this year's theme of environmental sustainability. World Thought Day 2023 saw scouts from over 170 countries come together to address the pressing issue of climate change. Through various activities and projects, scouts demonstrated their commitment to creating a more sustainable future.",
      descriptionTa: "உலகெங்கிலும் உள்ள சாரணர்கள் உலக சிந்தனை தினத்தைக் கொண்டாடினர், இந்த ஆண்டின் சுற்றுச்சூழல் நிலைத்தன்மை குறித்த கருப்பொருளைப் பிரதிபலித்தனர். உலக சிந்தனை தினம் 2023 இல் 170 க்கும் மேற்பட்ட நாடுகளைச் சேர்ந்த சாரணர்கள் காலநிலை மாற்றம் என்ற அவசரமான பிரச்சினையை எதிர்கொள்ள ஒன்றிணைந்தனர். பல்வேறு செயல்பாடுகள் மற்றும் திட்டங்கள் மூலம், நிலையான எதிர்காலத்தை உருவாக்குவதற்கான தங்கள் அர்ப்பணிப்பை சாரணர்கள் வெளிப்படுத்தினர்."
    },
    {
      title: "Team Leaders Training Camp 2023",
      titleTa: "அணித் தலைவர்கள் பயிற்சி முகாம் 2023",
      description: "The Team Leaders Training Camp 2023, organized by Tamil Nadu Scouts, is a pivotal event designed to nurture and empower the next generation of scout leaders. This intensive camp brings together aspiring and current team leaders from across the state for a comprehensive leadership development program. Participants engage in workshops, team-building exercises, and practical outdoor activities that enhance their leadership skills.",
      descriptionTa: "தமிழ்நாடு சாரணர்களால் ஏற்பாடு செய்யப்பட்ட அணித் தலைவர்கள் பயிற்சி முகாம் 2023, அடுத்த தலைமுறை சாரணர் தலைவர்களை வளர்த்தெடுக்கவும் அதிகாரம் அளிக்கவும் வடிவமைக்கப்பட்ட ஒரு முக்கியமான நிகழ்வாகும். இந்த தீவிர முகாம் மாநிலம் முழுவதிலுமிருந்து ஆர்வமுள்ள மற்றும் தற்போதைய அணித் தலைவர்களை ஒரு விரிவான தலைமைத்துவ மேம்பாட்டுத் திட்டத்திற்காக ஒன்றிணைக்கிறது. பங்கேற்பாளர்கள் தங்கள் தலைமைத்துவ திறன்களை மேம்படுத்தும் பயிலரங்குகள், அணி உருவாக்கும் பயிற்சிகள் மற்றும் நடைமுறை வெளிப்புற செயல்பாடுகளில் ஈடுபடுகிறார்கள்."
    },
    {
      title: "President Award Certificate Test Camp 2023",
      titleTa: "குடியரசுத் தலைவர் விருதுச் சான்றிதழ் சோதனை முகாம் 2023",
      description: "The President Award Certificate Test Camp 2023 in Tamil Nadu is a prestigious event for senior scouts and guides aiming to achieve the highest honor in Indian Scouting. This rigorous camp, typically held annually, evaluates candidates on their leadership skills, outdoor expertise, and commitment to scouting values. Participants face various challenges designed to test their physical endurance, mental acuity, and practical scouting knowledge.",
      descriptionTa: "தமிழ்நாட்டின் குடியரசுத் தலைவர் விருது சான்றிதழ் தேர்வு முகாம் 2023 என்பது இந்திய சாரணர் துறையில் உயரிய பெருமையை அடையும் நோக்கத்தில் மூத்த சாரணர்கள் மற்றும் வழிகாட்டிகளுக்கான மதிப்புமிக்க நிகழ்வாகும். இந்த கடுமையான முகாம், பொதுவாக ஆண்டுதோறும் நடத்தப்படுகிறது, வேட்பாளர்களின் தலைமைத்துவ திறன்கள், வெளிப்புற நிபுணத்துவம் மற்றும் சாரணர் மதிப்புகளுக்கான அர்ப்பணிப்பு ஆகியவற்றை மதிப்பீடு செய்கிறது. பங்கேற்பாளர்கள் தங்கள் உடல் தாங்கும் திறன், மன கூர்மை மற்றும் நடைமுறை சாரணர் அறிவைச் சோதிக்க வடிவமைக்கப்பட்ட பல்வேறு சவால்களை எதிர்கொள்கின்றனர்."
    },
    {
      title: "Chaturtha Charan / Heerak Bunk Exam Camps",
      titleTa: "சதுர்த்த சரண் / ஹீரக் பங்க் தேர்வு முகாம்கள்",
      description: "Chaturtha Charan / Heerak Bunk Selection Camps are important events of Scouting in India. These camps are considered high-level exams for senior scouts. Participants are rigorously tested on their scouting skills, leadership qualities, community service and knowledge of environmental protection.",
      descriptionTa: "சதுர்த்த சரண் / ஹீரக் பங்க் தேர்வு முகாம்கள் என்பது இந்திய சாரணர் இயக்கத்தின் முக்கியமான நிகழ்வுகளாகும். இந்த முகாம்கள் மூத்த சாரணர்களுக்கான உயர்நிலை தேர்வுகளாக கருதப்படுகின்றன. பங்கேற்பாளர்கள் தங்கள் சாரணர் திறன்கள், தலைமைத்துவ பண்புகள், சமூக சேவை மற்றும் சுற்றுச்சூழல் பாதுகாப்பு பற்றிய அறிவு ஆகியவற்றில் கடுமையாக சோதிக்கப்படுகிறார்கள்."
    },
    {
      title: "World Thought Day -2024",
      titleTa: "உலக சிந்தனை நாள் -2024",
      description: "World Thought Day-2024 is an important event for India Scouts and Scout Movement. Celebrated every year on 22nd February, the day emphasizes the global brotherhood of scouts. On this day, scouts and scouts across India engage in activities promoting environmental protection and peace.",
      descriptionTa: "உலக சிந்தனை நாள் -2024 ஆனது பாரத சாரணர் மற்றும் சாரணியர் இயக்கத்தின் முக்கிய நிகழ்வாகும். ஒவ்வொரு ஆண்டும் பிப்ரவரி 22 அன்று கொண்டாடப்படும் இந்த நாள், உலகளாவிய சாரணர் சகோதரத்துவத்தை வலியுறுத்துகிறது. இந்த நாளில், இந்தியா முழுவதும் உள்ள சாரணர்கள் மற்றும் சாரணியர்கள் சுற்றுச்சூழல் பாதுகாப்பு மற்றும் அமைதியை ஊக்குவிக்கும் செயல்பாடுகளில் ஈடுபடுவார்கள்."
    },
    {
      title: "National Integration Camp 2024",
      titleTa: "தேசிய ஒருங்கிணைப்பு முகாம் 2024",
      description: "The National Integration Camp brings together scouts from different states of India to promote unity in diversity. The camp features cultural exchanges, joint activities, and programs that help scouts understand and appreciate India's diverse heritage. Participants learn about different customs, traditions, and languages while building lasting friendships.",
      descriptionTa: "தேசிய ஒருங்கிணைப்பு முகாம் பன்முகத்தன்மையில் ஒற்றுமையை ஊக்குவிக்க இந்தியாவின் பல்வேறு மாநிலங்களைச் சேர்ந்த சாரணர்களை ஒன்றிணைக்கிறது. இந்த முகாமில் கலாச்சார பரிமாற்றங்கள், கூட்டு நடவடிக்கைகள் மற்றும் சாரணர்கள் இந்தியாவின் பன்முக பாரம்பரியத்தைப் புரிந்துகொள்ளவும் பாராட்டவும் உதவும் நிகழ்ச்சிகள் இடம்பெறும். பங்கேற்பாளர்கள் நீடித்த நட்புறவை வளர்த்துக் கொள்வதோடு வெவ்வேறு பழக்கவழக்கங்கள், பாரம்பரியங்கள் மற்றும் மொழிகளைப் பற்றியும் கற்றுக்கொள்கிறார்கள்."
    }
  ];

  
  // Refs for scroll functionality
  const videoSectionRef = useRef(null);
  const storiesSectionRef = useRef(null);

  // Smooth scroll function
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mediaData.carouselImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const FadeInSection = ({ children, delay = 0 }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

  const toggleCardExpansion = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-[#FDFBF8] overflow-x-hidden pt-10">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen">
        {/* Background Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={activeIndex}
              src={mediaData.carouselImages[activeIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[#F5F1EA]/75 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <FadeInSection>
              <h1 className={`text-[#2C251D] mb-8 ${
                isTamil 
                  ? 'text-2xl sm:text-3xl md:text-4xl leading-tight font-normal'
                  : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium'
              }`}>
                {isTamil ? translations.title.ta : translations.title.en}
              </h1>
              <p className={`text-[#645D57] mb-12 ${
                isTamil
                  ? 'text-base sm:text-lg md:text-xl leading-relaxed'
                  : 'text-lg sm:text-xl md:text-2xl leading-relaxed'
              }`}>
                {translations.newOrganization.description[isTamil ? 'ta' : 'en']}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
  <Link to="/whoweare" className="w-full sm:w-auto">
    <button className="group relative w-full sm:w-auto overflow-hidden bg-gradient-to-r from-[#8A7968] to-[#726354] text-white px-10 py-4 rounded-full transition-all duration-500 hover:shadow-[0_8px_30px_rgb(138,121,104,0.3)]">
      <span className="absolute inset-0 bg-gradient-to-r from-[#726354] to-[#8A7968] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
      <span className="relative flex items-center justify-center gap-3 text-base sm:text-lg font-medium tracking-wide">
        {translations.learnMore[isTamil ? 'ta' : 'en']}
        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
      </span>
    </button>
  </Link>
  
  <button 
    onClick={() => scrollToSection(videoSectionRef)}
    className="group relative w-full sm:w-auto overflow-hidden border-2 border-[#8A7968] hover:border-transparent bg-transparent hover:bg-gradient-to-r from-[#8A7968] to-[#726354] text-[#8A7968] hover:text-white px-10 py-4 rounded-full transition-all duration-500 hover:shadow-[0_8px_30px_rgb(138,121,104,0.3)]"
  >
    <span className="relative flex items-center justify-center gap-3 text-base sm:text-lg font-medium tracking-wide">
      <Play className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-300" />
      <span className="transform group-hover:translate-x-1 transition-transform duration-300">Watch Video</span>
    </span>
  </button>
</div>
            </FadeInSection>
          </div>
        </div>

        ```jsx
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#FDFBF8]" />
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-[#FDFBF8] transform -skew-y-2" />
      </section>

      {/* Featured Stories Section */}
      <section ref={storiesSectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className={`text-[#2C251D] ${
                isTamil 
                  ? 'text-2xl sm:text-3xl md:text-4xl' 
                  : 'text-3xl sm:text-4xl md:text-5xl'
              }`}>
                {translations.featuredStories[isTamil ? 'ta' : 'en']}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mediaData.featuredStories.map((image, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-500">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image}
                      alt={`Featured story ${index + 1}`}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className={`text-[#2C251D] mb-3 ${
                      isTamil 
                        ? 'text-lg sm:text-xl' 
                        : 'text-xl sm:text-2xl'
                    }`}>
                      {translations.featuredStoryTitles[`story${index + 1}`][isTamil ? 'ta' : 'en']}
                    </h3>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F1EA]">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className={`text-[#2C251D] ${
                isTamil 
                  ? 'text-2xl sm:text-3xl md:text-4xl' 
                  : 'text-3xl sm:text-4xl md:text-5xl'
              }`}>
                {translations.latestNews[isTamil ? 'ta' : 'en']}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsContent.slice(0, showAllNews ? 6 : 3).map((news, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500">
                  <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img
                      src={mediaData.newsImages[index % mediaData.newsImages.length]}
                      alt={isTamil ? news.titleTa : news.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="p-6 md:p-8">
                    <h3 className={`text-[#2C251D] mb-3 ${
                      isTamil 
                        ? 'text-lg sm:text-xl' 
                        : 'text-xl sm:text-2xl'
                    }`}>
                      {isTamil ? news.titleTa : news.title}
                    </h3>
                    <p className={`text-[#645D57] mb-6 ${
                      isTamil ? 'text-sm sm:text-base' : 'text-base'
                    }`}>
                      {expandedCards[index] 
                        ? (isTamil ? news.descriptionTa : news.description)
                        : (isTamil ? news.descriptionTa.slice(0, 150) : news.description.slice(0, 150)) + "..."}
                    </p>
                    <button 
                      onClick={() => toggleCardExpansion(index)}
                      className="text-[#8A7968] text-sm font-medium flex items-center gap-2 group/btn"
                    >
                      {expandedCards[index] 
                        ? translations.readLess[isTamil ? 'ta' : 'en']
                        : translations.readMore[isTamil ? 'ta' : 'en']}
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <div className="text-center mt-12 md:mt-16">
              <button 
                onClick={() => setShowAllNews(!showAllNews)}
                className="bg-[#8A7968] hover:bg-[#726354] text-white px-8 py-4 rounded-full transition-all duration-300 text-sm sm:text-base font-medium inline-flex items-center gap-2"
              >
                {showAllNews 
                  ? (isTamil ? "குறைவாகக் காட்டு" : "Show Less")
                  : translations.seeAllNews[isTamil ? 'ta' : 'en']}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Video Stories Section */}
      <section ref={videoSectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <FadeInSection>
            <div className="text-center mb-12 md:mb-16">
              <h2 className={`text-[#2C251D] ${
                isTamil 
                  ? 'text-2xl sm:text-3xl md:text-4xl' 
                  : 'text-3xl sm:text-4xl md:text-5xl'
              }`}>
                {translations.watchScoutingStories[isTamil ? 'ta' : 'en']}
              </h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {mediaData.videos.map((video, index) => (
              <FadeInSection key={index} delay={index * 0.1}>
                <div className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-500">
                  <div className="aspect-video relative">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      preload="metadata"
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className={`text-[#2C251D] mb-2 ${
                      isTamil 
                        ? 'text-lg' 
                        : 'text-xl'
                    }`}>
                      Scout Stories {index + 1}
                    </h3>
                    <p className={`text-[#645D57] ${
                      isTamil ? 'text-sm' : 'text-base'
                    }`}>
                      {translations.videoDescription[isTamil ? 'ta' : 'en']} {index + 1}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScoutHomepage;
