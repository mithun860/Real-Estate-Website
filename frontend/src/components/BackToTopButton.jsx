import React, { useState, useEffect } from "react";

// BackToTopButton component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to check scroll position
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true); // Show button if scrolled down 300px
    } else {
      setIsVisible(false); // Hide button if at top
    }
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
      >
        ↑
      </button>
    )
  );
};

export default BackToTopButton;