import Link from 'next/link'
import React from 'react'
import { socialMedia } from '../data'

function SocialMediaFixed() {
  return (
    <section className="fixed bottom-0 right-0 z-[5]">
        <div className="flex flex-col gap-2 p-2">
            {socialMedia.map(social => (
                <div key={social.title}>
                    <Link 
                    href={social.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-center text-2xl w-12 h-12 rounded-full shadow-lg bg-primary text-white hover:bg-secondary transition-all duration-200">
                        {social.icon}
                    </Link>
                </div>
            ))}
        </div>
    </section>
  )
}

export default SocialMediaFixed