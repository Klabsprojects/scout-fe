import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../Context/TranslationContext';

const OfficeBearersPage = () => {
  const { isTamil } = useTranslation();

  const translations = {
    title: {
      en: "Office Bearers",
      ta: "அலுவலக பொறுப்பாளர்கள்"
    },
    subtitle: {
      en: "Meet the leaders of Bharat Scouts and Guides",
      ta: "பாரத சாரணர்கள் மற்றும் சாரணியர்களின் தலைவர்கள்"
    }
  };

  const officeBearers = [
    { id: 1, name: "SHRI.ANBIL MAGESH POIYAMOZHI", nameTa: "ஸ்ரீ அன்பில் மகேஷ் பொய்யாமொழி", position: "HONOURABLE EDUCATION MINISTER, STATE PRESIDENT", positionTa: "மாண்புமிகு கல்வி அமைச்சர், மாநிலத் தலைவர்", image: "/Images/Bearers/AnbilMahesh.png" },
    { id: 2, name: "DR.G.ARIVOLI", nameTa: "டாக்டர்.ஜி.அறிவோலி", position: "STATE CHIEF COMMISSIONER (I/C)", positionTa: "மாநில தலைமை ஆணையர் (I/C)", image: "/Images/Bearers/Arivoli.png" },
    { id: 3, name: "MR.S.NAGARAJA MURUGAN", nameTa: "எம்.ஆர்.எஸ்.நாகராஜா முருகன்", position: "STATE COMMISSIONER (CUB)", positionTa: "மாநில ஆணையர் ", image: "/Images/Bearers/NagarajaMurugan.png" },
    { id: 4, name: "MR.M.PALANI SAMY", nameTa: "எம்.ஆர்.எம்.பழனி சாமி", position: "STATE COMMISSIONER", positionTa: "மாநில ஆணையர்", image: "/Images/Bearers/Palanisamy.png" },
    { id: 5, name: "MR.N.MUTHU KRISHNAN", nameTa: "எம்.ஆர்.என்.முத்து கிருஷ்ணன்", position: "STATE COMMISSIONER (AR-S)", positionTa: "மாநில ஆணையர் (AR-S)", image: "/Images/Bearers/MuthuKrishnan.png" },
    { id: 6, name: "Shri Raj Kumar Kaushik", nameTa: "திரு. ராஜ் குமார் கௌசிக்", position: "Director", positionTa: "இயக்குனர்", image: "/images/raj-kumar.jpg" },
    { id: 7, name: "MRS.A.GNANA GOWRI", nameTa: "திருமதி.அ.ஞான கவுரி", position: "STATE COMMISSIONER (BULBUL)", positionTa: "மாநில ஆணையர் (புல்புல்)", image: "/Images/Bearers/GnanaGowri.png" },
    { id: 8, name: "MRS.C.AMUTHAVALLI", nameTa: "திருமதி.சி.அமுதவல்லி", position: "STATE COMMISSIONER (RA)", positionTa: "மாநில ஆணையர் ", image: "/Images/Bearers/AmuthaValli.png" },
    { id: 9, name: "DR.K.ALAMELU", nameTa: "டி.ஆர்.கே.அலமேலு", position: "STATE COMMISSIONER (AR-G)", positionTa: "மாநில ஆணையர் (AR-G)", image: "/Images/Bearers/Alamelu.png" },
    { id: 10, name: "DR.P.A.NARESH", nameTa: "டி.ஆர்.பி.ஏ.நரேஷ்", position: "STATE SECRETARY", positionTa: "மாநிலச் செயலர்", image: "/Images/Bearers/Naresh.png" },
    { id: 11, name: "DR.N.VIJAYAN", nameTa: "டாக்டர்.என்.விஜயன்", position: "STATE TREASURER", positionTa: "மாநில பொருளாளர்", image: "/Images/Bearers/Vijayan.png" },
    { id: 12, name: "SHRI.MUTHAMIZH PANDIAN", nameTa: "ஸ்ரீ.முத்தமிழ் பாண்டியன்", position: "ASSISTANT STATE SECRETARY", positionTa: "மாநில துணைச் செயலாளர்", image: "/Images/Bearers/Pandian.png" },
    { id: 13, name: "MR.J.SAKTHIVEL", nameTa: "திரு.சக்திவேல்", position: "STATE ORGANISING COMMISSIONER(S)", positionTa: "மாநில அமைப்பு ஆணையர்", image: "/Images/Bearers/Sakthivel.png" },
    { id: 14, name: "MISS.K.GOMATHI", nameTa: "செல்வி.கே.கோமதி", position: "STATE ORGANISING COMMISSIONER (G)", positionTa: "மாநில அமைப்பு ஆணையர்", image: "/Images/Bearers/Gomathi.png" },
    { id: 15, name: "MR.S.NAGARAJAN", nameTa: "எம்.ஆர்.எஸ்.நாகராஜன்", position: "STATE TRAINING COMMISSIONER(S)", positionTa: "மாநில பயிற்சி ஆணையர்", image: "/Images/Bearers/Nagarajan.png" },
    { id: 16, name: "MRS.M.TENEMOJY", nameTa: "திருமதி.எம்.டெனிமோஜி", position: "STATE TRAINING COMMISSIONER (G)", positionTa: "மாநில பயிற்சி ஆணையர் ", image: "/Images/Bearers/Tenemojy.png" },
    // Add the remaining office bearers here
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-32">
      <motion.div 
        className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10 px-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">
            {isTamil ? translations.title.ta : translations.title.en}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {isTamil ? translations.subtitle.ta : translations.subtitle.en}
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {officeBearers.map((bearer, index) => (
            <motion.div
              key={bearer.id}
              className="relative overflow-hidden rounded-lg shadow-md aspect-w-3 aspect-h-4"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.05 }}
            >
              <img
                src={bearer.image}
                alt={isTamil ? bearer.nameTa : bearer.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-lg font-semibold">
                  {isTamil ? bearer.nameTa : bearer.name}
                </h2>
                <p className="text-sm text-gray-300">
                  {isTamil ? bearer.positionTa : bearer.position}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficeBearersPage;