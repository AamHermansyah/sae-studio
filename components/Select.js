import React, { useEffect, useRef, useState } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'
import { MdClear } from 'react-icons/md'

function Select({ value, onChange, options, label }) {
    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef()

    const removeOption = (option) => (e) => {
        e.stopPropagation()
        onChange(value.filter(item => item !== option))
    }

    const clearOptions = (e) => {
        e.stopPropagation()
        onChange([])
    }

    const selectOption = (option) => () => {
        onChange([...value, option.value])
        setIsOpen(false)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (isOpen && ref.current && !ref.current.contains(e.target) && !e.target.closest('#select')) {
            setIsOpen(false)
          }
        }
    
        document.addEventListener("mousedown", checkIfClickedOutside)
    
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [isOpen])

    return (
        <div className="relative">
            <div
            id="select"
            onClick={_ => setIsOpen(prev => !prev)}
            className="bg-gray-100 w-full min-h-[42px] p-2 pr-4 border-[.05em] border-200 flex items-center gap-[.5em] rounded outline-none cursor-pointer">
                <div className="flex gap-[.5em] flex-1 flex-wrap">
                    {value.length === 0 && <span className="text-gray-400">{label}</span>}
                    {value.map(option => (
                        <div
                        onClick={removeOption(option)}
                        key={option} 
                        className="flex items-center gap-1 w-max text-sm border-[1px] border-gray-300 rounded px-1.5 py-0.5 text-gray-700 overflow-y-hidden hover:bg-red-400 hover:text-white">
                            <span className="relative top-0.5">{option}</span>
                            <button type="button" className="text-xl">&times;</button>
                        </div>
                    ))}
                </div>
                <button 
                onClick={clearOptions}
                type="button" 
                className="bg-transparent text-gray-500 hover:text-gray-600 outline-none cursor-pointer">
                    <MdClear fontSize={24} />
                </button>
                <div className="bg-gray-600 self-stretch w-[.05em]" />
                <div className="text-gray-500 hover:text-gray-600">
                    <BsCaretDownFill fontSize={20} />
                </div>
            </div>
            <ul 
            ref={ref}
            className={`${isOpen ? '' : 'hidden'} absolute bg-gray-100 max-h-[15em] overflow-y-auto border-[.05em] border-gray-300 rounded w-full left-0 top-[110%] z-10`}>
                {options.map(option => (
                    <li 
                    onClick={selectOption(option)}
                    key={option.value} 
                    className={`${value.includes(option.value) ? 'hidden' : ''} px-6 py-2 hover:bg-primary hover:text-white cursor-pointer text-gray-800`}>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Select