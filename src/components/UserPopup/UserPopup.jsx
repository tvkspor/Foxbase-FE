import classNames from 'classnames/bind'
import style from './UserPopup.module.css'
import React, { forwardRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPen, faKey, faMoneyCheckDollar, faRightFromBracket, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../provider/AuthContext'
import wallet from '../../assets/wallet.png'
import { purchaseToWallet } from '../../api/purchaseApi';
import foxAvatar from '../../assets/default_avt.jpg'

const clx = classNames.bind(style)
const UserPopup = forwardRef(function UserPopup({ state }, ref) {
    const { logout, jwt, userInfo } = useAuth()

    const [next, setNext] = useState(false)
    const [amountString, setAmountString] = useState('0')
    const [amount, setAmount] = useState('0')
    const [max, setMax] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleLogout = async () => {
        await logout()
    }

    const formatAmount = (value) => {
        if (!isNaN(value)) {
            if (Number(value) >= 99999999999) {
                setMax(true)
                return
            }
            setAmount(value)
            setMax(false)
            const newVal = Number(value).toLocaleString()
            setAmountString(newVal)
        }
    }

    const handlePurchaseWallet = async () => {
        const request = {
            amount: Number(amount)
        }

        try {
            const response = await purchaseToWallet(jwt, request)
            if (response.data.success) {
                userInfo.balance = response.data.newBalance
                setSuccess(true)
                setTimeout(() => setSuccess(false), 1000)
            }
        } catch {
            console.log('Error')
            console.log(request)
        }
    }

    return (
        <div ref={ref} className={clx('popup', { 'show': state, 'hidden': !state })}>
            <div className={clx('header')}>
                <div className={clx('header-avatar')}>
                    <img src={userInfo.avatarUrl ? userInfo.avatarUrl : foxAvatar} />
                    <div className={clx('avatar-edit')}>
                        <FontAwesomeIcon className={clx('pen-icon')} icon={faPen} />
                    </div>
                </div>
                <label className={clx('username-label')}>{userInfo.fname + " " + userInfo.lname}</label>
            </div>
            <div className={clx('popup-content')}>
                <div className={clx('info-area')}>
                    <div className={clx('stats-item')}>
                        <img className={clx('item-icon')} src={wallet} />
                        <label className={clx('green-text', 'item-text')}>{userInfo.balance.toLocaleString() + "đ"}</label>
                    </div>
                </div>
                <div className={clx('action-area')}>
                    <div className={clx('action-title')}>
                        <label className={clx('action-label')}>Actions</label>
                        <div className={clx('line')} />
                    </div>
                    <div className={clx('slider', { 'next': next })}>
                        <div className={clx('actions')}>
                            <Link className={clx('action')} to='/auth/reset-password'>
                                <FontAwesomeIcon className={clx('key-icon')} icon={faKey} />
                                <label className={clx('action-name')}>Reset password</label>
                            </Link>
                            <div className={clx('action')} onClick={() => setNext(true)}>
                                <FontAwesomeIcon className={clx('money-icon')} icon={faMoneyCheckDollar} />
                                <label className={clx('action-name')}>Purchase</label>
                            </div>
                            <div className={clx('action')} onClick={() => handleLogout()}>
                                <FontAwesomeIcon className={clx('out-icon')} icon={faRightFromBracket} />
                                <label className={clx('action-name')}>Log out</label>
                            </div>
                        </div>
                        <div className={clx('purchase')}>
                            <label className={clx('black-text', 'bold', 'left-space', 'small-text')}>Purchase to Foxbase Budget</label>
                            <div className={clx('textbox')}>
                                <input type="text" placeholder='Enter amount...' onChange={(e) => formatAmount(e.target.value)} />
                                {success && <FontAwesomeIcon className={clx('check-icon')} icon={faCheckCircle} />}
                            </div>
                            <div className={clx('amount-container')}>
                                <label className={clx('black-text')}>Total amount:</label>
                                <label className={clx('amount-label', { 'green-text': !max, 'red-text': max })}>
                                    {amountString + " VND"}
                                </label>
                            </div>
                            <div className={clx('btn-container')}>
                                <div className={clx('back-btn')} onClick={() => setNext(false)}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    <label className={clx('bold')}>Back</label>
                                </div>
                                <div className={clx('confirm-btn')} onClick={() => handlePurchaseWallet()}>
                                    Confirm
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default UserPopup