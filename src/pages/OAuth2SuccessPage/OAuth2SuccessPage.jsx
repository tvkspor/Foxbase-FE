import classNames from 'classnames/bind'
import style from './OAuth2SuccessPage.module.css'
import Loader from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../../provider/AuthContext'

const clx = classNames.bind(style)
export default function OAuth2SuccessPage() {
    const navigate = useNavigate()

    const { setJwt } = useAuth()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        if (token) {
            setJwt(token)
            navigate('/') 
        }
    }, [])

    return (
        <div className={clx('wrapper')}>
            <Loader type='rolling' isLoading={true} />
            <label>Google sign in success ! Redirecting to Foxbase ...</label>
        </div>
    )
}