import React from 'react'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import Image from 'next/legacy/image'

function Card({data}) {
  return (
    <div className="relative flex flex-col bg-white items-center w-full max-w-[300px] p-4 pb-10 rounded-md shadow-lg mt-16">
        <div className="relative w-24 h-24 rounded-full bg-sky-200 -mt-16 overflow-hidden">
            <Image 
            src={`/api/imageproxy?url=${encodeURIComponent(data.image_url)}`}
            alt={`${data.name} photo profile`}
            layout="fill"
            objectFit="cover"
            />
        </div>
        <div className="text-center">
            <h1 className="text-xl font-bold mt-2 text-gray-800">{data.name}</h1>
            <h2 className="font-thin text-primary -mt-1">{data.work}</h2>
            <div className="relative text-gray-800">
                <FaQuoteLeft fontSize={20} className="absolute -top-[25px] left-0" />
                <FaQuoteRight fontSize={20} className="absolute -bottom-[20px] right-0" />
                <p className="text-sm">{data.message}</p>
            </div>
        </div>
    </div>
  )
}

export default Card