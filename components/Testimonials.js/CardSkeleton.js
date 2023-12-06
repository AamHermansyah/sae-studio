import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'

function CardSkeleton() {
  return (
    <div className="relative flex flex-col bg-white items-center w-full max-w-[300px] p-4 pb-10 rounded-md shadow-lg mt-16">
        <div className="relative w-24 h-24 rounded-full bg-gray-200 -mt-16 overflow-hidden" />
        <div className="w-[85%]">
            <div className="mt-2 w-full h-8 rounded-full bg-gray-200" />
            <div className="mt-1 w-[80%] h-6 rounded-full bg-gray-200 mx-auto" />
            <div className="relative flex flex-col items-center mt-2">
                <FaQuoteLeft fontSize={20} className="absolute -top-[25px] left-0" />
                <FaQuoteRight fontSize={20} className="absolute -bottom-[20px] right-0" />
                <div className="w-full h-5 rounded-full bg-gray-200 mt-1" />
                <div className="w-full h-5 rounded-full bg-gray-200 mt-1" />
                <div className="w-[80%] h-5 rounded-full bg-gray-200 mt-1" />
                <div className="w-[90%] h-5 rounded-full bg-gray-200 mt-1" />
                <div className="w-[30%] h-5 rounded-full bg-gray-200 mt-1" />
            </div>
        </div>
    </div>
  )
}

export default CardSkeleton