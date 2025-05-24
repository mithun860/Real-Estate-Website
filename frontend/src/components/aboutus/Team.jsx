import React from "react";
import { motion } from "framer-motion";
import Teammember from "./Teammember";
import { teamMembers } from "../../assets/data/teammemberdata";

export default function Team() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-green-50 to-white relative overflow-hidden">
      {/* Optional pattern background */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 bg-center bg-cover pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl font-bold text-green-700 mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Team
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-orange-500 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
          <motion.p
            className="text-gray-700 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            At SPLR, our success is powered by a passionate team that brings vision, creativity, and trust to everything we do.
          </motion.p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 pt-20 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-green-100 relative text-center"
            >
              {/* Profile Image */}
              <div className="w-32 h-32 border-4 border-green-400 bg-white rounded-full absolute -top-16 left-1/2 transform -translate-x-1/2 hover:shadow-green-300 hover:shadow-md transition-all duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={(e) => (e.target.src = "/fallback-user.png")}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>

              {/* Info */}
              <h3 className="text-2xl font-semibold text-green-800 mt-4 mb-2">{member.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{member.role}</p>

              {/* Socials */}
              {member.socialLinks && (
                <div className="flex justify-center space-x-4 mt-2">
                  {member.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      title={link.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-green-600 transition"
                    >
                      <i className={`fa fa-${link.icon}`} />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}