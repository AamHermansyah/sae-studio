import Cookies from 'js-cookie'
import Link from 'next/link'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import DarkModeToggle from '../../components/DarkModeToggle'
import Footer from '../../components/Footer'
import Portfolio from '../../components/Portfolio'
import useLoadingPageSettings from '../../hooks/useLoadingPageSettings'

function PortfolioPage() {
    // loading page settings
    const { loading, onEventClick } = useLoadingPageSettings()

    if (loading) return null

    return (
        <>
            <header className="fixed w-full top-0 flex items-center justify-between bg-white dark:bg-dark py-4 px-6 sm:px-8 z-10 shadow-md">
                <div className="flex items-center gap-4">
                    <Link onClick={onEventClick} href="/" className="font-extrabold tracking-wider text-gray-800 dark:text-primary text-2xl">SAE Studio</Link>
                    <DarkModeToggle />
                </div>
                <div className="flex items-center gap-4">
                    {Cookies.get("user_token") && Cookies.get("user") && (
                        <Link onClick={onEventClick} href="/create/portfolio" className="w-10 sm:w-12 h-10 sm:h-12 bg-primary text-white rounded-md flex items-center justify-center">
                            <AiOutlinePlus fontSize={24} />
                        </Link>
                    )}
                </div>
            </header>
            <Portfolio isPage={true} key="portfolio-page" />
            <Footer />
        </>
    )
}

export default PortfolioPage
