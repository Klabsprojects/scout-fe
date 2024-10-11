import React, { useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import mediaData from '../MediaData.json';

const ScoutHomepage = () => {
  const { isTamil } = useTranslation();

  useEffect(() => {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-fade-in, .animate-fade-in-up').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const translations = {
    title: {
      en: (
        <>
          Creating transformative learning <br />
          experiences for young people,<br />
          everywhere.
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
        en: "World Scout Conference elects 12 voting members to the World Scout",
        ta: "உலகா சாரண மாநாடு உலக சாரணத்திற்கு 12 வாக்காளர் உறுப்பினர்களை தெரிவு செய்கிறது"
      },
      story2: {
        en: "2000 Scouts gather for the opening of the 43rd World Scout Conference",
        ta: "2000 சாரணர்கள் 43வது உலக சாரண மாநாட்டின் தொடக்கத்திற்கு கூடுகிறார்கள்"
      },
      story3: {
        en: "Ready for Life: Scouting's new brand welcomes in a new era",
        ta: "செயலுக்கு தயாராக: சாரணத்தின் புதிய பிராண்டு புதிய காலத்தைக் வரவேற்கிறது"
      }
    },
    newsDescription: {
      en: "Short description of news article",
      ta: "செய்தி கட்டுரையின் சுருக்கமான விளக்கம்"
    },
    seeAllNews: {
      en: "See All News",
      ta: "அனைத்து செய்திகளையும் காண்க"
    },
    videoDescription: {
      en: "Description of the scouting story video",
      ta: "சாரண கதை வீடியோவின் விளக்கம்"
    }
  };

  return (
    <div className="pt-20 md:pt-34 smooth-scroll">
      {/* Hero Section */}
      <div className="bg-[#feeecf]">
        <header className="container mx-auto px-4 py-12 md:py-16 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left leading-tight md:leading-snug animate-fade-in-up">
              {isTamil ? translations.title.ta : translations.title.en}
            </h1>
            <button className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-red-700 transition-colors duration-300 shadow-lg">
              {translations.learnMore[isTamil ? 'ta' : 'en']}
            </button>
          </div>
          <div className="md:w-1/2">
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
                  <img src={image} alt={`Scouts marching ${index + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                </div>
              ))}
            </Carousel>
          </div>
        </header>
      </div>

      {/* Featured Stories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            {isTamil ? translations.featuredStories.ta : translations.featuredStories.en}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaData.featuredStories.map((image, index) => (
              <div key={index} className={`flex flex-col rounded-lg shadow-lg overflow-hidden ${index === 0 ? 'bg-green-300' : index === 1 ? 'bg-blue-300' : 'bg-orange-300'} transform hover:scale-105 transition-transform duration-300 animate-fade-in-up`}>
                <div className="flex-shrink-0 h-48 md:h-64">
                  <img
                    src={image}
                    alt={`Featured story ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow p-6 flex items-center justify-center">
                  <p className="text-lg text-white font-bold text-center">
                    {isTamil ? translations.featuredStoryTitles[`story${index + 1}`].ta : translations.featuredStoryTitles[`story${index + 1}`].en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* New Organization Section */}
<section className="py-20 px-4 sm:px-9 bg-gradient-to-b from-white to-blue-50">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
      {mediaData.organizationImages.map((image, index) => (
        <div key={index} className="group animate-fade-in-up">
          <div className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-white">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={image}
                alt={`Organization ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                {isTamil ? translations.newOrganization.title.ta : translations.newOrganization.title.en}
              </h2>
              <p className="text-sm mb-4 text-gray-600">
                {isTamil ? translations.newOrganization.description.ta : translations.newOrganization.description.en}
              </p>
              <button className="text-sm bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg">
                {isTamil ? translations.learnMore.ta : translations.learnMore.en}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-100 animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{isTamil ? translations.latestNews.ta : translations.latestNews.en}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaData.newsImages.map((image, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image}
                  alt={`Latest news ${index + 1}`}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3">{translations.newsDescription[isTamil ? 'ta' : 'en']}</h3>
                  <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <a href="#" className="text-blue-600 hover:underline font-semibold">Read more</a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg">
              {isTamil ? translations.seeAllNews.ta : translations.seeAllNews.en}
            </button>
          </div>
        </div>
      </section>

{/* Scouting Stories Video Section */}
<section className="py-16 px-4 sm:px-9 bg-white animate-fade-in-up">
  <div className="container mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">
      {isTamil ? translations.watchScoutingStories.ta : translations.watchScoutingStories.en}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((index) => (
        <div key={index} className="rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-w-16 aspect-h-9">
            <video controls className="w-full h-full object-cover">
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
      ))}
    </div>
  </div>
</section>
    </div>
  );
};

export default ScoutHomepage;