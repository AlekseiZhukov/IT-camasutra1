import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {
    debugger;
    return (
        <div>
            My posts
                
            <div>
                New post
            </div>
            <div className={s.posts}>
            <Post message ='Hi, how are you?' src='https://fsb.zobj.net/crop.php?r=5a-j9iwed47sGHVmkzCYJsZUP5ni5bN-ZPRcaygQQKH1iT8MxbxDatSYsuDSRoWeQzoqkOBh40NdDtOhMM0Y47TiotH3MDRn0OjaUapG2dNi7Emt3lIPPaaLCOMifwX6cF_NHKFeZFadoTvh'/>    
            <Post message ="It's my first post" src='https://fsb.zobj.net/crop.php?r=5a-j9iwed47sGHVmkzCYJsZUP5ni5bN-ZPRcaygQQKH1iT8MxbxDatSYsuDSRoWeQzoqkOBh40NdDtOhMM0Y47TiotH3MDRn0OjaUapG2dNi7Emt3lIPPaaLCOMifwX6cF_NHKFeZFadoTvh'/>
            
            </div>
        </div>
    )
}


export default MyPosts