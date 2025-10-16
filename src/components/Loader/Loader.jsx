import classNames from 'classnames/bind'
import style from './Loader.module.css'

const clx = classNames.bind(style)
export default function Loader({isLoading, type}){
    return (
        <span className={clx(type, {hidden : !isLoading})}></span>
    )
}