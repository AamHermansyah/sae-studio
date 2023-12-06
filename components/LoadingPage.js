import Typewriter from 'typewriter-effect'
import { motion as m } from 'framer-motion'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { ContextApp } from '../context/contextApp'

function LoadingPage() {
    const router = useRouter()
    const context = useContext(ContextApp)
    const { loading, setLoading, transitionStartLoading } = context

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 3000)

        return () => {
            !loading && setLoading(true)
        }
    }, [router.pathname])

    const loadingAnimate = loading ?
        {
            initial: { opacity: 0, scaleY: 0 },
            animate: { opacity: 1, scaleY: 1, transition: { duration: transitionStartLoading } }
        } : { animate: { opacity: 0, scaleY: 0 } }

    return (
        <m.div
            initial={loading ? { display: 'none' } : { display: 'block' }}
            animate={loading ? { display: 'block' } : {
                display: 'none',
                transition: {
                    delay: .5
                }
            }}>
            <m.div
                variants={loadingAnimate}
                initial="initial"
                animate="animate"
                className="fixed bg-white text-gray-800 dark:bg-dark dark:text-white inset-0 flex items-center justify-center z-50">
                <m.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: .3 }}
                    className="text-2xl">
                    <Typewriter
                        options={{
                            loop: true,
                            delay: 100,
                        }}

                        onInit={(typewriter) => {
                            typewriter
                                .typeString('Welcome to SAE Studio')
                                .pauseFor(500)
                                .deleteAll()
                                .typeString('Elevate Your Digital Presence')
                                .pauseFor(1000)
                                .start();
                        }}
                    />
                </m.h2>
            </m.div>
        </m.div>
    )
}

export default LoadingPage