import Image from 'next/legacy/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion as m } from 'framer-motion'
import { socialMedia, tabDataAbout as tabData } from '../../data'
import { containerShow, itemShow, itemTranslate } from '../../animates'
import profileImage from '../../public/profile.jpg'
import { SmoothTypingText } from '../CustomText'

const description = `Welcome to SAE Studio, where creativity meets expertise! We are a dynamic team based in Garut, West Java, Indonesia, specializing in web development using JavaScript and TypeScript with frameworks like Next.js and React.js. Our developers bring a wealth of experience in crafting seamless web applications, while our design team excels in using tools like Affinity Designer, CorelDRAW, and Adobe Lightroom to create visually stunning projects. As students at Siliwangi University, Tasikmalaya, we began our coding journey at a young age, and now, as SAE Studio, we're here to collaborate with you, whether you need a cutting-edge web application or captivating design elements. Explore our showcase and let's bring your vision to life together!`;

function About() {
    const [tabActive, setTabActive] = useState("tab-1")

    return (
        <section className="p-10 relative" id="about">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">About Us</h1>
            <div className="flex flex-col md:flex-row gap-4 mt-3">
                <div className="flex-1 relative w-full aspect-square rounded-2xl overflow-hidden">
                    <Image src={profileImage} layout="fill" objectFit="cover" objectPosition="bottom center" priority />
                </div>
                <m.div
                    variants={containerShow}
                    initial="initial"
                    whileInView="animate"
                    className="flex-1 lg:px-8 md:px-4 flex items-center text-gray-800 dark:text-white">
                    <div>
                        <m.h1 variants={itemShow(.3)} className="text-2xl md:text-3xl font-bold">SAE Studio</m.h1>
                        <m.h3 variants={itemShow(.3)} className="text-primary text-xl">Web Development & Design Studio</m.h3>
                        <SmoothTypingText text={description} stagger={0.03} textStyles="text-md mt-4" />
                        <div className="flex gap-2 mt-4">
                            {socialMedia.map(social => (
                                <m.div variants={itemTranslate({ x: "100%", y: 0 }, { x: 0, y: 0 }, .3)} key={social.title}>
                                    <Link
                                        href={social.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center text-2xl w-10 h-10 rounded-full shadow-md bg-gray-800 dark:bg-white text-white dark:text-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-all duration-200">
                                        {social.icon}
                                    </Link>
                                </m.div>
                            ))}
                        </div>

                        <div className="flex flex-wrap mt-8 sm:mt-6 mb-3 gap-4">
                            {tabData
                                .buttons
                                .map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={_ => setTabActive(tab.id)}
                                        type="button"
                                        className={`${tabActive === tab.id.toLowerCase() ? "bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] text-white" : "hover:bg-slate-600 hover:bg-opacity-10 border"} flex items-center gap-2  px-4 py-2 text-md rounded-md`}>
                                        {tab.icons}
                                        {tab.title}
                                    </button>
                                ))}
                        </div>

                        <div className="aspect-square sm:aspect-video overflow-y-auto p-2 scrollbar-hide">
                            <ol className="relative border-l border-gray-700">
                                {tabData[tabActive].map((list, index) => (
                                    <li className="mb-6 ml-4" key={index}>
                                        <div className="absolute w-3 h-3 rounded-full mt-1.5 -left-1.5 border-2 border-primary dark:border-gray-200 bg-light dark:bg-primary" />
                                        <time className="mb-1 text-sm font-normal leading-none text-primary">
                                            {list.time}
                                        </time>
                                        <h3 className="text-lg font-semibold dark:text-white">
                                            {list.title}
                                        </h3>
                                        <p className="mb-4 text-base font-normal text-gray-600 dark:text-gray-400">
                                            {list.description}
                                        </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </m.div>
            </div>
        </section>
    )
}

export default About