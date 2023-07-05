import {
    applyMiddleware,
    combineReducers,
    configureStore,
    legacy_createStore,
    ThunkAction,
    ThunkDispatch,
} from '@reduxjs/toolkit';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app-reducer';
import { Action, compose, createStore } from 'redux';



// Большое кол-во кода заменяется меньшим
// type PropsTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropsTypes<T>>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
export type DispatchType = ThunkDispatch<AppStateType, any, Action>
type rootReducerType = typeof rootReducer
export type AppStateType = ReturnType<rootReducerType>


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

const store = configureStore({
    reducer: rootReducer,
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store1 = legacy_createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);



// переписать на новый синтаксис редакса
// вроде переписал, но чет подозрительно мало




// @ts-ignore
window.store = store;
export default store;