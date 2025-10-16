import classNames from 'classnames/bind'
import style from './BooksPage.module.css'
import Book from '../../components/Book/Book'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Fragment, useEffect, useState } from 'react'
import { get6FreeBooks, get6CommBooks, get6CostBooks } from '../../api/bookApi'
import { Filters, useSearch } from '../../provider/SearchContext'
import { useNavigate } from 'react-router-dom'

const clx = classNames.bind(style)
function BooksPage() {
    const [freeBooks, setFreeBooks] = useState([])
    const [costBooks, setCostBooks] = useState([])
    const [commBooks, setCommBooks] = useState([])

    const { setKeyWord, setFilters, setPage } = useSearch()
    const navigate = useNavigate()

    const handleSeeMore = (ctx) => {
        setFilters([Filters.TITLE, ctx])
        setKeyWord('')
        setPage(0)
        navigate('/explore/result')
    }

    useEffect(() => {
        const fetchFreeBooks = async () => {
            try {
                const response = await get6FreeBooks()
                setFreeBooks(response.data)
            } catch (err) {
                console.log("Error")
            }
        }

        const fetchCostBooks = async () => {
            try {
                const response = await get6CostBooks()
                setCostBooks(response.data)
            } catch (err) {
                console.log("Error")
            }
        }

        const fetchCommBooks = async () => {
            try {
                const response = await get6CommBooks()
                setCommBooks(response.data)
            } catch (err) {
                console.log("Error")
            }
        }

        fetchFreeBooks()
        fetchCostBooks()
        fetchCommBooks()
    }, [])

    return (
        <div className={clx('wrapper')}>
            <div className={clx('book-list', 'top-space')}>
                <label className={clx('header-title')}>FREE BOOKS</label>
                <div className={clx('list')}>
                    {freeBooks.length !== 0 ? (
                    <Fragment>
                        {freeBooks.map((book, index) => (
                            <Book key={index} book={book}/>
                        ))}
                        <div className={clx('see-more-btn')} onClick={() => handleSeeMore(Filters.FREE)}>
                            <label>See more</label>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </div>
                    </Fragment>
                    ) : (
                        <div className={clx('not-found-container')}>
                            <FontAwesomeIcon className={clx('box-icon')} icon={faBoxOpen}/>
                            <label className={clx('empty-label')}>No books found</label>
                        </div>
                    )}
                </div>
            </div>
            <div className={clx('book-list')}>
                <label className={clx('header-title')}>COST BOOKS</label>
                <div className={clx('list')}>
                    {costBooks.length !== 0 ? (
                    <Fragment>
                        {costBooks.map((book, index) => (
                            <Book key={index} book={book}/>
                        ))}
                        <div className={clx('see-more-btn')} onClick={() => handleSeeMore(Filters.COST)}>
                            <label>See more</label>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </div>
                    </Fragment>
                    ) : (
                        <div className={clx('not-found-container')}>
                            <FontAwesomeIcon className={clx('box-icon')} icon={faBoxOpen}/>
                            <label className={clx('empty-label')}>No books found</label>
                        </div>
                    )}
                </div>
            </div>
            <div className={clx('book-list')}>
                <label className={clx('header-title')}>COMMUNITY WRITERS</label>
                <div className={clx('list')}>
                    {commBooks.length !== 0 ? (
                    <Fragment>
                        {commBooks.map((book, index) => (
                            <Book key={index} book={book}/>
                        ))}
                        <div className={clx('see-more-btn')} onClick={() => handleSeeMore(Filters.COMMUNITY)}>
                            <label>See more</label>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </div>
                    </Fragment>
                    ) : (
                        <div className={clx('not-found-container')}>
                            <FontAwesomeIcon className={clx('box-icon')} icon={faBoxOpen}/>
                            <label className={clx('empty-label')}>No books found</label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BooksPage