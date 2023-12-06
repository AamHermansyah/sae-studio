import React, { useCallback, useRef, useState } from 'react'
import Masonry from 'react-masonry-css'
import Card from './Card'
import { motion as m } from 'framer-motion'
import CardSkeleton from '../CardSkeleton'
import { AiOutlinePlus } from 'react-icons/ai'
import Link from 'next/link'
import Cookies from 'js-cookie'
import useInfinitePagination from '../../hooks/useInfinitePagination'
import useLoadingPageSettings from '../../hooks/useLoadingPageSettings'

const buttonFilters = [
  { title: 'All', value: 'all' },
  { title: 'Development', value: 'type == development' },
  { title: 'Design', value: 'type == design' },
]

const breakpoints = {
  default: 4,
  3000: 5,
  1700: 4,
  1000: 3,
  800: 2,
  500: 1
}

const LIMIT_PER_PAGE = 10;

function Portfolio({ isPage = false }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [whereQuery, setWhereQuery] = useState(isPage ? 'all' : 'type == development');
  const { data, isError, isLastData, loading } = useInfinitePagination("works", pageNumber, LIMIT_PER_PAGE, whereQuery);

  // loading page settings
  const { onEventClick } = useLoadingPageSettings()

  // observer ref
  const observer = useRef();
  const lastDataElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isLastData) {
        setPageNumber(previousPage => previousPage + 1);
      }
    })
    if (node) observer.current.observe(node);
  }, [loading, isLastData]);

  return (
    <m.section id="portfolio"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .3 }}
      className="mt-14 p-4 sm:p-8 relative z-[1]">
      {isPage && <h1 className="my-4 text-2xl font-bold">Our Works</h1>}
      {!isPage && (
        <div className="justify-between flex items-center mb-3">
          <h1 className="text-2xl sm:text-3xl text-gray-800 dark:text-white font-bold">Our Works</h1>
          {Cookies.get("user_token") !== undefined && (
            <div>
              <Link onClick={onEventClick} href="/create/portfolio" className="w-10 sm:w-12 h-10 sm:h-12 bg-primary text-white rounded-md flex items-center justify-center">
                <AiOutlinePlus fontSize={24} />
              </Link>
            </div>
          )}
        </div>
      )}
      <div className="mt-2 w-max flex gap-2 p-1 overflow-hidden border-2 border-gray-800 dark:border-white rounded-full font-bold mx-auto mb-3">
        {buttonFilters.map(button => (
          <button onClick={() => {
            setWhereQuery(button.value);
            setPageNumber(prev => 1);
          }}
            disabled={button.value === whereQuery}
            key={button.value}
            type="button"
            className={`${!isPage && button.value === 'all' ? 'hidden' : ''} ${whereQuery === button.value ? 'bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] text-white' : ''} dark:text-white rounded-full py-2 px-4 text-sm sm:text-base`}>
            {button.title}
          </button>
        ))}
      </div>

      {(!loading && !isError && data.length === 0) && <h1 className="text-lg text-gray-800 dark:text-white text-center mb-2">Portfolio is empty{":("}</h1>}

      {isError && <h1 className="text-lg text-gray-800 dark:text-white text-center mb-2">Something is wrong... Error code: 500</h1>}

      <div>
        <Masonry className="flex gap-2 md:gap-4" breakpointCols={breakpoints}>
          {!isError && data
            .map((portfolio, index) => {
              if (data.length === index + 1 && !isLastData && isPage) return (
                <div ref={lastDataElementRef}>
                  <Card key={index} data={portfolio} />
                </div>
              )
              return <Card key={index} data={portfolio} />
            })}

          {loading && <CardSkeleton key='loading-1' />}
          {loading && <CardSkeleton key='loading-2' />}
          {loading && <CardSkeleton key='loading-3' />}
          {loading && <CardSkeleton key='loading-4' />}
          {loading && <CardSkeleton key='loading-5' />}
        </Masonry>
        {(!isPage && !loading && data.length > 0 && !isError) && (
          <Link
            href="/portfolio"
            className="animate-cursor-hovered block w-max mx-auto mt-4 py-2 px-4 rounded-md bg-gradient-to-tr from-[#CB00FF] to-[#fafe06] text-white text-center disabled:cursor-not-allowed">
            See more
          </Link>
        )}
      </div>
    </m.section>
  )
}

export default Portfolio
