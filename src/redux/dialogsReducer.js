const ADD_MESSAGE = 'ADD-MESSAGE';
//const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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

}

const dialogsReducer = ( state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 20,
                message: action.newMessageBody,
                likesCount: 0
            };
            return {
                ...state,
                messages: [...state.messages, newMessage]
            };

        /*case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageBody: action.textMessage
            };
*/
        default:
            return state
    }

}

export const addMessageActionCreator = (newMessageBody) => ({type: ADD_MESSAGE, newMessageBody});
//action creator ниже больше не нужен, т.к. мы подключили reduxForm и теперь он занимается
//контролем поля ввода
//export const updateNewMessageTextActionCreator = (textMessage) =>
//   ({type: UPDATE_NEW_MESSAGE_TEXT, textMessage: textMessage})

export  default dialogsReducer;