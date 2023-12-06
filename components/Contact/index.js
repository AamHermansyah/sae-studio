import React, { useEffect, useRef, useState } from 'react'
import { FcInvite, FcPhoneAndroid } from "react-icons/fc"
import { MdContentCopy, MdLibraryAddCheck } from "react-icons/md"
import { AiFillWarning, AiOutlineLoading3Quarters } from "react-icons/ai"
import emailjs from "@emailjs/browser"
import { emailjs_config } from '../../mailjs_config'

function Contact() {
    const [isErrorCopyTextStatus, setIsErrorCopyTextStatus] = useState(false);
    const [copyTextAlertDisplay, setCopyTextAlertDisplay] = useState(false);
    const [sendMessageStatus, setSendMessageStatus] = useState(false);
    const [errorMessageField, setErrorMessageField] = useState('');
    const [messageAlertDisplay, setMessageAlertDisplay] = useState({
        status: 'idle',
        message: ''
    });
    const usernameRef = useRef(null);
    const subjectRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const copyText = (str) => (event) => {
        event.preventDefault();
        if (!copyTextAlertDisplay) {
            navigator.clipboard
                .writeText(str)
                .then(() => setIsErrorCopyTextStatus(false))
                .catch(() => setIsErrorCopyTextStatus(true))
                .finally(() => setCopyTextAlertDisplay(true));
        }
    }

    const sendMessage = () => {
        const username = usernameRef.current.value.trim();
        const email = emailRef.current.value.trim();
        const message = messageRef.current.value.trim();
        const subject = subjectRef.current.value.trim();

        if (username.length < 3) {
            return setErrorMessageField('Please input your name with correctly (min. 3 letter).');
        }

        const isEmailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
        if (!isEmailValid.test(email)) {
            return setErrorMessageField('Please input your email with correctly.');
        }

        if (subject.length <= 5) {
            return setErrorMessageField('Please write the subject with minimal 6 letters');
        }

        if (message.length <= 5) {
            return setErrorMessageField('Please write your message with minimal 6 letters');
        }

        setErrorMessageField('');
        setSendMessageStatus(true);

        emailjs.send(
            emailjs_config.service_key,
            emailjs_config.template_key,
            { subject, from_name: username, from_email: email, message },
            emailjs_config.public_key)
            .then(result => {
                setMessageAlertDisplay({
                    status: 'success',
                    message: 'Thanks for your message. I will get back to you within 24 hours🤗'
                });
            })
            .catch(error => {
                setMessageAlertDisplay({
                    status: 'error',
                    message: 'Sorry server is error with status code 500😥. Try again later!'
                });
            })
            .finally(() => {
                setSendMessageStatus(false);
                usernameRef.current.value = '';
                emailRef.current.value = '';
                messageRef.current.value = '';
                subjectRef.current.value = '';
            });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setCopyTextAlertDisplay(false);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        }
    }, [copyTextAlertDisplay]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMessageAlertDisplay({
                status: 'idle',
                message: ''
            })
        }, 5000);

        return () => {
            clearTimeout(timeout);
        }
    }, [messageAlertDisplay.status])

    return (
        <section className="mt-10 w-full p-4 max-w-[800px] mx-auto pb-10 relative z-[1]" id="contact">
            <div className="fixed bottom-0 left-0 flex flex-col gap-2 m-4">
                {messageAlertDisplay.status !== 'idle' && (
                    <div className="py-2 px-4 bg-white rounded-md shadow-md text-gray-800">
                        {messageAlertDisplay.message}
                    </div>
                )}
                {copyTextAlertDisplay && !isErrorCopyTextStatus && (
                    <div className="flex gap-2 items-center w-max py-2 px-4 bg-white text-gray-800 rounded-md shadow-md">
                        Success copied
                        <MdLibraryAddCheck fontSize={24} color="#43A047" />
                    </div>
                )}
                {copyTextAlertDisplay && isErrorCopyTextStatus && (
                    <div className="flex gap-2 items-center w-max py-2 px-4 bg-white text-gray-800 rounded-md shadow-md">
                        Failed copied
                        <AiFillWarning fontSize={24} color="#F44336" />
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h1 className="text-center text-2xl sm:text-3xl font-bold">Take A Coffee And Chat With Us😊</h1>
            </div>
            <div className="flex justify-center sm:justify-between flex-wrap mt-4 gap-4">
                <div
                    onClick={copyText('amzhermanzyah@gmail.com')}
                    className="animate-cursor-hovered flex gap-2 items-center py-3 px-4 bg-sky-100 text-gray-800 rounded-md cursor-pointer">
                    <FcInvite fontSize={24} />
                    amzhermanzyah@gmail.com
                    <MdContentCopy />
                </div>
                <div
                    onClick={copyText('+6282316126449')}
                    className="animate-cursor-hovered flex gap-2 items-center py-3 px-4 bg-red-100 text-gray-800 rounded-md cursor-pointer">
                    <FcPhoneAndroid fontSize={24} />
                    +62 - (82) 316 - 126 - 449
                    <MdContentCopy />
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-10">
                <div>
                    <input
                        ref={usernameRef}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name (Min. 3 letters)"
                        className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />
                </div>
                <div className="inline-flex bg-gray-100 rounded border border-gray-200">
                    <div className="inline bg-gray-200 py-2 px-4 text-gray-600">@</div>
                    <input
                        ref={emailRef}
                        name="email"
                        id="email"
                        type="email"
                        placeholder="(Ex. amzhermanzyah@gmail.com)"
                        className="w-full bg-transparent border-transparent py-1 text-gray-600 px-4 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        ref={subjectRef}
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Subject or purpose"
                        className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />
                </div>
                <div>
                    <textarea
                        ref={messageRef}
                        type="text"
                        name="message"
                        id="message"
                        placeholder="Enter your message (Min. 6 letters)"
                        className="w-full h-[250px] sm:h-[300px] bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700 resize-none"
                    />
                </div>
                {errorMessageField && <p className="font-thin text-red-500">{errorMessageField}</p>}
                <button onClick={sendMessage}
                    disabled={sendMessageStatus}
                    className="w-[160px] mx-auto py-2 px-4 rounded-md bg-primary text-white text-center disabled:cursor-not-allowed">
                    {sendMessageStatus ? <AiOutlineLoading3Quarters fontSize={24} color="#fff" className="animate-spin mx-auto" /> : 'Send a message'}
                </button>
            </div>
        </section>
    )
}

export default Contact
