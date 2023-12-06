import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { FiMenu } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import { itemShow, itemTranslate, navAnimation } from "../animates"
import { motion as m } from "framer-motion"
import { navigations } from "../data"
import DarkModeToggle from "./DarkModeToggle"
import useLoadingPageSettings from "../hooks/useLoadingPageSettings"

function Navbar() {
    const [navigation, setNavigation] = useState(false);

    // loading page settings
    const { onEventClick } = useLoadingPageSettings()

    const navbarRef = useRef(null)

    useEffect(() => {
        const handleEventNavbar = () => {
            const navbar = navbarRef.current
            navbar.classList.toggle("navbar-toggle", window.scrollY > 0)
        }

        // Handle scroll padding using navbar height
        const navHeight = navbarRef.current.offsetHeight
        document.documentElement.style.setProperty("--scroll-padding", `${navHeight}px`)

        window.addEventListener("scroll", handleEventNavbar)

        return () => {
            window.removeEventListener("scroll", handleEventNavbar)
        }
    }, [])

    return (
        <header
            ref={navbarRef}
            className="fixed max-w-[1500px] w-full top-0 flex items-center justify-between py-4 px-6 sm:px-8 z-10 transition-colors duration-200 ease-in-out">
            <div className="flex gap-6 items-center">
                <Link href="/" className="font-extrabold tracking-wider text-gray-800 dark:text-primary text-2xl">
                    SAE Studio
                </Link>
                <DarkModeToggle />
            </div>
            <nav className="hidden lg:flex gap-6 ml-6 font-sans font-semibold text-gray-800 dark:text-white">
                {navigations.map(list => {
                    return list.isPage && list?.href ?
                        (
                            <Link
                                href={list.href}
                                onClick={(e) => {
                                    onEventClick()
                                }}
                                key={list.id}
                                className={`${list.id === 'contact' ? 'bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] rounded-full text-white py-2 px-6' : 'p-2'} cursor-pointer`}>
                                {list.title}
                            </Link>
                        ) :
                        (
                            <a
                                href={`#${list.id}`}
                                key={list.id}
                                className={`${list.id === 'contact' ? 'bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] rounded-full text-white py-2 px-6' : 'p-2'} cursor-pointer`}>
                                {list.title}
                            </a>
                        )
                })}
            </nav>

            <div className="lg:hidden cursor-pointer" onClick={() => setNavigation(true)}>
                <FiMenu fontSize={26} />
            </div>

            <m.div
                variants={navAnimation}
                animate={navigation ? "animate" : "initial"}
                className="lg:hidden fixed inset-0 p-10 font-bold flex flex-col items-end justify-center gap-y-1 bg-white dark:bg-dark translate-x-[100%]">
                <m.div
                    variants={itemShow(.3)}
                    className="absolute top-0 right-0 p-[22px] cursor-pointer" onClick={() => setNavigation(false)}>
                    <MdClose fontSize={28} />
                </m.div>
                {navigations.map(list => (
                    <div className="overflow-hidden" key={list.id}>
                        <m.div
                            className={`${list.id === 'contact' ? 'bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] rounded-full text-white py-2 px-6 mt-4' : 'p-2'} cursor-pointer`}
                            variants={itemTranslate({ y: "105%", x: 0 }, { y: "0%", x: 0 }, .3)}>
                            {list.isPage && list?.href ?
                                (
                                    <Link
                                        href={list.href}
                                        onClick={(e) => {
                                            onEventClick()
                                            setNavigation(false)
                                        }}>
                                        {list.title}
                                    </Link>
                                ) :
                                (
                                    <a
                                        href={`#${list.id}`}
                                        onClick={(e) => {
                                            setNavigation(false)
                                        }}>
                                        {list.title}
                                    </a>
                                )}
                        </m.div>
                    </div>
                ))}
            </m.div>
        </header>
    )
}

export default Navbar
