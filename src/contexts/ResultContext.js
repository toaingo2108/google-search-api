import { createContext, useContext, useReducer, useState } from 'react'
import ResultReducer from './ResultReducer'

const INITIAL_STATE = {
    results: null,
    isLoading: false,
}

const ResultContext = createContext(INITIAL_STATE)

export const ResultContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ResultReducer, INITIAL_STATE)
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <ResultContext.Provider
            value={{
                results: state.results,
                isLoading: state.isLoading,
                searchTerm,
                setSearchTerm,
                dispatch,
            }}>
            {children}
        </ResultContext.Provider>
    )
}

export const useResultContext = () => useContext(ResultContext)
