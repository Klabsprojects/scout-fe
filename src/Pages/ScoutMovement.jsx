import React, { useState } from 'react';

const ScoutMovement = () => {
  const [hoveredCircle, setHoveredCircle] = useState(null);

  const circles = [
    { id: 'center', label: 'THE SCOUT PROMISE AND LAW', color: 'bg-purple-600', position: 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' },
    { id: 'community', label: 'COMMUNITY INVOLVEMENT', color: 'bg-blue-500', position: 'top-0 left-1/2 transform -translate-x-1/2' },
    { id: 'nature', label: 'NATURE', color: 'bg-green-600', position: 'top-1/4 left-1/4' },
    { id: 'learning', label: 'LEARNING BY DOING', color: 'bg-lime-500', position: 'top-1/4 right-1/4' },
    { id: 'progression', label: 'PERSONAL PROGRESSION', color: 'bg-pink-500', position: 'top-3/4 right-1/4' },
    { id: 'team', label: 'TEAM SYSTEM', color: 'bg-blue-700', position: 'bottom-1/4 right-1/4' },
    { id: 'support', label: 'ADULT SUPPORT', color: 'bg-red-500', position: 'bottom-1/4 left-1/4' },
    { id: 'symbolic', label: 'SYMBOLIC FRAMEWORK', color: 'bg-orange-500', position: 'top-3/4 left-1/4' },
  ];

  const hoverContent = {
    center: 'The core principles that guide the Scout movement and shape its values.',
    community: 'Engaging with and contributing to local and global communities.',
    nature: 'Connecting with and learning from the natural environment.',
    learning: 'A progressive learning journey focused on motivating and challenging an individual to continually develop, through a wide variety of learning opportunities.',
    progression: 'Personal growth and development through various stages of Scouting.',
    team: 'Working together in small groups to develop leadership and cooperation skills.',
    support: 'Guidance and mentorship provided by experienced adult volunteers.',
    symbolic: 'The use of symbols, traditions, and stories to reinforce Scout values and methods.',
  };

  return (
    <div className="relative w-full aspect-square bg-white">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className={`absolute w-1/4 h-1/4 ${circle.color} rounded-full flex items-center justify-center text-white text-center p-2 cursor-pointer ${circle.position}`}
          onMouseEnter={() => setHoveredCircle(circle.id)}
          onMouseLeave={() => setHoveredCircle(null)}
        >
          <span className="text-sm font-bold">{circle.label}</span>
        </div>
      ))}
      {circles.map((circle, index) => (
        <React.Fragment key={`line-${index}`}>
          {circles.slice(index + 1).map((otherCircle, otherIndex) => (
            <div
              key={`line-${index}-${otherIndex}`}
              className="absolute top-1/2 left-1/2 w-full h-0 border-t border-gray-300 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, -50%) rotate(${(360 / circles.length) * (index - otherIndex)}deg)`,
              }}
            />
          ))}
        </React.Fragment>
      ))}
      {hoveredCircle && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg text-sm max-w-xs z-10">
          {hoverContent[hoveredCircle]}
        </div>
      )}
    </div>
  );
};

export default ScoutMovement;