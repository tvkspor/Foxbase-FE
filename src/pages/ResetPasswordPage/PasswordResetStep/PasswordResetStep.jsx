import RoundedTextBox from '../../../components/RoundedTextBox/RoundedTextBox'
import style from './PasswordResetStep.module.css'
import classNames from 'classnames/bind'
import PasswordReqList from '../../../components/PasswordReqList/PasswordReqList'
import { useState } from 'react'
import { resetPassword } from '../../../api/userApi'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../components/Loader/Loader'
import { useAuth } from '../../../provider/AuthContext'

const clx = classNames.bind(style)
function PasswordResetStep({ setStep, setBars, username, token }) {
    const { logout, jwt } = useAuth()

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const cancel = async () => {
        navigate('/auth/login')
        await logout
    }

    const handleResetPassword = async () => {
        if (!validPassword) return
        try {
            setIsLoading(true)
            const request = {
                username: username,
                resetToken: token,
                password: password
            }

            const response = await resetPassword(request)
            if (response.data.success) {
                if (jwt) await logout()
                navigate('/auth/login')
            }
        } catch {
            console.log("Error reset password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={clx('reset-container')}>
            <h1>Create new password</h1>
            <div className={clx("input-area")}>
                <label className={clx('textbox-label')}>New password</label>
                <RoundedTextBox type='password' hint='Password' onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={clx("input-area")}>
                <label className={clx('textbox-label')}>Confirm password</label>
                <RoundedTextBox type='password' hint='Confirm password' onChange={(e) => setConfirm(e.target.value)} />
            </div>
            <PasswordReqList password={password} confirm={confirm} onValidityChange={setValidPassword} />
            <div className={clx('btn-area')}>
                <div className={clx('btn', 'cancel')} onClick={cancel}>Cancel</div>
                <div className={clx('btn', 'reset')} onClick={handleResetPassword}>Set new password</div>
            </div>
            <div className={clx('loader-container')}>
                <Loader type='spinner' isLoading={isLoading} />
            </div>
        </div>
    )
}

export default PasswordResetStep