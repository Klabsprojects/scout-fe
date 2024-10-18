import React from 'react';
import { ChevronDown } from 'lucide-react';

const PositionBox = ({ title, subtitle, imageSrc }) => (
  <div className="bg-blue-800 p-4 rounded-lg text-center flex flex-col items-center">
    <img src={imageSrc} alt={title} className="w-16 h-16 rounded-full mb-2 object-cover" />
    <div className="font-semibold">{title}</div>
    {subtitle && <div className="text-yellow-300 text-sm mt-1">{subtitle}</div>}
  </div>
);

const OrgStructure = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-40 mb-24">
      <div className="bg-gradient-to-br from-blue-800 to-blue-500 p-8 rounded-lg text-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-300">STATE ASSOCIATION</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-3 justify-self-center">
            <PositionBox title="PRESIDENT" imageSrc="/Images/person.png" />
          </div>
          
          <div className="col-span-1 md:col-span-3 justify-self-center">
            <ChevronDown size={24} className="text-yellow-300 mx-auto mb-4" />
            <PositionBox title="VICE PRESIDENTS - 6" imageSrc="/Images/person.png" />
          </div>
          
          <div className="col-span-1 md:col-span-3 justify-self-center">
            <ChevronDown size={24} className="text-yellow-300 mx-auto mb-4" />
            <PositionBox 
              title="STATE CHIEF COMMISSIONER"
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="flex flex-col items-center">
            <PositionBox 
              title="SC (C) (S) (Ro) (AR)" 
              subtitle="H.Q. COM (S) For Definite Purpose" 
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox 
              title="ASST. STATE COMMISSIONER (S)" 
              subtitle="One ASC for every 15-20 Units" 
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="flex flex-col items-center">
            <ChevronDown size={24} className="text-red-500 mb-4" />
            <PositionBox title="TREASURER" imageSrc="/Images/person.png" />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox title="STATE SECRETARY" imageSrc="/Images/person.png" />
            <ChevronDown size={24} className="text-blue-300 my-4" />
            <PositionBox title="JOINT SECRETARY" imageSrc="/Images/person.png" />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox title="ASST.SECRETARY" imageSrc="/Images/person.png" />
          </div>
          
          <div className="flex flex-col items-center">
            <PositionBox 
              title="SC (B) (G) (Ra) (AR)" 
              subtitle="H.Q. COM (G) For Definite Purpose" 
              imageSrc="/Images/person.png" 
            />
            <ChevronDown size={24} className="text-red-500 my-4" />
            <PositionBox 
              title="ASST STATE COMMISSIONER (G)" 
              subtitle="One ASC for every 15-20 Units" 
              imageSrc="/Images/person.png" 
            />
          </div>
          
          <div className="col-span-1 md:col-span-3 grid grid-cols-3 gap-8 mt-8 relative">
            <div className="flex flex-col items-center">
              <ChevronDown size={24} className="text-red-500 mb-4" />
              <PositionBox 
                title="STC (S) SOC (S) Training Counsellers" 
                imageSrc="/Images/person.png" 
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="w-full h-0.5 bg-red-500"></div>
            </div>
            <div className="flex flex-col items-center">
              <ChevronDown size={24} className="text-red-500 mb-4" />
              <PositionBox 
                title="STC (G) SOC (G) Training Counsellers" 
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