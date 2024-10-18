import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext'; // Adjust the import path as needed

const PositionBox = ({ title, titleTa, subtitle, subtitleTa, imageSrc }) => {
  const { isTamil } = useTranslation();
  return (
    <div className="bg-blue-800 p-4 rounded-lg text-center flex flex-col items-center">
      <img src={imageSrc} alt={isTamil ? titleTa : title} className="w-16 h-16 rounded-full mb-2 object-cover" />
      <div className="font-semibold">{isTamil ? titleTa : title}</div>
      {subtitle && <div className="text-yellow-300 text-sm mt-1">{isTamil ? subtitleTa : subtitle}</div>}
    </div>
  );
};

const OrgStructure = () => {
  const { isTamil } = useTranslation();

  const translations = {
    stateAssociation: {
      en: "STATE ASSOCIATION",
      ta: "மாநில சங்கம்"
    },
    president: {
      en: "PRESIDENT",
      ta: "தலைவர்"
    },
    vicePresidents: {
      en: "VICE PRESIDENTS - 6",
      ta: "துணைத் தலைவர்கள் - 6"
    },
    stateChiefCommissioner: {
      en: "STATE CHIEF COMMISSIONER",
      ta: "மாநில தலைமை ஆணையர்"
    },
    scCsRoAr: {
      en: "SC (C) (S) (Ro) (AR)",
      ta: "மா.ஆ (கு) (சா) (ரோ) (உ.ஆ)"
    },
    hqComS: {
      en: "H.Q. COM (S) For Definite Purpose",
      ta: "தலைமையக ஆணையர் (சா) குறிப்பிட்ட நோக்கத்திற்காக"
    },
    asstStateCommissionerS: {
      en: "ASST. STATE COMMISSIONER (S)",
      ta: "உதவி மாநில ஆணையர் (சா)"
    },
    oneAscFor1520Units: {
      en: "One ASC for every 15-20 Units",
      ta: "ஒவ்வொரு 15-20 அலகுகளுக்கும் ஒரு உ.மா.ஆ"
    },
    treasurer: {
      en: "TREASURER",
      ta: "பொருளாளர்"
    },
    stateSecretary: {
      en: "STATE SECRETARY",
      ta: "மாநில செயலாளர்"
    },
    jointSecretary: {
      en: "JOINT SECRETARY",
      ta: "இணை செயலாளர்"
    },
    asstSecretary: {
      en: "ASST.SECRETARY",
      ta: "உதவி செயலாளர்"
    },
    scBgRaAr: {
      en: "SC (B) (G) (Ra) (AR)",
      ta: "மா.ஆ (ப) (சா) (ரா) (உ.ஆ)"
    },
    hqComG: {
      en: "H.Q. COM (G) For Definite Purpose",
      ta: "தலைமையக ஆணையர் (சா) குறிப்பிட்ட நோக்கத்திற்காக"
    },
    asstStateCommissionerG: {
      en: "ASST STATE COMMISSIONER (G)",
      ta: "உதவி மாநில ஆணையர் (சா)"
    },
    stcSocS: {
      en: "STC (S) SOC (S) Training Counsellers",
      ta: "மா.ப.ஆ (சா) மா.நி.ஆ (சா) பயிற்சி ஆலோசகர்கள்"
    },
    stcSocG: {
      en: "STC (G) SOC (G) Training Counsellers",
      ta: "மா.ப.ஆ (சா) மா.நி.ஆ (சா) பயிற்சி ஆலோசகர்கள்"
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-40 mb-24">
      <div className="bg-gradient-to-br from-blue-800 to-blue-500 p-8 rounded-lg text-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-300">
          {isTamil ? translations.stateAssociation.ta : translations.stateAssociation.en}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-3 justify-self-center">
            <PositionBox 
              title={translations.president.en} 
              titleTa={translations.president.ta} 
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="col-span-1 md:col-span-3 justify-self-center">
            <ChevronDown size={24} className="text-yellow-300 mx-auto mb-4" />
            <PositionBox 
              title={translations.vicePresidents.en} 
              titleTa={translations.vicePresidents.ta} 
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="col-span-1 md:col-span-3 justify-self-center">
            <ChevronDown size={24} className="text-yellow-300 mx-auto mb-4" />
            <PositionBox 
              title={translations.stateChiefCommissioner.en}
              titleTa={translations.stateChiefCommissioner.ta}
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="flex flex-col items-center">
            <PositionBox 
              title={translations.scCsRoAr.en}
              titleTa={translations.scCsRoAr.ta}
              subtitle={translations.hqComS.en}
              subtitleTa={translations.hqComS.ta}
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox 
              title={translations.asstStateCommissionerS.en}
              titleTa={translations.asstStateCommissionerS.ta}
              subtitle={translations.oneAscFor1520Units.en}
              subtitleTa={translations.oneAscFor1520Units.ta}
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="flex flex-col items-center">
            <ChevronDown size={24} className="text-red-500 mb-4" />
            <PositionBox 
              title={translations.treasurer.en} 
              titleTa={translations.treasurer.ta} 
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox 
              title={translations.stateSecretary.en} 
              titleTa={translations.stateSecretary.ta} 
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-blue-300 my-4" />
            <PositionBox 
              title={translations.jointSecretary.en} 
              titleTa={translations.jointSecretary.ta} 
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox 
              title={translations.asstSecretary.en} 
              titleTa={translations.asstSecretary.ta} 
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="flex flex-col items-center">
            <PositionBox 
              title={translations.scBgRaAr.en}
              titleTa={translations.scBgRaAr.ta}
              subtitle={translations.hqComG.en}
              subtitleTa={translations.hqComG.ta}
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox 
              title={translations.asstStateCommissionerG.en}
              titleTa={translations.asstStateCommissionerG.ta}
              subtitle={translations.oneAscFor1520Units.en}
              subtitleTa={translations.oneAscFor1520Units.ta}
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="col-span-1 md:col-span-3 grid grid-cols-3 gap-8 mt-8 relative">
            <div className="flex flex-col items-center">
              <ChevronDown size={24} className="text-red-500 mb-4" />
              <PositionBox 
                title={translations.stcSocS.en}
                titleTa={translations.stcSocS.ta}
                imageSrc="/Images/person.png" 
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="w-full h-0.5 bg-red-500"></div>
            </div>
            <div className="flex flex-col items-center">
              <ChevronDown size={24} className="text-red-500 mb-4" />
              <PositionBox 
                title={translations.stcSocG.en}
                titleTa={translations.stcSocG.ta}
                imageSrc="/Images/person.png" 
              />
            </div>
            <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-red-500 -translate-y-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgStructure;