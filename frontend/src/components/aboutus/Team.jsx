import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TeamMember from "./TeamMember";
import { teamMembers } from "../../assets/data/teammemberdata";

export default function Team() {
  const { scrollY } = useScroll();
  const [selectedMember, setSelectedMember] = useState(null);

  const y1 = useTransform(scrollY, [0, 500], [0, 60]);
  const y2 = useTransform(scrollY, [0, 500], [0, 40]);
  const y3 = useTransform(scrollY, [0, 500], [0, 20]);

  return (
    <section
      className="relative py-24 px-6 sm:px-12 lg:px-24 overflow-hidden"
      style={{
        backgroundColor: "#066b70",
        fontFamily: "'Montserrat', sans-serif",
        color: "#f5f5f5",
      }}
    >
      {/* Parallax Layers */}
      <motion.div
        style={{
          position: "absolute",
          top: "-15%",
          left: "30%",
          width: "180vw",
          height: "180vh",
          background:
            "radial-gradient(circle at center, rgba(227,176,112,0.18), transparent 70%)",
          y: y1,
          translateX: "-50%",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "50%",
          filter: "blur(140px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: "-10%",
          right: "25%",
          width: "120vw",
          height: "120vh",
          background:
            "radial-gradient(circle at center, rgba(6,107,112,0.25), transparent 70%)",
          y: y2,
          translateX: "50%",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "50%",
          filter: "blur(90px)",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "40%",
          width: "130vw",
          height: "130vh",
          background:
            "radial-gradient(circle at center, rgba(227,176,112,0.12), transparent 70%)",
          y: y3,
          translateX: "-50%",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "50%",
          filter: "blur(70px)",
        }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto text-center mb-20 z-10"
      >
        <h2
          className="text-5xl font-bold mb-3"
          style={{
            color: "#e3b070",
            fontFamily: "'Queensides', serif",
            letterSpacing: "0.05em",
          }}
        >
          Meet Our Team
        </h2>
        <div
          className="mx-auto mb-6"
          style={{
            width: "70px",
            height: "4px",
            backgroundColor: "#e3b070",
            opacity: 0.8,
            borderRadius: "5px",
          }}
        />
        <p className="max-w-xl mx-auto text-lg font-medium opacity-90 text-white">
          The driving force behind SPLR’s vision, dedication, and success.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 z-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            onClick={() => setSelectedMember(member)}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-[#e3b070] shadow">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3
              className="text-xl mb-1"
              style={{ fontFamily: "'Queensides', serif", color: "#066b70" }}
            >
              {member.name}
            </h3>
            <p className="text-sm font-semibold text-[#066b70] mb-2">
              {member.position}
            </p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {member.bio}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center text-[#066b70]">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-28 h-28 object-cover rounded-full border-4 border-[#e3b070] mb-4"
              />
              <h3
                className="text-2xl font-bold mb-1"
                style={{ fontFamily: "'Queensides', serif" }}
              >
                {selectedMember.name}
              </h3>
              <p className="text-sm font-semibold mb-3 text-[#066b70]">
                {selectedMember.position}
              </p>
              <p className="text-sm text-gray-700">{selectedMember.bio}</p>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
