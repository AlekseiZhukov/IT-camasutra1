import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

const initializedSuccess = ():initializedSuccessActionType => ({type: INITIALIZED_SUCCESS});


export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    //если промисов много, то их в массив и:
    Promise.all ([promise]).then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;