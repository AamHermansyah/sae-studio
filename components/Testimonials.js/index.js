import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import useInfinitePagination from '../../hooks/useInfinitePagination';
import useLoadingPageSettings from '../../hooks/useLoadingPageSettings';
import Card from './Card'
import CardSkeleton from './CardSkeleton';

function Testimonials() {
    const { data, loading } = useInfinitePagination("testimonials");

    // loading page settings
    const { onEventClick } = useLoadingPageSettings()

    return (
        <section className="p-8 pb-10 bg-secondary my-8" id="testimonials">
            <div>
                <div className="flex gap-4 justify-center items-center w-full mb-4">
                    <h1 className="text-3xl font-bold text-center text-white">Tastymonials</h1>
                    {Cookies.get("user_token") !== undefined && (
                        <Link onClick={onEventClick} href="/create/testimonial" className="w-10 sm:w-12 h-10 sm:h-12 bg-primary text-white rounded-md flex items-center justify-center">
                            <AiOutlinePlus fontSize={24} />
                        </Link>
                    )}
                </div>
                <p className="text-lg text-center max-w-4xl mx-auto">
                    I have become a freelancer on a renowned platform like Fiverr, receiving numerous positive 5-star reviews and testimonials that indicate client satisfaction with my work.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-4 mt-4">
                {!loading && data && data.map((client, index) => (
                    <Card data={client} key={index} />
                ))}

                {loading && <CardSkeleton key='loading-1' />}
                {loading && <CardSkeleton key='loading-2' />}
                {loading && <CardSkeleton key='loading-3' />}
                {loading && <CardSkeleton key='loading-4' />}
            </div>
        </section>
    )
}

export default Testimonials
