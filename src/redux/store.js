//import {rerenderEntireTree} from "../render_old";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    _state: {
        dialogsPage: {

            messages : [
                {id: 1, message: "Hi"},
                {id: 2, message: "How is your it-kamasutra?"},
                {id: 3, message: "Yo"},
                {id: 4, message: "Yo"},
                {id: 5, message: "Yo"},
                {id: 6, message: "Good!"}
            ],
            dialogs : [
                {id: 1, name: "Dimych"},
                {id: 2, name: "Andrew"},
                {id: 3, name: "Sveta"},
                {id: 4, name: "Sasha"},
                {id: 5, name: "Alex"},
                {id: 6, name: "Olya"}
            ],
            newMessageBody: '',
        },
        messagePage: {
            posts: [
                {id: 1, message: "Hi, how are you?", likesCount: 12},
                {id: 2, message: "It's my first post", likesCount: 11},
                {id: 3, message: "Bla-bla", likesCount: 0},
            ],
            newPostText: 'it-kamasutra.com',
        },
        sidebarPage: {
            friends: [
                { id: 1, name: "Andrew"},
                { id: 2, name: "Sasha"},
                { id: 3, name: "Sveta"},
            ]
        }
    },
    _callSubscriber () {
        console.log('State changed');
    },

    getState () {

        return this._state;
    },
    subscribe (observer) {
        this._callSubscriber=observer;
    },

    dispatch(action) {

        this._state.messagePage = profileReducer(action, this._state.messagePage);
        this._state.dialogsPage = dialogsReducer(action, this._state.dialogsPage);
        this._state.sidebarPage = sidebarReducer(action, this._state.sidebarPage);

        this._callSubscriber(this._state);
    }
}

export default store;

window.store = store;


