import React from 'react'

function CardSkeleton() {
  return (
    <div className="w-full mb-4 aspect-square bg-gray-200 rounded-md px-2 py-4 animate-pulse">
        <div className="w-full h-[80%] bg-gray-300 rounded-md" />
        <div className="mt-4">
            <span className="block w-[60%] h-8 sm:h-6 rounded-full bg-gray-300"/>
            <span className="block w-[80%] h-8 sm:h-6 rounded-full bg-gray-300 mt-2"/>
        </div>
    </div>
  )
}

export default CardSkeleton