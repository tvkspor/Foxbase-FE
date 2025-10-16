import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import fox from '../../../assets/fox_login.png'
import { Link, useNavigate } from 'react-router-dom'
import style from './AuthLayout.module.css'
import classNames from 'classnames/bind'
import FoxCharacter from '../../FoxCharacter/FoxCharacter'
import { useAuth } from '../../../provider/AuthContext'

const clx = classNames.bind(style)

function AuthLayout({ context, children }) {
    
    return (
        <div className={clx('auth-container')}>
            <Link className={clx('back-btn')} to='/'>
                <FontAwesomeIcon icon={faArrowLeft} className={clx('arrow-icon')} />
                <label className={clx('back-label')}>Back to Home</label>
            </Link>
            <div className={clx('auth-content')}>
                {context !== 'reset' && <FoxCharacter/>}
                {children}
            </div>
        </div>
    )
}

export default AuthLayout
