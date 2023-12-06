import React from 'react'
import About from '../components/About'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import FollowingCursor from '../components/FollowingCursor'
import Footer from '../components/Footer'
import Home from '../components/Home'
import Navbar from '../components/Navbar'
import Portfolio from '../components/Portfolio'
import Service from '../components/Service'
import SocialMediaFixed from '../components/SocialMediaFixed'
import Testimonials from '../components/Testimonials.js'
import useLoadingPageSettings from '../hooks/useLoadingPageSettings'

function HomePage() {
  // loading page settings
  const { loading } = useLoadingPageSettings()

  if (loading) return null

  return (
    <>
      <FollowingCursor />
      <SocialMediaFixed />

      <Navbar />

      <div className="relative overflow-x-clip">
        <div className="hidden dark:block gradient-03 z-[0]" />
        <Home />
      </div>

      <Service />

      <div className="relative overflow-x-clip">
        <div className="hidden dark:block gradient-02 z-[0]" />
        <Portfolio />
      </div>

      <Testimonials />
      <About />

      <div className="relative overflow-x-clip">
        <div className="hidden dark:block gradient-01 z-[0]" />
        <Certifications />
      </div>

      <div className="relative overflow-x-clip">
        <div className="hidden dark:block gradient-02 z-[0]" />
        <Contact />
      </div>

      <Footer />
    </>
  )
}

export default HomePage
