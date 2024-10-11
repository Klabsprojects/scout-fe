import React from 'react';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';
import NavigationMenu from '../components/NavigationMenu';

const ScoutingHistoryPage = () => {
  const { isTamil } = useTranslation();

  const content = {
    en: {
      title: "The Rich History of Bharat Scouts and Guides",
      intro: "Discover the inspiring journey of Bharat Scouts and Guides, a movement that has shaped generations of young Indians.",
      section1: {
        title: "Origins and Establishment",
        content: "The scouting movement in India began in 1909, inspired by Lord Baden-Powell's vision. Bharat Scouts and Guides was officially established in 1950, merging various scouting organizations across the country.",
      },
      section2: {
        title: "Growth and Development",
        content: "Over the decades, Bharat Scouts and Guides has grown into one of the largest youth organizations in India, fostering leadership, civic responsibility, and outdoor skills among millions of young people.",
      },
      section3: {
        title: "The Guide Movement",
        content: "The Guide movement, an integral part of Bharat Scouts and Guides, was introduced in India in 1911. It has since empowered countless girls and young women, promoting gender equality and leadership.",
      },
      section4: {
        title: "Notable Achievements",
        content: "Bharat Scouts and Guides has participated in numerous national and international events, contributing significantly to disaster relief efforts and community development projects across India.",
      },
      conclusion: "Today, Bharat Scouts and Guides continues to uphold its mission of creating responsible, self-reliant citizens and fostering global brotherhood.",
    },
    ta: {
      title: "பாரத சாரணர் மற்றும் சாரணியர் இயக்கத்தின் வளமான வரலாறு",
      intro: "இளம் இந்தியர்களின் தலைமுறைகளை வடிவமைத்த பாரத சாரணர் மற்றும் சாரணியர் இயக்கத்தின் ஊக்கமளிக்கும் பயணத்தைக் கண்டறியுங்கள்.",
      section1: {
        title: "தோற்றம் மற்றும் நிறுவனம்",
        content: "இந்தியாவில் சாரணர் இயக்கம் 1909 இல் லார்ட் பேடன்-பாவெல்லின் பார்வையால் ஊக்கமளித்து தொடங்கியது. பாரத சாரணர் மற்றும் சாரணியர் 1950 இல் நாடு முழுவதும் உள்ள பல்வேறு சாரணர் அமைப்புகளை இணைத்து அதிகாரப்பூர்வமாக நிறுவப்பட்டது.",
      },
      section2: {
        title: "வளர்ச்சி மற்றும் முன்னேற்றம்",
        content: "பல தசாப்தங்களாக, பாரத சாரணர் மற்றும் சாரணியர் இந்தியாவின் மிகப்பெரிய இளைஞர் அமைப்புகளில் ஒன்றாக வளர்ந்து, லட்சக்கணக்கான இளைஞர்களிடையே தலைமைத்துவம், குடிமைப் பொறுப்பு மற்றும் வெளிப்புற திறன்களை வளர்த்துள்ளது.",
      },
      section3: {
        title: "சாரணியர் இயக்கம்",
        content: "பாரத சாரணர் மற்றும் சாரணியர் இயக்கத்தின் ஒருங்கிணைந்த பகுதியான சாரணியர் இயக்கம் 1911 இல் இந்தியாவில் அறிமுகப்படுத்தப்பட்டது. அன்றிலிருந்து எண்ணற்ற பெண்கள் மற்றும் இளம் பெண்களுக்கு அதிகாரம் அளித்து, பாலின சமத்துவம் மற்றும் தலைமைத்துவத்தை ஊக்குவித்து வருகிறது.",
      },
      section4: {
        title: "குறிப்பிடத்தக்க சாதனைகள்",
        content: "பாரத சாரணர் மற்றும் சாரணியர் பல தேசிய மற்றும் சர்வதேச நிகழ்வுகளில் பங்கேற்று, இந்தியா முழுவதும் பேரிடர் நிவாரண முயற்சிகள் மற்றும் சமூக மேம்பாட்டுத் திட்டங்களுக்கு குறிப்பிடத்தக்க பங்களிப்பை வழங்கியுள்ளது.",
      },
      conclusion: "இன்று, பாரத சாரணர் மற்றும் சாரணியர் பொறுப்புள்ள, சுய சார்புடைய குடிமக்களை உருவாக்குவதற்கும், உலகளாவிய சகோதரத்துவத்தை வளர்ப்பதற்கான தனது பணியைத் தொடர்ந்து நிலைநிறுத்தி வருகிறது.",
    }
  };

  const t = content[isTamil ? 'ta' : 'en'];

  return (
    <div className="bg-blue-50 min-h-screen p-8 pt-32">
      <NavigationMenu /> {/* Add the Navigation Menu here */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6 pt-8">{t.title}</h1>
        <p className="text-lg text-gray-700 mb-8">{t.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <img 
            src={mediaData.carouselImages[0]} 
            alt="Scouts marching" 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
          <img 
            src={mediaData.carouselImages[1]} 
            alt="Scouts in action" 
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t.section1.title}</h2>
          <p className="text-gray-700 mb-4">{t.section1.content}</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t.section2.title}</h2>
          <p className="text-gray-700 mb-4">{t.section2.content}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {mediaData.organizationImages.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Organization image ${index + 1}`} 
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t.section3.title}</h2>
          <p className="text-gray-700 mb-4">{t.section3.content}</p>
          <img 
            src={mediaData.carouselImages[2]} 
            alt="Guide activities" 
            className="w-full h-64 object-cover rounded-lg shadow-md mt-6"
          />
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t.section4.title}</h2>
          <p className="text-gray-700 mb-4">{t.section4.content}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {mediaData.featuredStories.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`Featured story ${index + 1}`} 
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        </section>

        <div className="bg-blue-100 p-6 rounded-lg shadow-md">
          <p className="text-lg text-blue-800 font-semibold">{t.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoutingHistoryPage;
