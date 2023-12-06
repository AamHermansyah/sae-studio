import { useEffect, useRef, useState } from "react"

const SelectCustomInput = ({ data, allow, onChange, label, placeholder, title }) => {
    const [isError, setIsError] = useState(false)
    const inputRef = useRef()

    const handleInput = (event) => {
        event.preventDefault()

        const input = inputRef.current.value.trim()

        if (/^([a-zA-Z]+.?[a-zA-Z]+)(,([a-zA-Z]+.?[a-zA-Z]+))*$/gi.test(input)) {
            setIsError(false)
            let arrayInput = input.split(',')
            arrayInput = Array.from(new Set([...data, ...arrayInput]))
            onChange(arrayInput)
            inputRef.current.value = ""
        } else {
            setIsError(true)
        }
    }

    useEffect(() => {
        setIsError(false)
    }, [data])

    return (
        <div className="w-full">
            {title && (
                <p className="text-lg font-bold text-gray-800 dark:text-white">{title}</p>
            )}
            <div className="flex gap-[.5em] flex-wrap py-2">
                {data.length === 0 && (
                    <div className="flex items-center gap-1 w-max bg-slate-200 dark:bg-dark border-[1px] border-slate-200 rounded px-1.5 py-0.5 text-gray-800 dark:text-white">
                        <span className="relative top-0.5">{label}</span>
                    </div>
                )}
                {data.map((tag, index) => (
                    <div
                        onClick={_ => allow && onChange(data.filter(item => item !== tag))}
                        key={index}
                        className={`${allow ? "hover:bg-red-500 dark:hover:bg-red-500" : ""} flex items-center gap-1 w-max bg-slate-200 dark:bg-dark border-[1px] border-slate-200 rounded px-1.5 py-0.5 text-gray-800 dark:text-white cursor-pointer`}>
                        <span className="relative top-0.5">{tag}</span>
                        {allow && <span className="text-xl">&times;</span>}
                    </div>
                ))}
            </div>
            {isError && (
                <p className="text-red-500">Please input the field with correctly.</p>
            )}
            {allow && (
                <form onSubmit={handleInput} className="flex justify-between gap-4 items-center">
                    <input
                        ref={inputRef}
                        type="text"
                        name="tags"
                        id="tags"
                        placeholder={placeholder || ''}
                        className="w-full bg-gray-100 border border-gray-200 rounded py-2 px-4 block focus:outline-none text-gray-700"
                    />
                    <button
                        onClick={handleInput}
                        type="button"
                        className="flex gap-1 w-max bg-primary py-2 px-4 rounded text-white">
                        Generate
                    </button>
                    <button
                        onClick={() => onChange([])}
                        type="button"
                        className="flex gap-1 w-max bg-red-500 py-2 px-4 rounded text-white">
                        Clear
                    </button>
                </form>
            )}
        </div>
    )
}

export default SelectCustomInput