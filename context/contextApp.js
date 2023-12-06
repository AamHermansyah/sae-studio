import { createContext, useState } from "react";

export const ContextApp = createContext()

export const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [transitionStartLoading, setTransitionStartLoading] = useState(0)

    const state = {
        loading,
        setLoading,
        transitionStartLoading,
        setTransitionStartLoading
    }

    return (
        <ContextApp.Provider value={state}>
            {children}
        </ContextApp.Provider>
    )
}