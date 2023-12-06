import React from 'react'
import { motion as m } from 'framer-motion'
import { AiOutlinePlus } from 'react-icons/ai'
import CardSkeleton from '../CardSkeleton'
import Masonry from 'react-masonry-css'
import Card from './Card'
import Link from 'next/link'
import useInfinitePagination from '../../hooks/useInfinitePagination'
import Cookies from 'js-cookie'
import useLoadingPageSettings from '../../hooks/useLoadingPageSettings'

const breakpoints = {
    default: 4,
    3000: 5,
    2000: 4,
    1500: 3,
    1000: 2,
    750: 1
}

function Certifications({ isPage }) {
    const { data, loading } = useInfinitePagination(
        "certifications", isPage ? undefined : 1, isPage ? undefined : 3
    );

    // loading page settings
    const { onEventClick } = useLoadingPageSettings()

    return (
        <section className="p-6 sm:p-8 relative z-[1]" id="certification">
            <div className="flex gap-4 justify-center items-center w-full mt-10 mb-4">
                <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-white text-center">My Certifications</h1>
                {Cookies.get("user_token") !== undefined && (
                    <Link onClick={onEventClick} href="/create/testimonial" className="w-10 sm:w-12 h-10 sm:h-12 bg-primary text-white rounded-md flex items-center justify-center">
                        <AiOutlinePlus fontSize={24} />
                    </Link>
                )}
            </div>
            <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .5, delay: .5 }}>
                <Masonry className="flex gap-2 md:gap-4" breakpointCols={breakpoints}>
                    {!loading && data && data.map((certification, index) => (
                        <Card key={index} data={certification} />
                    ))}

                    {loading && <CardSkeleton key='loading-1' />}
                    {loading && <CardSkeleton key='loading-2' />}
                    {loading && <CardSkeleton key='loading-3' />}
                </Masonry>
                {(!isPage && !loading && data.length > 2) && (
                    <Link
                        href="/certifications"
                        className="animate-cursor-hovered block w-max mx-auto mt-4 py-2 px-4 rounded-md bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] text-white text-center disabled:cursor-not-allowed">
                        See more
                    </Link>
                )}
            </m.div>
        </section>
    )
}

export default Certifications