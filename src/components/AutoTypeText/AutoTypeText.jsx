import classNames from 'classnames/bind'
import style from './AutoTypeText.module.css'
import { useEffect, useState } from 'react'

const clx = classNames.bind(style)

export default function AutoTypeText({ lines }) {
    const [animationKey, setAnimationKey] = useState(0)

    useEffect(() => {
        setAnimationKey(prev => prev + 1)
    }, [lines])

    return (
        <div className={clx("css-typing")} key={animationKey}>
            {lines.map((line, i) => (
                <p
                    key={i}
                    className={clx(`line${i + 1}`)}
                    style={{ width: `${line.length + 1}ch` }} // +1 for blinking cursor spacing
                >
                    {line}
                </p>
            ))}
        </div>
    )
}
