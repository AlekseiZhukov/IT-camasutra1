import React from 'react'
import s from './../Friends.module.css'

const Friend = (props) => {

    return (

        <div className={s.blockItem}>
            <div className={s.circle}></div>
            <p>{props.name}</p>
        </div>
    )
}

export default Friend