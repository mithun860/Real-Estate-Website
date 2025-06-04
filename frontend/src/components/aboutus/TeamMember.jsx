import React from 'react';

const TeamMember = ({ name, position, bio, image }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-all w-full max-w-sm mx-auto">
      <div className="flex flex-col items-center">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-3 md:mb-4 object-cover"
        />
        <h3 className="text-lg md:text-xl font-semibold text-center mb-1">{name}</h3>
        <p className="text-blue-600 text-xs md:text-sm text-center mb-2 md:mb-3">{position}</p>
        <p className="text-gray-600 text-sm md:text-base text-center mb-3 md:mb-4">{bio}</p>
        {/* Removed social links */}
      </div>
    </div>
  );
};

export default TeamMember;
