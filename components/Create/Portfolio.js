import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { handleGDImageId } from '../../utils/handleGDImageId'
import Image from 'next/legacy/image'
import { collection, addDoc } from "firebase/firestore"
import { db } from '../../firebase'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { categories, options } from '../../data'
import Select from '../../components/Select'
import useLoadingPageSettings from '../../hooks/useLoadingPageSettings'
import SelectCustomInput from '../SelectCustomInput'

function CreatePortfolio() {
    const [image_url, setImage_url] = useState('');
    const [cekImageStatus, setCekImageStatus] = useState(false);
    const [errorMessageCekImage, setErrorMessageCekImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessageField, setErrorMessageField] = useState(false);
    const [isInputDesignMode, setIsInputDesignMode] = useState(false);
    const [technologies, setTechnologies] = useState([])
    const [otherTechnologies, setOtherTechnologies] = useState([]);

    // loading settings
    const { onEventClick } = useLoadingPageSettings()

    // ref
    const titleRef = useRef(null);
    const categoryRef = useRef(null);
    const demoRef = useRef(null);
    const codeRef = useRef(null);
    const typeRef = useRef(null);

    const router = useRouter();

    const checkImageFromGD = (link) => {
        const image_url = handleGDImageId(link);
        if (!image_url) {
            setErrorMessageCekImage('Please input the link with correctly!');
            return
        }

        setImage_url(image_url);
        setCekImageStatus(true);
        setErrorMessageCekImage(false);
    }

    const postData = () => {
        const isValidImage = image_url && typeof errorMessageCekImage === "boolean";
        if (!isValidImage) {
            return setErrorMessageField('Please input the link photo from google drive with correctly!');
        }

        const title = titleRef.current.value.trim();
        const category = categoryRef.current.value.trim();
        const type = typeRef.current.value.trim();
        const demo_url = type === 'development' ? demoRef.current.value.trim() : '';
        const code_url = type === 'development' ? codeRef.current.value.trim() : '';

        if (title.length < 3) {
            return setErrorMessageField('Title must be minimal 3 letters.');
        }

        if (category.length < 3) {
            return setErrorMessageField('Category must be minimal 3 letters.');
        }

        if (technologies.length === 0) {
            return setErrorMessageField('Technologies field must be not empty.')
        }

        setErrorMessageField('');
        setLoading(true);

        const doc = {
            title,
            image_url,
            demo_url,
            code_url,
            type,
            category,
            technologies: [...technologies, ...otherTechnologies]
        }

        addDoc(collection(db, "works"), doc)
            .then(() => {
                onEventClick()
                router.push('/');
            })
            .catch((err) => {
                setErrorMessageField(`${err.code}: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (Cookies.get("user_token") === undefined) {
            onEventClick()
            router.push('/')
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center lg:h-4/5 px-2 py-6 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Create New Portfolio</h1>
            <div className="flex md:flex-row flex-col justify-center items-center lg:p-5 p-3 lg:w-4/5 w-full">
                <div className="bg-secondaryColor md:pr-3 flex flex-[0.7] w-full self-start">
                    <div className="relative flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-[300px] sm:h-420">
                        {cekImageStatus && (
                            <div className="text-primary">
                                <AiOutlineLoading3Quarters fontSize={24} className="animate-spin mx-auto" />
                                <p className="text-center text-base sm:text-lg">Checking image...</p>
                            </div>
                        )}

                        {typeof errorMessageCekImage === 'boolean' ? (
                            <Image
                                src={`/api/imageproxy?url=${encodeURIComponent(image_url)}`}
                                alt="Portfolio photo"
                                layout="fill"
                                objectFit="contain"
                                onError={e => setErrorMessageCekImage('Error link, image cannot be loaded:(')}
                                onLoad={e => setCekImageStatus(false)}
                            />) : (
                            <p className="text-red-500 text-center text-base sm:text-lg">{errorMessageCekImage}</p>
                        )}
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 md:mt-0 w-full">
                    <input
                        type="text"
                        name="destination"
                        id="destination"
                        onChange={(e) => {
                            checkImageFromGD(e.target.value);
                        }}
                        placeholder="Paste your link from Google Drive"
                        className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />

                    <input
                        ref={titleRef}
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title your portfolio"
                        className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />

                    {!isInputDesignMode && (
                        <>
                            <input
                                ref={demoRef}
                                type="text"
                                name="demo"
                                id="demo"
                                placeholder="Demo url (optional)"
                                className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                            />
                            <input
                                ref={codeRef}
                                type="text"
                                name="code"
                                id="code"
                                placeholder="Code url source (optional)"
                                className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                            />
                        </>
                    )}

                    <Select
                        options={options}
                        value={technologies}
                        label="Select technology used"
                        onChange={input => setTechnologies(input)}
                    />

                    <SelectCustomInput
                        onChange={data => setOtherTechnologies(data)}
                        data={otherTechnologies}
                        allow={true}
                        title="Other Technologies (Optional)"
                        label="Empty..."
                        placeholder="Example: react or algorithm,next,html"
                    />

                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold text-lg sm:text-xl text-gray-800 dark:text-white">Category</p>
                            <select
                                name="category"
                                id="category"
                                ref={categoryRef}
                                className="outline-none w-full bg-gray-100 border border-gray-200 rounded py-3 px-4 block focus:outline-none text-gray-700 cursor-pointer"
                            >
                                {categories.map(category => (
                                    <option key={category.value} value={category.value} className="bg-white">{category.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-6">
                            <p className="mb-2 font-semibold text-lg sm:text-xl text-gray-800 dark:text-white">Select type your portfolio</p>
                            <select
                                onChange={e => {
                                    if (e.target.value === 'development') setIsInputDesignMode(false);
                                    else setIsInputDesignMode(true);
                                }}
                                ref={typeRef}
                                name="type"
                                id="type"
                                className="outline-none w-full bg-gray-100 border border-gray-200 rounded py-3 px-4 block focus:outline-none text-gray-700 cursor-pointer"
                            >
                                <option value="development" className="bg-white">Development</option>
                                <option value="design" className="bg-white">Design</option>
                            </select>
                        </div>
                        {errorMessageField && <p className="font-thin text-red-500 mt-2">{errorMessageField}</p>}
                        <div className="text-right my-6">
                            <button
                                type="button"
                                onClick={() => {
                                    onEventClick()
                                    router.push('/portfolio')
                                }}
                                disabled={loading}
                                className="w-[160px] mx-auto py-2 px-4 rounded-md text-primary dark:text-white border-2 border-primary dark:border-white text-center disabled:cursor-not-allowed">
                                Back
                            </button>
                            <button
                                onClick={postData}
                                disabled={loading}
                                className="w-[160px] mx-auto py-2 px-4 ml-4 rounded-md bg-primary border-2 border-primary text-white text-center disabled:cursor-not-allowed">
                                {loading ? <AiOutlineLoading3Quarters fontSize={24} color="#fff" className="animate-spin mx-auto" /> : 'Add portfolio'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePortfolio