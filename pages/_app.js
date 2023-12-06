import '../styles/globals.css'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { ContextProvider } from '../context/contextApp'
import LoadingPage from '../components/LoadingPage'

function MyApp({ Component, pageProps, router }) {

    return (
        <>
            <Head>
                <title>SAE Studio | Web Development & Design Studio</title>
                <meta name="keywords" content="Web Development, Design, JavaScript, TypeScript, React, Next.js, Express, Affinity Designer, CorelDRAW, Adobe Lightroom" />
                <meta name="author" content="SAE Studio" />
                <meta name="copyright" content="saestudio" />
                <meta name="description" content="Explore the portfolio of SAE Studio, a passionate team specializing in web development and design. Hire us to bring your projects to life!" key="desc" />
                <meta property="og:title" content="SAE Studio | Web Development & Design Studio" />
                <meta property="og:description" content="Explore the portfolio of SAE Studio, a passionate team specializing in web development and design. Hire us to bring your projects to life!" />
                <meta property="og:image" content="/meta-image.png" />
                <meta property="og:image" itemProp="image" content="/meta-image.png" />
                <meta property="og:image:url" itemProp="image" content="/meta-image.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="300" />
                <meta property="og:image:height" content="200" />
            </Head>

            <ThemeProvider attribute="class" enableSystem={true} >
                <AnimatePresence mode="wait">
                    <ContextProvider>
                        <LoadingPage />
                        <div className="max-w-[1500px] dark:bg-dark">
                            <Component {...pageProps} key={router.pathname} />
                        </div>
                    </ContextProvider>
                </AnimatePresence>
            </ThemeProvider>
        </>
    )
}

export default MyApp
