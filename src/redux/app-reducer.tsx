import { getAuthData } from "./auth-reducer";
import { baseThunkType, InferActionsTypes } from "./reduxStore";

let initialState = {
    initialized: false,
};


const appReducer = (state = initialState, action: appActionsType): appInitialStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            };

        default:
            return state;
    }
};



const appActions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const),

}
export type appInitialStateType = typeof initialState
type appActionsType = InferActionsTypes<typeof appActions>
type ThunkType = baseThunkType<appActionsType>

export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthData());
    Promise.all([promise]).then(() => {
        dispatch(appActions.initializedSuccess());
    });
};

export default appReducer;
