import React from 'react';
import { Book, GraduationCap, Users } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import NavigationMenu from '../components/NavigationMenu';

export default function ScoutEducation() {
  const { isTamil } = useTranslation();

  return (
    <div className="relative w-full">
      {/* Hero Image Section */}
      <div className="relative w-full mt-16 sm:mt-24 md:mt-32 lg:mt-38 overflow-hidden">
        <img
          src="Images/ScoutMarch2.png"
          alt="Scout Education Hero"
          className="w-full h-auto max-h-[600px] object-cover"
        />
      </div>

      {/* Navigation Menu Below the Image */}
      <NavigationMenu />

      <div className="max-w-7xl mx-auto px-4 mt-16">
        {/* First Section: Image Left, Text Right */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <img
            src="Images/education1.png"
            alt="Scout Education"
            className="w-full md:w-1/2 h-auto object-cover mb-8 md:mb-0 md:mr-8"
          />
          <div className="md:w-1/2">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4">
              {isTamil ? 'ஆராய்ச்சி கல்வி' : 'Scout Education'}
            </h1>
            <p className="text-gray-600 mb-4">
              {isTamil
                ? 'ஆராய்ச்சி கல்வி இளைஞர்களை உலகளாவிய குடிமக்களாக வளர்க்கிறது, அவர்களுக்கு வாழ்க்கைத் திறன்களை வழங்குகிறது மற்றும் சமூகத்தில் நேர்மறையான மாற்றத்தை ஊக்குவிக்கிறது.சாரணர் கல்வி இளைஞர்களை உலகளாவிய குடிமக்களாக வளர்த்து, அவர்களுக்கு வாழ்க்கைத் திறன்களை அளித்து, சமூகத்தில் நேர்மறையான மாற்றத்தை ஊக்குவிக்கிறது. சாரணர்களின் முறைசாரா கல்வி அணுகுமுறை இளைஞர்களை இந்த இலட்சியங்களை செயல்படுத்தும் திறன்கள் மற்றும் திறன்களுடன் சித்தப்படுத்துவதை நோக்கமாகக் கொண்டுள்ளது. இளைஞர்கள் திட்டத்தின் மூலம், சாரணர், தீர்வுகள் சார்ந்த மற்றும் நேர்மறையான மாற்றத்தை உருவாக்குவதில் கவனம் செலுத்துவதன் மூலம் சேவையில் ஈடுபடும் இளைஞர்களை சுறுசுறுப்பான குடிமக்களாக மாற்ற உதவுகிறது. முயற்சிகள். ஒவ்வொரு புதிய தலைமுறை இளைஞர்களும் தங்கள் சமூகத்திலும் உலகிலும் தலைவர்களாகத் தங்களின் முழுத் திறனையும் உணர்ந்துகொள்ளும் வாய்ப்பைப் பெற்றிருப்பதை உறுதிசெய்யும் ஒரு கல்வி இயக்கம் இது.'
                : 'Scout education nurtures youth into global citizens, equipping them with life skills and inspiring positive change in society.Scouting’s non-formal educational approach aims to equip young people with the skills and competencies that enable these ideals. Through the Youth Programme, Scouting supports young people to become active citizens who are committed to being of service by being solutions-oriented and focused on creating positive change.Scouting promotes the growth and development of young people both as individuals and citizens through its programmes and initiatives. It is an educational movement committed to ensuring that each new generation of young people has the opportunity to realise their full potential as leaders in their community and the world'}
            </p>
          </div>
        </div>

        {/* Second Section: Text Left, Image Right */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-16">
          <img
            src="Images/education2.png"
            alt="Scout Activities"
            className="w-full md:w-1/2 h-auto object-cover mb-8 md:mb-0 md:ml-8"
          />
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">
              {isTamil ? 'நமது திட்டங்கள்' : 'Our Programs'}
            </h2>
            <p className="text-gray-600 mb-4">
              {isTamil
                ? 'வெவ்வேறு வயதினருக்கான பல்வேறு திட்டங்களை நாங்கள் வழங்குகிறோம், ஒவ்வொன்றும் பங்கேற்பாளர்களின் தனிப்பட்ட வளர்ச்சி மற்றும் மேம்பாட்டை வளர்ப்பதற்காக வடிவமைக்கப்பட்டுள்ளது. முறைசாரா கல்வி இயக்கமாக, இளைஞர்களின் வளர்ச்சிக்கு பங்களிக்கும் புதிய வழிகளை சாரணர் தொடர்ந்து ஆராய்ந்து வருகிறது. சாரணர்களின் தனித்துவமான கல்வி அணுகுமுறையானது, வேடிக்கையான செயல்பாடுகள், வெளிப்புற ஈடுபாடுகள் மற்றும் அர்த்தமுள்ள அனுபவங்கள் மூலம் கற்றலை உள்ளடக்கியது, இது இளைஞர்களுக்கு சவால் மற்றும் ஊக்கமளிக்கும் நம்பிக்கை, தைரியம் மற்றும் ஒரு கட்டமைக்கப்பட்ட அமைப்பிற்குள் அவர்களின் வளர்ச்சிப் பயணத்தை அனுபவிக்கிறது.சாரணர் கற்றலை மையமாகக் கொண்ட அணுகுமுறை, ஒவ்வொரு இளைஞர் உறுப்பினரும் பல மற்றும் பல்வேறு வழிகளில் வளர்ச்சியடையும் திறனைக் கொண்ட ஒரு தனித்துவமான தனிநபர் என்பதை பாராட்டுகிறது. பல்வேறு வயதினரைக் கணக்கில் எடுத்துக்கொள்வதன் மூலம், சாரணர் குறிப்பாக தனிப்பட்ட நபர்களின் கண்டுபிடிப்பு மற்றும் வளர்ச்சியைத் தூண்டுவதற்காக வடிவமைக்கப்பட்டுள்ளது.'
                : 'We offer various programs for different age groups, each designed to foster personal growth and development of the participants.As a non-formal educational Movement, Scouting continues to explore new ways that contribute to the development of young people. Scouting’s unique educational approach includes learning through fun activities, outdoor engagements, and meaningful experiences that challenge and encourage young people to gain confidence, courage, and enjoy their journey of growth within a structured system.Scoutings learner-centred approach appreciates that each youth member is a unique individual who has the potential to develop in many and different ways. By taking into account various age groups, Scouting is specifically designed to stimulate the discovery and development of individuals at their own pace.'}
            </p>
          </div>
        </div>

        {/* Horizontal Card Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-16">
          <p className="text-gray-600 mb-4">
            {isTamil
              ? 'ஆராய்ச்சி கல்வி என்பது வெறும் புத்தகங்களைப் படிப்பது அல்ல. இது வாழ்க்கையை வாழ்வதற்கான ஒரு பயிற்சி.'
              : "Scout education is not just about reading books. It's a practice for living life."}
          </p>
          <div className="flex items-center">
            <Book className="w-10 h-10 text-blue-500 mr-4" />
            <p className="text-gray-700 font-semibold">
              {isTamil ? '50+ திறன்கள் கற்றுக்கொடுக்கப்படுகின்றன' : '50+ Skills Taught to Scouts'}
            </p>
          </div>
        </div>

        {/* Video Players Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { src: "videos/testvideo.mp4", title: isTamil ? "வெளிப்புற திறன்கள்" : "Outdoor Skills" },
            { src: "videos/testvideo.mp4", title: isTamil ? "தலைமைத்துவம்" : "Leadership" },
            { src: "videos/testvideo.mp4", title: isTamil ? "சமூக சேவை" : "Community Service" },
          ].map((video, index) => (
            <div key={index} className="flex flex-col items-center">
              <video controls className="w-full h-auto mb-4" poster="/Images/scouted-cover.png">
                <source src={video.src} type="video/mp4" />
                {isTamil
                  ? 'உங்கள் உலாவியில் வீடியோ தொகுப்பு ஆதரவு இல்லை.'
                  : 'Your browser does not support the video tag.'}
              </video>
              <p className="text-violet-700 font-semibold">{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}