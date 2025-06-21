import React from 'react';

export default function ContactInfoItem({ icon: Icon, title, content, link }) {
  const ContentWrapper = link ? 'a' : 'div';
  const props = link ? { href: link, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <ContentWrapper
      {...props}
      className={`flex items-start gap-4 ${
        link ? 'hover:text-[#425036] transition-colors' : ''
      }`}
    >
      <div className="w-12 h-12 bg-[#425036]/10 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#425036]" />
      </div>
      <div>
        <h3
          className="text-base font-semibold mb-1"
          style={{ fontFamily: "'Queensides', serif", color: '#425036' }}
        >
          {title}
        </h3>
        <p
          className="text-gray-700 text-sm"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {content}
        </p>
      </div>
    </ContentWrapper>
  );
}
