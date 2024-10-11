import React, { useState } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { MapPin, Users, Building, GraduationCap, Award, Heart, Clock, Flag, Compass } from 'lucide-react';

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const WhereWeWork = () => {
  const { isTamil } = useTranslation();

  const content = {
    english: {
      title: "Where We Work",
      subtitle: "Building Character, Leadership & Service Across India",
      description:
        "The Bharat Scouts and Guides, established in 1950, is India's largest voluntary youth organization. We foster leadership, citizenship, and outdoor skills in young people across the nation, preparing them to be responsible global citizens.",
      stats: [
        { icon: <Users className="w-6 h-6 mb-2" />, value: "5.7M+", label: "Active Members" },
        { icon: <Building className="w-6 h-6 mb-2" />, value: "28", label: "State Associations" },
        { icon: <GraduationCap className="w-6 h-6 mb-2" />, value: "150K+", label: "Trained Leaders" },
        { icon: <Award className="w-6 h-6 mb-2" />, value: "75+", label: "Years of Service" },
        { icon: <Heart className="w-6 h-6 mb-2" />, value: "10M+", label: "Community Service Hours" },
        { icon: <Clock className="w-6 h-6 mb-2" />, value: "1000+", label: "Training Centers" },
        { icon: <Flag className="w-6 h-6 mb-2" />, value: "650K+", label: "Annual Events" },
        { icon: <Compass className="w-6 h-6 mb-2" />, value: "15K+", label: "Local Units" }
      ],
      regions: [
        {
          name: "North India",
          states: [
            "Delhi",
            "Uttar Pradesh",
            "Punjab",
            "Haryana",
            "Himachal Pradesh",
            "Uttarakhand"
          ],
          description:
            "Our northern chapters excel in mountaineering and adventure activities, leveraging the Himalayan terrain. Key initiatives include disaster preparedness training, environmental conservation projects, and cultural exchange programs with neighboring states.",
          highlights: [
            "Annual Himalayan Trek Program",
            "Winter Leadership Camps",
            "Rural Empowerment Initiative"
          ]
        },
        {
          name: "South India",
          states: [
            "Tamil Nadu",
            "Kerala",
            "Karnataka",
            "Andhra Pradesh",
            "Telangana"
          ],
          description:
            "Southern regions are known for their innovative STEM integration in scouting activities, coastal conservation programs, and strong community service initiatives. Our unique 'Tech Scouts' program has won national recognition.",
          highlights: [
            "Coastal Cleanup Campaigns",
            "Digital Literacy Workshops",
            "Traditional Crafts Preservation"
          ]
        },
        {
          name: "East India",
          states: [
            "West Bengal",
            "Odisha",
            "Bihar",
            "Assam",
            "Jharkhand",
            "Sikkim"
          ],
          description:
            "Eastern chapters focus on preserving indigenous knowledge while promoting modern scouting practices. We run specialized programs for tribal youth, biodiversity conservation, and flood management training.",
          highlights: [
            "Tribal Youth Leadership Program",
            "Tea Garden Community Outreach",
            "Sundarbans Conservation Project"
          ]
        },
        {
          name: "West India",
          states: [
            "Maharashtra",
            "Gujarat",
            "Rajasthan",
            "Goa",
            "Madhya Pradesh"
          ],
          description:
            "Western India leads in urban scouting programs, desert ecology initiatives, and heritage conservation projects. Our 'Scout Startup' program encourages young entrepreneurs to solve community challenges.",
          highlights: [
            "Desert Survival Skills Training",
            "Heritage Site Adoption Program",
            "Urban Farming Initiative"
          ]
        }
      ],
      impactStats: {
        title: "Our Impact",
        stats: [
          "90% of our members report improved leadership skills",
          "75,000+ community service projects completed annually",
          "200+ international exchange programs",
          "300+ skill development workshops conducted monthly"
        ]
      }
    },
    tamil: {
      title: "நாங்கள் எங்கே பணிபுரிகிறோம்",
      subtitle: "இந்தியா முழுவதும் குணாதிசயம், தலைமைத்துவம் & சேவையை உருவாக்குதல்",
      description:
        "1950 ஆம் ஆண்டு நிறுவப்பட்ட பாரத சாரணர் மற்றும் சாரணிகள், இந்தியாவின் மிகப்பெரிய தன்னார்வ இளைஞர் அமைப்பாகும். நாங்கள் நாடு முழுவதும் உள்ள இளைஞர்களிடையே தலைமைத்துவம், குடியுரிமை மற்றும் வெளிப்புற திறன்களை வளர்க்கிறோம்.",
      stats: [
        { icon: <Users className="w-6 h-6 mb-2" />, value: "5.7M+", label: "செயலில் உள்ள உறுப்பினர்கள்" },
        { icon: <Building className="w-6 h-6 mb-2" />, value: "28", label: "மாநில சங்கங்கள்" },
        { icon: <GraduationCap className="w-6 h-6 mb-2" />, value: "150K+", label: "பயிற்சி பெற்ற தலைவர்கள்" },
        { icon: <Award className="w-6 h-6 mb-2" />, value: "75+", label: "சேவை ஆண்டுகள்" },
        { icon: <Heart className="w-6 h-6 mb-2" />, value: "10M+", label: "சமூக சேவை மணிநேரங்கள்" },
        { icon: <Clock className="w-6 h-6 mb-2" />, value: "1000+", label: "பயிற்சி மையங்கள்" },
        { icon: <Flag className="w-6 h-6 mb-2" />, value: "650K+", label: "வருடாந்திர நிகழ்வுகள்" },
        { icon: <Compass className="w-6 h-6 mb-2" />, value: "15K+", label: "உள்ளூர் அலகுகள்" }
      ],
      regions: [
        {
          name: "வட இந்தியா",
          states: [
            "டெல்லி",
            "உத்தரப் பிரதேசம்",
            "பஞ்சாப்",
            "ஹரியானா",
            "இமாச்சல பிரதேசம்",
            "உத்தரகண்ட்"
          ],
          description:
            "எங்கள் வடக்கு அத்தியாயங்கள் மலையேற்றம் மற்றும் சாகச நடவடிக்கைகளில் சிறந்து விளங்குகின்றன. முக்கிய முயற்சிகளில் பேரிடர் தயார்நிலை பயிற்சி, சுற்றுச்சூழல் பாதுகாப்பு திட்டங்கள் ஆகியவை அடங்கும்.",
          highlights: [
            "வருடாந்திர இமயமலை பயண திட்டம்",
            "குளிர்கால தலைமைத்துவ முகாம்கள்",
            "கிராமப்புற மேம்பாட்டு முயற்சி"
          ]
        },
        {
          name: "தென் இந்தியா",
          states: [
            "தமிழ்நாடு",
            "கேரளா",
            "கர்நாடகா",
            "ஆந்திரப் பிரதேசம்",
            "தெலங்கானா"
          ],
          description:
            "தென் இந்தியா பிராந்தியங்கள் புவிசார் அமைப்பு மற்றும் கோட்பாடுகளை சாரணர் செயல்பாடுகளுடன் ஒருங்கிணைக்கும் புதுமைப்பாடுகளுக்காக பெயர் பெற்றவை. கடலோர பாதுகாப்பு திட்டங்கள் மற்றும் சமூக சேவை முயற்சிகள் என பல்வேறு செயல்பாடுகளில் அவை முன்னிலையில் உள்ளன. எங்கள் 'டெக் சாரணர்கள்' திட்டம் தேசிய அளவில் பாராட்டப்பட்டுள்ளது.",
          highlights: [
            "கடலோர தூய்மைப் பிரச்சாரம்",
            "இணைய துல்லிய பயிற்சி",
            "பாரம்பரிய கைத்தொழில் பாதுகாப்பு"
          ]
        },
        {
          name: "கிழக்கு இந்தியா",
          states: [
            "மேற்கு வங்காளம்",
            "ஒடிசா",
            "பீகார்",
            "அசாம்",
            "ஜார்க்கண்ட்",
            "சிக்கிம்"
          ],
          description:
            "கிழக்கு பிராந்தியங்கள் பழங்குடி அறிவை காப்பாற்றுவதற்கும் நவீன சாரணர் நடைமுறைகளை ஊக்குவிக்கவும் மையமாக செயல்படுகின்றன. பழங்குடி இளைஞர்களுக்கான சிறப்பு திட்டங்கள், உயிர் வேளாண்மை மற்றும் வெள்ள மேலாண்மை பயிற்சி என்பவற்றை எங்கள் அத்தியாயங்கள் முன்னிலைப்படுத்துகின்றன.",
          highlights: [
            "பழங்குடி இளைஞர் தலைமைத்துவ திட்டம்",
            "தேயிலை தோட்ட சமூக ஒத்துழைப்பு",
            "சுந்தர்பான்ஸ் பாதுகாப்பு திட்டம்"
          ]
        },
        {
          name: "மேற்கு இந்தியா",
          states: [
            "மகாராஷ்டிரா",
            "குஜராத்",
            "ராஜஸ்தான்",
            "கோவா",
            "மத்திய பிரதேசம்"
          ],
          description:
            "மேற்கு இந்தியா நகர்ப்புற சாரணர் திட்டங்கள், பாலைவன சூழலியல் முன்முயற்சிகள், பாரம்பரிய பாதுகாப்பு திட்டங்கள் ஆகியவற்றில் முன்னிலை வகிக்கிறது. எங்கள் 'ஸ்கவுட் ஸ்டார்ட்அப்' திட்டம் இளைஞர்களை சமூக சவால்களை தீர்க்கத் தூண்டுகிறது.",
          highlights: [
            "பாலைவன மேலாண்மை திறன்கள் பயிற்சி",
            "பாரம்பரிய பாரம்பரியம் காப்பாற்றுதல்",
            "நகர்ப்புற வேளாண் முன்முயற்சி"
          ]
        }
      ],
      impactStats: {
        title: "எங்கள் தாக்கம்",
        stats: [
          "எங்கள் உறுப்பினர்களில் 90% தலைமைத்துவ திறன்களில் முன்னேற்றம் பெற்றுள்ளனர்",
          "75,000+ சமூக சேவை திட்டங்கள் ஆண்டுதோறும் நிறைவேற்றப்படுகின்றன",
          "200+ சர்வதேச பரிமாற்ற திட்டங்கள்",
          "300+ திறன் மேம்பாட்டுப் பணிகள் மாதாந்திரம் நடத்தப்படுகின்றன"
        ]
      }
    }
  };
  
  const currentContent = isTamil ? content.tamil : content.english;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 mt-32">{currentContent.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{currentContent.subtitle}</p>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          {currentContent.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {currentContent.stats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6">
              <div className="flex justify-center">{stat.icon}</div>
              <p className="text-3xl font-bold mb-2">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {currentContent.regions.map((region, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                {region.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">{isTamil ? 'மாநிலங்கள்:' : 'States:'}</h4>
                <div className="flex flex-wrap gap-2">
                  {region.states.map((state, stateIndex) => (
                    <span
                      key={stateIndex}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{region.description}</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">{isTamil ? 'முக்கிய அம்சங்கள்:' : 'Key Highlights:'}</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {region.highlights.map((highlight, hIndex) => (
                    <li key={hIndex}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-16">
        <CardHeader>
          <CardTitle>{currentContent.impactStats.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentContent.impactStats.stats.map((stat, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <p>{stat}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhereWeWork;