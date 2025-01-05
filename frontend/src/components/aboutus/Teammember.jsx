import React from 'react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { teamMembers } from '../../assets/data/teammemberdata';


const TeamMember = ({ name, position, bio, image, social }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-center mb-1">{name}</h3>
      <p className="text-blue-600 text-sm text-center mb-3">{position}</p>
      <p className="text-gray-600 text-center mb-4">{bio}</p>
      <div className="flex justify-center space-x-3">
        {social.linkedin && (
          <a href={social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {social.twitter && (
          <a href={social.twitter} className="text-gray-400 hover:text-blue-600 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
        )}
        {social.instagram && (
          <a href={social.instagram} className="text-gray-400 hover:text-blue-600 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
};



export default TeamMember;
