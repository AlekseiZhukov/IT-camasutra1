import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';

const MyPosts = (props) => {

    const postItem = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    const addPost = () => {
        props.addPost()
    }

    const onPostChange= (event) => {
        let newText = event.target.value;
        props.updateNewPostText(newText)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea
                    onChange={ onPostChange }
                    value={props.newPostText}
                />
            </div>
            <div>
                <button onClick={ addPost } >Add post</button>
            </div>
            <div className={s.posts}>
                {postItem}
            </div>
        </div>
    )
}


export default MyPosts