import classNames from 'classnames/bind'
import style from './ResetPasswordPage.module.css'
import OTPStep from './OTPStep/OTPStep'
import EmailStep from './EmailStep/EmailStep'
import PasswordResetStep from './PasswordResetStep/PasswordResetStep'
import { useState } from 'react'

const clx = classNames.bind(style)
function ResetPasswordPage() {
    const [step, setStep] = useState(1)
    const [bars, setBars] = useState([true, false, false])
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [countDown, setCountDown] = useState(false)
    const [token, setToken] = useState('')

    return (
        <div className={clx('slide-container')}>
            <div className={clx('process')}>
                {bars.map((isActive, index) => (
                    <div key={index} className={clx({ 'step-bar': true, 'active': isActive, 'unactive': !isActive })}></div>
                ))}
            </div>
            <div className={clx({ 'slider': true, 'first': step === 1, 'second': step === 2, 'third': step === 3 })}>
                <EmailStep setBars={setBars} setStep={setStep} setEmail={setEmail} setUsername={setUsername} username={username}
                            email={email}/>
                <OTPStep setBars={setBars} setStep={setStep} email={email} username={username} setToken={setToken}
                         setCountDown={setCountDown} countDown={countDown}/>
                <PasswordResetStep setBars={setBars} setStep={setStep} username={username} token={token}/>
            </div>
        </div>
    )
}

export default ResetPasswordPage