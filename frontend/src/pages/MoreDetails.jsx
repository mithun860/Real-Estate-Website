import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const links = [
  {
    label: "📍 View Master Plan",
    url: "/masterplan.pdf",
  },
  {
    label: "📸 Photo Gallery",
    url: "https://drive.google.com/drive/folders/1bjF-W2lfE3dscXU5UiqpR0plvC-FjFXt",
  },
  {
    label: "🎥 Video Gallery",
    url: "https://drive.google.com/drive/folders/14ekX9LGXjr5GsSBuA5af5kbOdS4Fg80G",
  },
  {
    label: "📄 View Brochure",
    url: "/three-leaf-brochure.pdf",
  },
  {
    label: "💬 Chat on WhatsApp",
    url: "https://wa.me/918600315351",
  },
];

const MoreDetails = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fefaf6] to-[#fff7ef] flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-6 sm:p-10"
      >
        <h1
          className="text-2xl sm:text-3xl md:text-4xl text-center font-bold mb-8"
          style={{ fontFamily: "'Playfair Display', serif", color: "#066b70" }}
        >
          Discover More from SPLR Developers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map(({ label, url }) => (
            <motion.a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="flex items-center justify-between px-5 py-4 bg-white hover:bg-[#e3b07b]/10 text-[#066b70] rounded-xl shadow-md transition-all duration-300 font-medium text-sm sm:text-base"
            >
              <span>{label}</span>
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MoreDetails;