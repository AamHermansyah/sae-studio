import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../firebase'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useLoadingPageSettings from '../../hooks/useLoadingPageSettings'

function Login() {
    const [loading, setLoading] = useState(false);
    const [errorMessageField, setErrorMessageField] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // loading page settings
    const { onEventClick, loading: loadingPage } = useLoadingPageSettings()

    const router = useRouter();

    const login = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const isEmailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
        if(!isEmailValid.test(email)){
            return setErrorMessageField('Please input your email with correctly.');
        }

        if(password.length < 8){
            return setErrorMessageField('Please input your password with correctly (min. 8 letter).');
        }

        setErrorMessageField('');
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            Cookies.set("user", user.email, { expires: 7 });
            Cookies.set("user_token", JSON.stringify(user.accessToken), { expires: 7});
            onEventClick()
            router.push('/');
        })
        .catch((error) => {
            if(error.code === "auth/wrong-password"){
                setErrorMessageField('Email or password is wrong. Please input with correctly!')
                return
            }
            setErrorMessageField(`${error.code}: ${error.message}`)
        })
        .finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        if(Cookies.get("user_token")){
            onEventClick()
            router.push('/')
        }
    }, []);

    if(loadingPage) return null

    return (
        <section className="flex flex-col items-center justify-center w-full h-screen min-h-[500px] p-6 max-w-[500px] mx-auto">
            <div className="mt-4">
                <h1 className="text-center text-2xl sm:text-3xl font-bold">Hello aam, hope you lucky today😊</h1>
            </div>
            <form className="flex flex-col gap-4 mt-10 w-full" onSubmit={login}>
                <div>
                    <input 
                    ref={emailRef}
                    type="email" 
                    name="email"
                    id="email" 
                    placeholder="Enter your email"
                    className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />
                </div>
                <div>
                    <input 
                    ref={passwordRef}
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Enter password" 
                    className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />
                </div>
                { errorMessageField && <p className="font-thin text-red-500">{errorMessageField}</p>}
                <button 
                onClick={login}
                disabled={loading}
                className="w-[160px] mx-auto py-2 px-4 rounded-md bg-primary text-white text-center disabled:cursor-not-allowed">
                    {loading ? <AiOutlineLoading3Quarters fontSize={24} color="#fff" className="animate-spin mx-auto" /> : 'Login'}
                </button>
            </form>
        </section>
    )
}

export default Login
