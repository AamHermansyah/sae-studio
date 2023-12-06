import Image from 'next/legacy/image'
import React, { useEffect, useState } from 'react'
import { motion as m, useAnimationControls } from 'framer-motion'
import { borderAnimate, scaleAnimate } from '../../animates';

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
        <div className="w-full mb-4">
            <m.div 
            onMouseEnter={() => setOnHoverDisplay(true)}
            onMouseLeave={() => setOnHoverDisplay(false)}
            variants={borderAnimate}
            initial="initial"
            animate={controls}
            className="relative overflow-hidden group cursor-pointer border-[1px] border-gray-300 dark:border-none">
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
            </m.div>
            <div className="mt-2">
                <p className="text-sky-500 text-sm sm:text-base">{data.from}</p> 
                <p className="text-gray-800 dark:text-white sm:text-lg font-bold">{data.title}</p>
            </div>
        </div>
    )
}

export default Card