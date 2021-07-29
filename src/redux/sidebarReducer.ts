
let initialState = {
    friends: [
        { id: 1, name: "Andrew"},
        { id: 2, name: "Sasha"},
        { id: 3, name: "Sveta"},
    ]
}
type initialStateType = typeof initialState
const sidebarReducer = (state = initialState, action: any): initialStateType => {


    return state

}

export default sidebarReducer;