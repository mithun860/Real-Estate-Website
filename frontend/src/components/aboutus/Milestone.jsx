import React from "react";
import { motion } from "framer-motion";
import { Home, Target } from "lucide-react";
import CountUp from "./Contup";

const milestones = [
  {
    icon: Home,
    title: "Properties Listed",
    value: 100,
    suffix: "+",
    description: "Curated with care across regions",
  },
  {
    icon: Target,
    title: "Happy Clients",
    value: 400,
    suffix: "+",
    description: "Turning dreams into addresses",
  },
];

export default function Milestones() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: "#066b70",
        fontFamily: "'Montserrat', sans-serif",
        color: "#f3f3f3",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-4xl font-extrabold mb-4 drop-shadow-lg"
            style={{ fontFamily: "'Queensides', serif" }}
          >
            Our Journey So Far
          </h2>
          <div
            className="w-24 h-1 mx-auto mb-4 rounded-full"
            style={{ backgroundColor: "#DAA520", opacity: 0.95 }}
          />
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: "#e4e4e4" }}
          >
            Every number tells a story of trust, growth, and transformation.
          </p>
        </motion.div>

        {/* Milestone Cards */}
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white bg-opacity-10 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center backdrop-blur-md"
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "#DAA520" }}
                >
                  <Icon className="w-10 h-10 text-[#066b70]" />
                </div>
                <h3
                  className="text-5xl font-bold mb-2"
                  style={{ fontFamily: "'Queensides', serif", color: "#DAA520" }}
                >
                  <CountUp from={0} to={milestone.value} duration={2} separator="," />
                  {milestone.suffix}
                </h3>
                <p
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: "'Queensides', serif", color: "#ffffff" }}
                >
                  {milestone.title}
                </p>
                <p
                  className="text-md"
                  style={{ color: "#e4e4e4" }}
                >
                  {milestone.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}