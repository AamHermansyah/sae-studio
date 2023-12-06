import { useContext } from "react"
import { ContextApp } from "../context/contextApp"

const useLoadingPageSettings = () => {
    const context = useContext(ContextApp)
    const { loading, setLoading, setTransitionStartLoading } = context

    const onEventClick = () => {
        setTransitionStartLoading(.5)
        setLoading(prev => true)
    }

    return {
        onEventClick,
        loading
    }
}

export default useLoadingPageSettings