import React from 'react';
import NavigationMenu from '../components/NavigationMenu'; // Importing NavigationMenu

const ScoutEducation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Add the NavigationMenu here */}
      <NavigationMenu />

      <h1 className="text-3xl font-bold mt-8">Scout Education</h1>
      <p className="mt-4 text-lg">This is the Scout Education page.</p>
    </div>
  );
};

export default ScoutEducation;
