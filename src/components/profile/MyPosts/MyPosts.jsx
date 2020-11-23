import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";



const MyPosts = (props) => {

    const postItem = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} key={p.id}/>)

    const addNewPost = (value) => {
        props.addPost(value.newPost)
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postItem}
            </div>
        </div>
    )
}
const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPost" component="textarea" placeholder="Enter your post"/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'addNewPostForm'})(AddNewPostForm)

export default MyPosts