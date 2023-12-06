import { useTheme } from 'next-themes';
import { BsFillSunFill } from 'react-icons/bs'
import { RiMoonClearFill } from 'react-icons/ri'

const DarkModeToggle = () => {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    const handleDarkMode = () => {
        currentTheme === "light" ? setTheme("dark") : setTheme("light")
    }

    return (
        <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800 dark:text-white">
                <BsFillSunFill fontSize={24} />
            </span>
            <div className="relative inline-block w-10 align-middle select-none rounded-full">
                <input 
                onChange={handleDarkMode}
                checked={currentTheme === "dark"}
                type="checkbox"
                name="toggle" 
                id="darkmode" 
                className="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-gray-800 border-4 appearance-none cursor-pointer"/>
                <label htmlFor="darkmode" className="block h-6 overflow-hidden bg-gray-400 rounded-full cursor-pointer" />
            </div>
            <span className="font-medium text-gray-800 dark:text-white">
                <RiMoonClearFill fontSize={24} />
            </span>
        </div>
    )
}

export default DarkModeToggle