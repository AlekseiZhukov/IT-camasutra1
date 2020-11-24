import React from 'react';
import s from './MyPosts.module.css'
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormControls";



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
const maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="newPost"
                       component={Textarea}
                       placeholder="Enter your post"
                       validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const PostReduxForm = reduxForm({form: 'addNewPostForm'})(AddNewPostForm)

export default MyPosts