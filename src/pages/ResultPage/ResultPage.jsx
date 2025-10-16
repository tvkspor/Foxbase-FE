import classNames from 'classnames/bind'
import style from './ResultPage.module.css'
import Book from '../../components/Book/Book'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { useSearch } from '../../provider/SearchContext'
import { useEffect, useState } from 'react'

const clx = classNames.bind(style)
export default function ResultPage() {
    const { result, keyword, page, setPage } = useSearch()
    
    const [pagination, setPagination] = useState([])
    const [sessionNum, setSessionNum] = useState(0)
    const [session, setSession] = useState(0)

    const handleNext = () => {
        if (session + 1 < sessionNum) setSession(prev => prev + 1)
    }

    const handlePrev = () => {
        if (session - 1 >= 0) setSession(prev => prev - 1)
    }

    useEffect(() => {
        if (result.length === 0) return
        if (result.content.length > 0) {
            const n = result.totalPages;
            const sNum = Math.floor(n / 5) + (n % 5 > 0 ? 1 : 0)
            const range = Array.from({ length: n }, (_, i) => i);

            if (n < 5) {
                setPagination([range])
                setSessionNum(1)
                return
            }

            var rs = []
            for (let i = 0; i < n; i += 5) {
                rs.push(range.slice(i, i + 5))
            }

            setSessionNum(sNum)
            setPagination(rs)
            console.log(pagination)
        }
    }, [result])

    if (result.length === 0) return (<div></div>)

    return (
        <div className={clx('wrapper')}>
            <h1 className={clx('result-label')}>
                {`Result for: ${keyword === '' ? 'All' : keyword}`}
            </h1>
            {result.content.length > 0 ? (<div className={clx('book-list')}>
                {result.content.map((book, index) => (
                    <Book key={index} book={book} />
                ))}
            </div>):
            (
                <div className={clx('unfound')}>
                    <FontAwesomeIcon icon={faBoxOpen}/>
                    <label>No books found.</label>
                </div>
            )
            }
            {pagination.length > 0 && <div className={clx('pagination')}>
                <div className={clx('control-btn')} onClick={() => handlePrev()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <ul className={clx('page-links')}>
                    {pagination[session].map((value, index) => (
                        <li key={index} className={clx('link-item')} onClick={() => setPage(value)}>
                            <a className={clx('link', {'page-active': value === page})}>{value + 1}</a>
                        </li>
                    ))}
                </ul>
                <div className={clx('control-btn')} onClick={() => handleNext()}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>}
        </div>
    )
}