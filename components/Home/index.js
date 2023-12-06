import Image from "next/legacy/image"
import Typewriter from "typewriter-effect"
import { motion as m } from "framer-motion"
import Link from "next/link"
import { containerTranslate } from "../../animates"

import { BsArrowRightShort } from "react-icons/bs"
import { GiAutoRepair } from "react-icons/gi"
import { HiCode } from "react-icons/hi"
import useLoadingPageSettings from "../../hooks/useLoadingPageSettings"
import { useRive } from "rive-react"

export default function Home() {
    const { onEventClick } = useLoadingPageSettings();
    const { rive, RiveComponent } = useRive({
        src: 'girl.riv',
        autoplay: true,
        stateMachines: 'State Machine 1'
    })

    return (
        <section id="home" className="pt-24 lg:pt-4 relative z-[1]">
            <m.div
                variants={containerTranslate({ y: "100%" }, { y: 0 }, .5)}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex lg:flex-row flex-col items-center justify-center">
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="text-white min-h-[400px] lg:min-h-screen lg:max-h-[900px] w-full max-w-2xl px-6 flex justify-evenly lg:justify-center flex-col lg:flex-1 tracking-wider">
                    <m.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: .3, delay: .2 }}
                        className="font-extrabold text-gray-800 dark:text-white">
                        <h1 className="animate-cursor-hovered w-max text-5xl md:text-6xl font-extrabold">
                            Hello.. We are <br />
                            <span className="block text-5xl md:text-7xl mt-2 sm:mt-4 leading-[125%] text-transparent bg-clip-text bg-gradient-to-l from-[#CB00FF] to-[#fafe06]">
                                SAE <br className="block sm:hidden" /> Studio
                            </span>
                        </h1>
                        <h2 className="text-3xl md:text-4xl mt-2 md:mt-4 text-primary">
                            <Typewriter
                                options={{ loop: true }}
                                onInit={typewriter => {
                                    typewriter
                                        .pauseFor(2000)
                                        .typeString('Build your website')
                                        .pauseFor(1000)
                                        .deleteAll()
                                        .typeString('& make ilustration')
                                        .pauseFor(1000)
                                        .start()
                                }} />
                        </h2>
                        <p className="mt-6 font-primary text-lg sm:text-xl text-gray-800 dark:text-white">
                            We can help you for build your web application and design your project. <br className="lg:hidden" />So, let&apos;s talk!
                        </p>
                    </m.div>
                    <div className="overflow-hidden z-[5] mt-4">
                        <m.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            transition={{ duration: .3, delay: .3 }}
                            className="flex flex-wrap gap-x-4"
                        >
                            <Link href="/portfolio"
                                onClick={onEventClick}
                                className="flex gap-2 items-center mt-4 py-3 px-6 bg-secondary text-white font-bold font-primary w-max rounded-full">
                                Check Our Works
                                <GiAutoRepair fontSize={24} />
                            </Link>
                        </m.div>
                    </div>
                </m.div>
                <div className="lg:flex-[1.5] flex-1 w-full max-w-2xl flex items-center justify-center p-6">
                    <RiveComponent className="relative aspect-video w-full" />
                </div>
            </m.div>
        </section>
    )
}
