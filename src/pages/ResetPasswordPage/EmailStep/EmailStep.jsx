import style from './EmailStep.module.css'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import RoundedTextBox from '../../../components/RoundedTextBox/RoundedTextBox'
import { requestSecurityOTP } from '../../../api/userApi'
import { useState } from 'react'
import Loader from '../../../components/Loader/Loader'

const clx = classNames.bind(style)
function EmailStep({ setStep, setBars, setEmail, setUsername, username, email }) {
    const [run, setRun] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleNext = async () => {
        if (username.length === 0 || email.length === 0) return
        try {
            setLoading(true)
            const request = {
                username: username,
                email: email
            }
            const response = await requestSecurityOTP(request)
            if (response.data.success) {
                setStep(2)
                setBars([true, true, false])
                setCountDown(true)
            }
        } catch {
            console.log("Invalid info")
            setRun(true)
            setTimeout(() => setRun(false), 4999)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={clx('email-container')}>
            <h1 className={clx('email-title')}>Enter your email</h1>
            <RoundedTextBox type='text' hint='Username' onChange={(e) => setUsername(e.target.value)} />
            <RoundedTextBox type='text' hint='Email' onChange={(e) => setEmail(e.target.value)} />
            <div className={clx('send-code-btn')} onClick={() => handleNext()}>
                <FontAwesomeIcon className={clx('plane')} icon={faPaperPlane} />
                <label>Send code</label>
            </div>
            <label className={clx('error-label', { 'hidden': !run })}>This is not the Email you have registed for that Username</label>
            <div className={clx('progress-bar', { 'hidden': !run })}>
                <div className={clx('value', { 'hidden': !run, 'run': run })}></div>
            </div>
            <div className={clx('loader-container')}>
                <Loader type='spinner' isLoading={loading}/>
            </div>
        </div>
    )
}

export default EmailStep