import classNames from 'classnames/bind'
import style from './ExploreNavBar.module.css'
import UserPopup from '../UserPopup/UserPopup'
import { useState, useEffect, useRef } from 'react'
import logo from '../../assets/fox.png'
import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faChevronDown, faLayerGroup, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../provider/AuthContext'
import foxAvatar from '../../assets/default_avt.jpg'
import { Filters, useSearch } from '../../provider/SearchContext'

const clx = classNames.bind(style)
export default function ExploreNavBar() {
    const { authenticated, userInfo } = useAuth()

    const { result, setResult, toResultPage, setToResultPage, keyword, setKeyWord, filters, setFilters, page, setPage } = useSearch()

    const [popupState, setPopupState] = useState(false)
    const [scrolled, setScrolled] = useState(false);
    const [clearable, setClearable] = useState('')
    const [search, setSearch] = useState('')
    const [categoryPopupState, setCategoryPopupState] = useState(false)

    const filterRef = useRef(null)
    const userPopupRef = useRef(null)

    const location = useLocation()


    const handlePopupClick = () => {
        setPopupState(prev => !prev)
    }

    useEffect(() => {
        if (location.pathname === "/explore") {
            setToResultPage(false)
        } else if (location.pathname === "/explore/result") {
            setToResultPage(true)
        }
    }, [location.pathname])


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
        const handleClickOutside = (e) => {
            if (userPopupRef.current && !userPopupRef.current.contains(e.target)) {
                setPopupState(false)
            }
        }

        if (popupState) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [popupState])

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setClearable(search.length > 0)
    }, [search])

    return (
        <div className={clx({ 'nav-bar': true, 'black-bg': scrolled })}>
            <div className={clx('logo-area')}>
                <img src={logo} className={clx('web-logo')} />
                <label className={clx('logo-label')}>Foxbase</label>
            </div>
            {toResultPage &&
                <div className={clx('search-area')}>
                    <div className={clx('search-box')}>
                        <input type='text' placeholder='What are you looking for ?' onChange={(e) => setSearch(e.target.value)} value={search} />
                        <span className={clx('clear-btn', { visible: clearable })} onClick={() => setSearch('')}>
                            <FontAwesomeIcon icon={faXmark} />
                        </span>
                        <span className={clx('search-btn')} onClick={() => setKeyWord(search)}>
                            <FontAwesomeIcon className={clx('search-icon')} icon={faSearch} />
                        </span>
                    </div>
                </div>}
            <div className={clx('nav-area')}>
                <ul className={clx('nav-list')}>
                    <li className={clx('item')}><Link to='/' className={clx('link')}>Home</Link></li>
                    <li className={clx('item')}><Link to='/explore' className={clx('link')}>Explore</Link></li>
                    <li className={clx('item')}><Link to={userInfo ? '/dashboard' : 'auth/login'} className={clx('link')}>Dashboard</Link></li>
                </ul>
            </div>
            <div className={clx('auth-area')} ref={userPopupRef}>
                {authenticated ? (
                    <Fragment>
                        <div className={clx('avatar')}>
                            <img src={userInfo.avatarUrl ? userInfo.avatarUrl : foxAvatar} />
                        </div>
                        <div className={clx('expand-btn')} onClick={handlePopupClick}>
                            <FontAwesomeIcon
                                className={clx('spin-icon', { up: popupState })}
                                icon={faCaretDown}
                            />
                        </div>
                        <UserPopup state={popupState} />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Link className={clx('home-login-btn')} to='/auth/login'>Log in</Link>
                        <Link className={clx('home-signin-btn')} to="/auth/signin">Sign in</Link>
                    </Fragment>
                )}
            </div>
        </div>
    )
}