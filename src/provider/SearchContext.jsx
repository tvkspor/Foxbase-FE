import { createContext, useContext, useEffect, useState } from "react";
import { getBooksByFilterList } from "../api/bookApi";

const SearchContext = createContext()

export default function SearchProvider({ children }) {
    const [keyword, setKeyWord] = useState('')
    const [filters, setFilters] = useState([Filters.TITLE])
    const [toResultPage, setToResultPage] = useState(false)
    const [page, setPage] = useState(0)
    const [result, setResult] = useState([])
    const [loaded, setLoaded] = useState(false)


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await getBooksByFilterList(filters, keyword, page, 10)
                setResult(response.data)
            } catch {
                console.log("Error fetching result")
            }
        }

        if (loaded) fetchBooks()
    }, [keyword, filters, page])

    useEffect(() => {
        const storedKeyWord = localStorage.getItem('kw')
        const storedFilter = localStorage.getItem('fts')
        if (storedFilter) {
            setFilters(JSON.parse(storedFilter));
        }
        if (storedKeyWord) setKeyWord(storedKeyWord);

        setLoaded(true)
    }, [])

    useEffect(() => {
        if (keyword) {
            localStorage.setItem('kw', keyword)
        } else {
            localStorage.removeItem('kw')
        }
    }, [keyword])

    useEffect(() => {
        if (filters) {
            localStorage.setItem('fts', JSON.stringify(filters))
        } else {
            localStorage.removeItem('fts')
        }
    }, [filters])

    return (
        <SearchContext.Provider value={
            { result, setResult, toResultPage, setToResultPage, keyword, setKeyWord, filters, setFilters, page, setPage }}>
            {children}
        </SearchContext.Provider>
    )
}

export const Filters = {
    TITLE: 'TITLE',
    AUTHOR: 'AUTHOR',
    GENRE: 'GENRE',
    FREE: 'FREE',
    COST: 'COST',
    COMMUNITY: 'COMMUNITY',
    OUTSOURCE: 'OUTSOURCE'
}


export const useSearch = () => useContext(SearchContext)