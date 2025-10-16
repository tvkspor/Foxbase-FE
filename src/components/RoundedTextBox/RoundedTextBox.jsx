import style from './RoundedTextBox.module.css'
import classNames from 'classnames/bind'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const clx = classNames.bind(style)
function RoundedTextBox({ type, value, hint, onChange }) {
    const [show, setShow] = useState(false)
    const [tempType, setTempType] = useState(type)

    const handleShowPassword = () => {
        setShow(prev => {
            const nextShow = !prev
            setTempType(nextShow ? 'text' : 'password')
            return nextShow
        })
    }

    return (
        <div className={clx('rounded-textbox')}>
            <input type={tempType} onChange={onChange} required value={value} placeholder={hint}/>
            {type == 'password' &&
                <span className={clx('eye')} onClick={handleShowPassword}>
                    <FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
                </span>}
        </div>
    )
}

export default RoundedTextBox