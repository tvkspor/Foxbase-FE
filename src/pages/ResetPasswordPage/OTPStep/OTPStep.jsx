import style from './OTPStep.module.css'
import classNames from 'classnames/bind'
import OTPBox from '../../../components/OTPBox/OTPBox'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark, faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { verifySecurityOTP } from '../../../api/userApi'

const clx = classNames.bind(style)
function OTPStep({ setStep, setBars, email, username, setToken, setCountDown, countDown }) {
    const time = useRef(300)
    const [code, setCode] = useState('')

    const otpRef = useRef()

    const handleReset = () => {
        otpRef.current?.reset()
    }

    const formatTime = () => {
        const min = Math.floor(time.current / 60).toString().padStart(2, '0')
        const sec = (time.current % 60).toString().padStart(2, '0')
        return `${min}:${sec}`
    }


    const missingEmail = () => {
        const idx = email.indexOf('@')
        const head = email.substring(0, 3)
        const tail = email.substring(idx)

        return head + '********' + tail
    }

    const handleResend = async () => {
        if (username.length === 0 || email.length === 0) return
        try {
            const request = {
                username: username,
                email: email
            }
            const response = await requestSecurityOTP(request)
            if (response.data.success) {
                time.current = 300
                setCountDown(true)
                setStep(2)
                setBars([true, true, false])
            }
        } catch {
            console.log("Invalid info")
        }
    }

    useEffect(() => {
        if (!countDown) return

        const interval = setInterval(() => {
            if (time.current > 0) time.current--
            else {
                setCountDown(false)
                clearInterval(interval)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [countDown])

    useEffect(() => {
        if (code.length < 6) return

        const verifyOtp = async () => {
            try {
                const request = {
                    username: username,
                    otp: Number(code)
                }
                console.log(request)
                const response = await verifySecurityOTP(request)
                if (response.data.verified) {
                    setToken(response.data.resetToken)
                    setStep(3)
                    setBars([true, true, true])
                }

            } catch {
                console.log("Error verify OTP")
            } finally {
                handleReset()
            }
        }

        verifyOtp()
    }, [code])

    return (
        <div className={clx('reset-password-container')}>
            <h1 className={clx('reset-title')}>OTP Verification</h1>
            <p className={clx('reset-message')}>
                {`We've sent a 6-digits security code to your email ${missingEmail()}. 
                Please enter the code to reset your password.`}
            </p>
            <OTPBox className={clx('otp')} ref={otpRef} onChange={(value) => setCode(value)} />
            <div className={clx('action-area')}>
                <button className={clx('resend-btn')} onClick={handleResend} disabled={countDown}>
                    <FontAwesomeIcon icon={faRotateRight} className={clx('rotate-icon')} />
                    <label>Re-send OTP</label>
                </button>
                <label className={clx('expire-label')}>{`Expired in ${formatTime()}`}</label>
            </div>
        </div>
    )
}

export default OTPStep