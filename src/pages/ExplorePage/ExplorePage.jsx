import classNames from 'classnames/bind'
import style from './ExplorePage.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faLayerGroup, faXmark, faChevronDown, faN } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import horror from '../../assets/horror.jpg'
import fantasy from '../../assets/fantasy.jpg'
import love from '../../assets/love.jpg'
import doc from '../../assets/doc.jpg'
import science from '../../assets/science.jpg'
import history from '../../assets/history.jpg'
import detective from '../../assets/detective.jpg'
import art from '../../assets/art.jpg'
import { useSearch, Filters } from '../../provider/SearchContext'
import { useNavigate } from 'react-router-dom'

const clx = classNames.bind(style)
export default function ExplorePage() {
    const { setToResultPage, setKeyWord, setFilters } = useSearch()

    const filterRef = useRef(null)
    const navigate = useNavigate()

    const [clearable, setClearable] = useState(false)
    const [search, setSearch] = useState('')
    const [categoryPopupState, setCategoryPopupState] = useState(false)

    const [keyWordFilter, setKeyWordFilter] = useState(Filters.TITLE)
    const [typeGroup1, setTypeGroup1] = useState(null); 
    const [typeGroup2, setTypeGroup2] = useState(null); 

    const handleExtraFilter = (filter) => {
        switch (filter) {
            case Filters.FREE:
            case Filters.COST:
                setTypeGroup1(prev => (prev === filter ? null : filter));
                break;
            case Filters.COMMUNITY:
            case Filters.OUTSOURCE:
                setTypeGroup2(prev => (prev === filter ? null : filter));
                break;
        }
    };

    const handleCategoryPopupClick = () => {
        setCategoryPopupState(prev => !prev)
    }

    const handleKW = (value) => {
        setCategoryPopupState(false)
        setKeyWordFilter(value)
    }


    const handleSearch = () => {
        setKeyWord(search)
        setFilters([keyWordFilter, typeGroup1, typeGroup2])
        setToResultPage(true)
        navigate("/explore/result")
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setCategoryPopupState(false)
            }
        }

        if (categoryPopupState) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [categoryPopupState])

    useEffect(() => {
        setClearable(search.length > 0)
    }, [search])

    return (
        <div className={clx('wrapper')}>
            <div className={clx('title-container')}>
                <h1 className={clx('large-title')}>Discover best books from best authors around the world !</h1>
                <h3 className={clx('small-title')}>Explore works from famous writers and community writers around the world !</h3>
            </div>
            <div className={clx('search-area')}>
                <div className={clx('search-box')}>
                    <input type='text' placeholder='What are you looking for ?' onChange={(e) => setSearch(e.target.value)} value={search} />
                    <span className={clx('clear-btn', { visible: clearable })} onClick={() => setSearch('')}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                    <span className={clx('search-btn')} onClick={() => handleSearch()}>
                        <FontAwesomeIcon className={clx('search-icon')} icon={faSearch} />
                    </span>
                </div>
                <div className={clx('filter')} ref={filterRef}>
                    <label className={clx('bold')}>{keyWordFilter}</label>
                    <FontAwesomeIcon icon={faLayerGroup} />
                    <span className={clx('filter-expand-btn')} onClick={handleCategoryPopupClick} >
                        <FontAwesomeIcon className={clx('spin-icon', { up: categoryPopupState })} icon={faChevronDown} />
                    </span>
                    <div className={clx('option-popup', { open: categoryPopupState })}>
                        <span className={clx('option')} onClick={() => handleKW(Filters.TITLE)}>TITLE</span>
                        <span className={clx('option')} onClick={() => handleKW(Filters.GENRE)}>GENRE</span>
                        <span className={clx('option')} onClick={() => handleKW(Filters.AUTHOR)}>AUTHOR</span>
                    </div>
                </div>
            </div>
            <div className={clx('types-container')}>
                <div
                    className={clx('type', typeGroup1 === Filters.FREE && 'active')}
                    onClick={() => handleExtraFilter(Filters.FREE)}>
                    Free books
                </div>
                <div
                    className={clx('type', typeGroup1 === Filters.COST && 'active')}
                    onClick={() => handleExtraFilter(Filters.COST)}>
                    Cost books
                </div>
                <div
                    className={clx('type', typeGroup2 === Filters.COMMUNITY && 'active')}
                    onClick={() => handleExtraFilter(Filters.COMMUNITY)}>
                    Community books
                </div>
                <div
                    className={clx('type', typeGroup2 === Filters.OUTSOURCE && 'active')}
                    onClick={() => handleExtraFilter(Filters.OUTSOURCE)}>
                    Outsource books
                </div>
            </div>
            <div className={clx('slider-container')}>
                <div className={clx('infinite-slider')}>
                    {[horror, fantasy, love, doc, science, detective, history, art, horror, fantasy, love, doc, science, detective, history, art].map((img, index) => (
                        <div className={clx('image-frame')} key={index}>
                            <img src={img} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}