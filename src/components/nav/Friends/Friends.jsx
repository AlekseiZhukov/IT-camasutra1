import React from 'react'
import s from './Friends.module.css'
import Friend from "./Friend/Friend";

const Friends = (props) => {

    //const friend = props.state.map( f => <Friend name={f.name} key={f.id} />)
    return (
        <div >
            <h2 className={s.title}>Friends</h2>
            <div className={s.block}>

            </div>
        </div>
    )
}

export default Friends