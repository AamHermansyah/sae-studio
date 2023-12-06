import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import { motion as m, useAnimationControls } from 'framer-motion'
import Link from 'next/link';
import { scaleAnimate } from '../../animates';

function Card({data}) {
    const [imageSize, setSmageSize] = useState({
        width: 1,
        height: 1
       });
    const [onHoverDisplay, setOnHoverDisplay] = useState(false);
    const controls = useAnimationControls();

    useEffect(() => {
        onHoverDisplay && controls.start("animate");
        !onHoverDisplay && controls.start("initial");
    }, [onHoverDisplay]);
    
    return (
        <m.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: .5, delay: .5 }}
        className="w-full mb-4">
            <div 
            onMouseEnter={() => setOnHoverDisplay(true)}
            onMouseLeave={() => setOnHoverDisplay(false)}
            className="relative overflow-hidden rounded-lg group cursor-pointer border-[1px] border-gray-300 dark:border-none">
                <m.div 
                variants={scaleAnimate}
                initial="initial"
                animate={controls}>
                    <Image
                    src={`/api/imageproxy?url=${encodeURIComponent(data.image_url)}`}
                    layout="responsive"
                    objectFit="contain"
                    alt={data.title}
                    onLoadingComplete={target => {
                        setSmageSize({
                            width: target.naturalWidth,
                            height: target.naturalHeight
                        });
                    }}
                    width={imageSize.width}
                    height={imageSize.height}
                    className="w-full"/>
                </m.div>
                <div className="hidden group-hover:flex absolute inset-0 bg-black bg-opacity-50 p-2 justify-between items-end w-full text-sm">
                    {data?.demo_url && (
                        <Link href={data.demo_url} target="_blank" rel="noreferrer" className="py-1 px-4 bg-white text-gray-800 rounded-full">
                            Demo
                        </Link>
                    )}
                    {data?.code_url && (
                        <Link href={data?.code_url} target="_blank" rel="noreferrer" className="py-1 px-4 bg-gradient-to-tr from-blue-500 to-violet-500 text-white rounded-full">
                            Code
                        </Link>
                    )}
                </div>
            </div>
            <div className="mt-2">
                <div className="flex gap-[.5em] flex-1 flex-wrap py-2">
                    {data.technologies.map(technology => (
                        <div
                        key={technology} 
                        className="flex items-center gap-1 w-max text-sm bg-primary border-[1px] border-gray-300 dark:border-primary rounded px-1.5 py-0.5 text-white overflow-y-hidden hover:bg-gray-800 cursor-pointer">
                            <span className="relative top-0.5">{technology}</span>
                        </div>
                    ))}
                </div>
                <p className="text-primary sm:text-lg font-bold">{data.category}</p>
                <p className="animate-cursor-hovered text-gray-600 dark:text-white text-sm sm:text-base">{data.title}</p>
            </div>
        </m.div>
    )
}

export default Card