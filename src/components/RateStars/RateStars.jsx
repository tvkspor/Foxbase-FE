import style from './RateStars.module.css'
import classNames from 'classnames/bind'
import { faStar as faStarFull, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarOutlined } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const clx = classNames.bind(style)
export default function RateStars({ rate }) {
    const stars = []

    const roundedRate = Math.round(rate * 2) / 2 // round to nearest 0.5
    const fullStars = Math.floor(roundedRate)
    const hasHalfStar = roundedRate % 1 === 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FontAwesomeIcon className={clx('star')} key={`full-${i}`} icon={faStarFull} />)
    }

    if (hasHalfStar) {
        stars.push(<FontAwesomeIcon className={clx('star')} key="half" icon={faStarHalfStroke} />)
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FontAwesomeIcon className={clx('star')} key={`empty-${i}`} icon={faStarOutlined} />)
    }

    return <div className={clx('wrapper')}>{stars}</div>
}