import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import style from './DashboardLayout.module.css'
import classNames from 'classnames/bind'
import foxLogo from '../../../assets/fox.png'
import { useRef, useState, useEffect } from 'react'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons'
import { faCaretDown, faFeatherPointed } from '@fortawesome/free-solid-svg-icons'
import WorkPage from '../../../pages/WorkPage/WorkPage'
import UserPopup from '../../UserPopup/UserPopup'
import { useAuth } from '../../../provider/AuthContext'

const clx = classNames.bind(style)
export default function DashboardLayout() {
    const { loading, userInfo } = useAuth()

    const [popupState, setPopupState] = useState(false)
    const [tab, setTab] = useState(1)

    const userPopupRef = useRef(null)

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

    const handlePopupClick = () => {
        setPopupState(prev => !prev)
    }

    if (loading || userInfo === null) return (<div></div>)

    return (
        <div className={clx('wrapper')}>
            <header className={clx('dashboard-header')}>
                <div className={clx('tab-control')}>
                    <Link to='/'><img src={foxLogo} className={clx('fox-tab-logo')} /></Link>
                    <label className={clx('bold-text', 'right-space', 'white-text')}>DASHBOARD</label>
                    <div className={clx('expanded-tab-btn', { 'active': tab === 1 })} onClick={() => setTab(1)}>
                        <FontAwesomeIcon icon={faFolderOpen} className={clx('tab-btn-icon')} />
                        <label className={clx('bold-text')}>My collection</label>
                    </div>
                    <div className={clx('expanded-tab-btn', { 'active': tab === 2 })}>
                        <FontAwesomeIcon icon={faFeatherPointed} className={clx('tab-btn-icon')} onClick={() => setTab(2)} />
                        <label className={clx('bold-text')}>My works</label>
                    </div>
                </div>
                <div className={clx('user-container')} ref={userPopupRef}>
                    <div className={clx('avatar')}>
                        <img src={userInfo.avatarUrl} />
                    </div>
                    <div className={clx('expand-btn')} onClick={handlePopupClick}>
                        <FontAwesomeIcon icon={faCaretDown} className={clx('spin-icon', { up: popupState })} />
                    </div>
                    <UserPopup state={popupState} />
                </div>
            </header>
            <div className={clx('content')}>
                <WorkPage type={tab} />
            </div>
        </div>
    )
}
