import React, { useRef } from 'react'
import Hero from '../components/Hero'
import Companies from '../components/Companies'
import Features from '../components/Features'
import Properties from '../components/propertiesshow'
import Steps from '../components/Steps'
import Testimonials from '../components/testimonial'
import Blog from '../components/Blog'
import BackToTopButton from '../components/BackToTopButton' // Import the button
import WhatsAppFloatingIcon from '../components/WhatsAppFloatingIcon.jsx';

const Home = () => {
  const propertyRef = useRef(null)

  return (
    <div>
      <Hero scrollToRef={propertyRef} />
      <div ref={propertyRef}>
        <Properties />
      </div>
      <Companies />
      <Features />
      <Steps />
      <Testimonials />
      <WhatsAppFloatingIcon />
      <Blog />
      <BackToTopButton />  {/* Add the button here */}
    </div>
  )
}

export default Home