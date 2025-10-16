import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from 'react'
import classNames from 'classnames/bind'
import style from './OTPBox.module.css'

const clx = classNames.bind(style)

const OTPBox = forwardRef(({ code = '', onChange }, ref) => {
    const length = 6
    const [otp, setOtp] = useState(Array(length).fill(''))
    const inputRefs = useRef([])

    useEffect(() => {
        if (onChange) {
            onChange(otp.join(''))
        }
    }, [otp, onChange])

    useImperativeHandle(ref, () => ({
        reset: () => {
            setOtp(Array(length).fill(''))
            inputRefs.current[0]?.focus()
        }
    }))

    const handleChange = (value, index) => {
        if (!/^[0-9]$/.test(value)) return
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (index < length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                const newOtp = [...otp]
                newOtp[index] = ''
                setOtp(newOtp)
                if (index > 0) inputRefs.current[index - 1].focus()
            }
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus()
        } else if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1].focus()
        }
    }

    return (
        <div className={clx('otp-wrapper')}>
            {otp.map((digit, i) => (
                <div className={clx('digit-box')} key={i}>
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        className={clx('digit')}
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        ref={(el) => (inputRefs.current[i] = el)}
                        required
                    />
                </div>
            ))}
        </div>
    )
})

export default OTPBox
