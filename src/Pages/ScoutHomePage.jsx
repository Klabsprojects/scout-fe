import React, { useEffect, useCallback, useState } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import mediaData from '../MediaData.json';
import { Link } from 'react-router-dom';

import './TamilFont.css';

const ScoutHomepage = () => {
  const { isTamil } = useTranslation();
  const [expandedCards, setExpandedCards] = useState({});
  const [showAllNews, setShowAllNews] = useState(false);

  const smoothScroll = useCallback((e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', smoothScroll));
    return () => links.forEach(link => link.removeEventListener('click', smoothScroll));
  }, [smoothScroll]);

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
        ta: "கிழக்கு மண்டல திரளணி  "
      },
      story3: {
        en: "State Special Rally North Zone",
        ta: "மாநில சிறப்பு திரளணி வடக்கு மண்டலம்  "
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
    }
  };

  const FadeInSection = ({ children }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
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
      description: "Chaturtha Charan / Heerak Bunk Selection Camps are important events of Scouting in India. These camps are considered high-level exams for senior scouts.Participants are rigorously tested on their scouting skills, leadership qualities, community service and knowledge of environmental protection.",
      descriptionTa: "சதுர்த்த சரண் / ஹீரக் பங்க் தேர்வு முகாம்கள் என்பது இந்திய சாரணர் இயக்கத்தின் முக்கியமான நிகழ்வுகளாகும். இந்த முகாம்கள் மூத்த சாரணர்களுக்கான உயர்நிலை தேர்வுகளாக கருதப்படுகின்றன.பங்கேற்பாளர்கள் தங்கள் சாரணர் திறன்கள், தலைமைத்துவ பண்புகள், சமூக சேவை மற்றும் சுற்றுச்சூழல் பாதுகாப்பு பற்றிய அறிவு ஆகியவற்றில் கடுமையாக சோதிக்கப்படுகிறார்கள்."
    },
    {
      title: "World Thought Day -2024",
      titleTa: "உலக சிந்தனை நாள் -2024",
      description: "World Thought Day-2024 is an important event for India Scouts and Scout Movement. Celebrated every year on 22nd February, the day emphasizes the global brotherhood of scouts. On this day, scouts and scouts across India engage in activities promoting environmental protection and peace.",
      descriptionTa: "உலக சிந்தனை நாள் -2024 ஆனது பாரத சாரணர் மற்றும் சாரணியர் இயக்கத்தின் முக்கிய நிகழ்வாகும். ஒவ்வொரு ஆண்டும் பிப்ரவரி 22 அன்று கொண்டாடப்படும் இந்த நாள், உலகளாவிய சாரணர் சகோதரத்துவத்தை வலியுறுத்துகிறது.இந்த நாளில், இந்தியா முழுவதும் உள்ள சாரணர்கள் மற்றும் சாரணியர்கள் சுற்றுச்சூழல் பாதுகாப்பு மற்றும் அமைதியை ஊக்குவிக்கும் செயல்பாடுகளில் ஈடுபடுவார்கள்.=."
    }
  ];

  const newsCards = newsContent.map((news, index) => (
    <FadeInSection key={index}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="relative pt-[75%]">
          <img
            src={mediaData.newsImages[index % mediaData.newsImages.length]}
            alt={`Latest news ${index + 1}`}
            className="absolute top-0 left-0 w-full h-full object-contain"
          />
        </div>
        <div className="p-6 flex-grow">
          <h3 className={`text-base md:text-lg font-bold mb-3 ${isTamil ? 'tamil-font' : ''}`}>
            {isTamil ? news.titleTa : news.title}
          </h3>
          <p className={`text-sm md:text-base text-gray-600 mb-4 ${isTamil ? 'tamil-font' : ''}`}>
            {expandedCards[index] ? (isTamil ? news.descriptionTa : news.description) : 
              (isTamil ? news.descriptionTa.slice(0, 100) + "..." : news.description.slice(0, 100) + "...")}
          </p>
          <button 
            onClick={() => toggleCardExpansion(index)} 
            className={`text-blue-600 hover:underline font-semibold ${isTamil ? 'tamil-font' : ''}`}
          >
            {expandedCards[index] 
              ? translations.readLess[isTamil ? 'ta' : 'en']
              : translations.readMore[isTamil ? 'ta' : 'en']}
          </button>
        </div>
      </div>
    </FadeInSection>
  ));

  return (
    <div className={`pt-20 md:pt-34 ${isTamil ? 'tamil-font' : ''}`}>
      {/* Hero Section */}
      <section className="bg-[#feeecf] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <FadeInSection>
                <h1 className={`font-bold mb-6 text-left leading-tight ${
                  isTamil 
                    ? 'text-2xl md:text-3xl lg:text-4xl tamil-hero-title' 
                    : 'text-3xl md:text-4xl lg:text-5xl'
                }`}>
                  {isTamil ? translations.title.ta : translations.title.en}
                </h1>
                <Link to="/whoweare">
                  <button className={`bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
                    isTamil ? 'text-base' : 'text-lg'
                  }`}>
                    {translations.learnMore[isTamil ? 'ta' : 'en']}
                  </button>
                </Link>
              </FadeInSection>
            </div>
            <div className="md:w-1/2">
              <FadeInSection>
                <Carousel 
                  autoPlay 
                  infiniteLoop 
                  interval={5000} 
                  showThumbs={false} 
                  showStatus={false} 
                  transitionTime={1000}
                  className="rounded-lg shadow-2xl overflow-hidden"
                >
                  {mediaData.carouselImages.map((image, index) => (
                    <div key={index}>
                      <img src={image} alt={`Scouts marching ${index + 1}`} className="w-full h-auto object-cover" />
                    </div>
                  ))}
                </Carousel>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>
{/* Featured Stories Section */}
<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="container mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isTamil ? translations.featuredStories.ta : translations.featuredStories.en}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaData.featuredStories.map((image, index) => (
              <FadeInSection key={index}>
                <div className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${index === 0 ? 'bg-green-300' : index === 1 ? 'bg-blue-300' : 'bg-orange-300'}`}>
                  <img
                    src={image}
                    alt={`Featured story ${index + 1}`}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-base md:text-lg text-white font-bold text-center">
                      {isTamil ? translations.featuredStoryTitles[`story${index + 1}`].ta : translations.featuredStoryTitles[`story${index + 1}`].en}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
              {isTamil ? translations.latestNews.ta : translations.latestNews.en}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsCards.slice(0, showAllNews ? 6 : 3)}
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={() => setShowAllNews(!showAllNews)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
            >
              {showAllNews 
                ? (isTamil ? "குறைவாகக் காட்டு" : "Show Less") 
                : translations.seeAllNews[isTamil ? 'ta' : 'en']}
            </button>
          </div>
        </div>
      </section>

      {/* Scouting Stories Video Section */}
      <section className="py-16 px-4 sm:px-9 bg-white">
        <div className="container mx-auto">
          <FadeInSection>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              {isTamil ? translations.watchScoutingStories.ta : translations.watchScoutingStories.en}
            </h2>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <FadeInSection key={index}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-w-16 aspect-h-9">
                    <video
                      controls
                      className="w-full h-full object-cover"
                      poster={`/api/placeholder/640/360?text=Video ${index}`}
                    >
                     <source src={mediaData.whoWeAre.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="p-4 bg-gray-100">
                    <p className="font-semibold text-sm">
                      {translations.videoDescription[isTamil ? 'ta' : 'en']} {index}
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