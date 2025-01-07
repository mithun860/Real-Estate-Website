import React from 'react';

export default function Hero() {
  return (
    <div className="relative h-[40vh] flex items-center justify-center">
      {/* Background Image Section */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        {/* Dark Overlay for Better Contrast */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Section */}
      <div className="relative text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
        <p className="text-xl leading-relaxed">
          Have questions? We're here to help! Reach out for any inquiries about
          our property listings or services.
        </p>
      </div>
    </div>
  );
}