import React from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ScoutHomepage = () => {
  const { isTamil } = useTranslation();

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
    <div className="pt-20 md:pt-36">
      {/* First Page with Light Sandal Color */}
      <div className="bg-[#feeecf]">
        <header className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8"> {/* Added right padding for desktop */}
            <h1 className="text-3xl font-bold mb-4 text-left leading-tight md:leading-snug ml-5"> {/* Changed to left alignment */}
              {isTamil ? translations.title.ta : translations.title.en}
            </h1>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md ml-5" style={{ borderRadius: '8px' }}>
              {translations.learnMore[isTamil ? 'ta' : 'en']}
            </button>
          </div>
          <div className="md:w-1/2">
            <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false} showStatus={false}>
              <div>
                <img src="Images/ScoutMarch.png" alt="Scouts marching 1" className="w-full h-auto object-contain" />
              </div>
              <div>
                <img src="Images/ScoutMarch2.png" alt="Scouts marching 2" className="w-full h-auto object-contain" />
              </div>
              <div>
                <img src="Images/ScoutMarch3.png" alt="Scouts marching 3" className="w-full h-auto object-contain" />
              </div>
              <div>
                <img src="Images/ScoutMarch4.png" alt="Scouts marching 4" className="w-full h-auto object-contain" />
              </div>
            </Carousel>
          </div>
        </header>
      </div>

      {/* Featured Stories Title */}
      <section className="py-2 px-4 sm:px-6 lg:px-8 pt-7">
        <h2 className="text-2xl font-bold text-center mb-8">
          {isTamil ? translations.featuredStories.ta : translations.featuredStories.en}
        </h2>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Story 1 */}
            <div className="flex flex-col shadow-md overflow-hidden bg-green-300 w-full h-104">
              <div className="flex-shrink-0">
                <img
                  src="Images/stories1.png"
                  alt="Featured story 1"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex-grow p-4 flex items-center justify-center">
                <p className="text-lg text-white font-bold text-center">
                  {isTamil ? translations.featuredStoryTitles.story1.ta : translations.featuredStoryTitles.story1.en}
                </p>
              </div>
            </div>

            {/* Featured Story 2 */}
            <div className="flex flex-col shadow-md overflow-hidden bg-blue-300 w-full h-156">
              <div className="flex-shrink-0">
                <img
                  src="Images/stories2.png"
                  alt="Featured story 2"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex-grow p-4 flex items-center justify-center">
                <p className="text-lg text-white font-bold text-center">
                  {isTamil ? translations.featuredStoryTitles.story2.ta : translations.featuredStoryTitles.story2.en}
                </p>
              </div>
            </div>

            {/* Featured Story 3 */}
            <div className="flex flex-col shadow-md overflow-hidden bg-orange-300 w-full h-208">
              <div className="flex-shrink-0">
                <img
                  src="Images/stories3.png"
                  alt="Featured story 3"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div className="flex-grow p-4 flex items-center justify-center">
                <p className="text-lg text-white font-bold text-center">
                  {isTamil ? translations.featuredStoryTitles.story3.ta : translations.featuredStoryTitles.story3.en}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/* Updated New Organization Section with Hardcoded Images */}
    <section className="py-12 px-4 sm:px-9 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-8">
          {/* Organization Card 1 */}
          <div className="relative mb-24 md:mb-0">
            <div className="w-full">
              <img
                src="/Images/worldscout.png"
                alt="Organization 1"
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 transform translate-y-1/2 md:translate-y-2/3 bg-white shadow-md p-4 w-full md:w-3/4">
                <h2 className="text-xl font-bold mb-2 text-black">
                  {isTamil ? translations.newOrganization.title.ta : translations.newOrganization.title.en}
                </h2>
                <p className="text-sm mb-3 text-gray-800">
                  {isTamil ? translations.newOrganization.description.ta : translations.newOrganization.description.en}
                </p>
                <button className="text-sm border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition-colors">
                  {isTamil ? translations.learnMore.ta : translations.learnMore.en}
                </button>
              </div>
            </div>
          </div>
          
          {/* Organization Card 2 */}
          <div className="relative mb-24 md:mb-0">
            <div className="w-full">
              <img
                src="/Images/worldscout2.png"
                alt="Organization 2"
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 transform translate-y-1/2 md:translate-y-2/3 bg-white shadow-md p-4 w-full md:w-3/4">
                <h2 className="text-xl font-bold mb-2 text-black">
                  {isTamil ? translations.newOrganization.title.ta : translations.newOrganization.title.en}
                </h2>
                <p className="text-sm mb-3 text-gray-800">
                  {isTamil ? translations.newOrganization.description.ta : translations.newOrganization.description.en}
                </p>
                <button className="text-sm border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition-colors">
                  {isTamil ? translations.learnMore.ta : translations.learnMore.en}
                </button>
              </div>
            </div>
          </div>
          
          {/* Organization Card 3 */}
          <div className="relative mb-24 md:mb-0">
            <div className="w-full">
              <img
                src="/Images/worldscout3.png"
                alt="Organization 3"
                className="w-full h-auto object-contain"
              />
              <div className="absolute bottom-0 left-0 transform translate-y-1/2 md:translate-y-2/3 bg-white shadow-md p-4 w-full md:w-3/4">
                <h2 className="text-xl font-bold mb-2 text-black">
                  {isTamil ? translations.newOrganization.title.ta : translations.newOrganization.title.en}
                </h2>
                <p className="text-sm mb-3 text-gray-800">
                  {isTamil ? translations.newOrganization.description.ta : translations.newOrganization.description.en}
                </p>
                <button className="text-sm border border-black px-4 py-1 rounded-full hover:bg-black hover:text-white transition-colors">
                  {isTamil ? translations.learnMore.ta : translations.learnMore.en}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Latest News Section */}
    <section className="py-8 mt-8 md:mt-48">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {translations.latestNews[isTamil ? 'ta' : 'en']}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* News Item 1 */}
          <div className="flex flex-col h-full">
            <img 
              src="/Images/news1.png"
              alt="News 1"
              className="w-full h-auto object-contain mb-4"
            />
            <p className="text-sm font-semibold text-gray-700 mb-2 flex-grow">
              {translations.newsDescription[isTamil ? 'ta' : 'en']} 1.
            </p>
          </div>

          {/* News Item 2 */}
          <div className="flex flex-col h-full">
            <img 
              src="/Images/news2.png"
              alt="News 2"
              className="w-full h-auto object-contain mb-4"
            />
            <p className="text-sm font-semibold text-gray-700 mb-2 flex-grow">
              {translations.newsDescription[isTamil ? 'ta' : 'en']} 2.
            </p>
          </div>

          {/* News Item 3 */}
          <div className="flex flex-col h-full">
            <img 
              src="/Images/news3.png"
              alt="News 3"
              className="w-full h-auto object-contain mb-4"
            />
        <p className="text-sm font-semibold text-gray-700 mb-2 flex-grow">
          {translations.newsDescription[isTamil ? 'ta' : 'en']} 3.
        </p>
      </div>
    </div>
    {/* "See all news" button */}
    <div className="flex justify-center mt-8">
      <button className="bg-transparent text-black border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition font-bold">
        {translations.seeAllNews[isTamil ? 'ta' : 'en']}
      </button>
    </div>
  </div>
</section>

      {/* Watch Scouting Stories Section */}
      <section className="py-8 mt-30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {translations.watchScoutingStories[isTamil ? 'ta' : 'en']}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="text-left">
              <video
                className="w-11/12 h-48 object-cover mb-2 mx-auto"
                controls
              >
                <source src="/videos/testvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm font-semibold text-gray-700 mb-2 ml-4">
                {translations.videoDescription[isTamil ? 'ta' : 'en']} 1.
              </p>
            </div>
            <div className="text-left">
              <video
                className="w-11/12 h-48 object-cover mb-2 mx-auto"
                controls
              >
                <source src="/videos/testvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm font-semibold text-gray-700 mb-2 ml-4">
                {translations.videoDescription[isTamil ? 'ta' : 'en']} 2.
              </p>
            </div>
            <div className="text-left">
              <video
                className="w-11/12 h-48 object-cover mb-2 mx-auto"
                controls
              >
                <source src="/videos/testvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm font-semibold text-gray-700 mb-2 ml-4">
                {translations.videoDescription[isTamil ? 'ta' : 'en']} 3.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScoutHomepage;