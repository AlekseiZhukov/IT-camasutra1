import React from 'react';
import s from './Post.module.css'

const Post = (props) => {

    return (
        <div className={s.item}>
            <img src='https://fsb.zobj.net/crop.php?r=5a-j9iwed47sGHVmkzCYJsZUP5ni5bN-ZPRcaygQQKH1iT8MxbxDatSYsuDSRoWeQzoqkOBh40NdDtOhMM0Y47TiotH3MDRn0OjaUapG2dNi7Emt3lIPPaaLCOMifwX6cF_NHKFeZFadoTvh' alt={""}/>

            {props.message} <br></br><span>likes count: {props.likesCount}</span>
        </div>
    )
}


export default Post