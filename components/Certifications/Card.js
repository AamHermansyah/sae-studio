import React, { useEffect, useState } from 'react'
import { motion as m, useAnimationControls } from 'framer-motion'
import { borderAnimate, scaleAnimate } from '../../animates';

function Card({ data }) {
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
                    <img
                        src={data.image_url}
                        alt={data.title}
                        className="w-full h-auto"
                    />
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