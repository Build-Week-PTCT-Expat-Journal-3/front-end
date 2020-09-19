import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const initialState = {
    posts: [
        {   id:1,
            imageURL: 'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            postText: 'Hiking in Mountains',
        }
    ],
    isLogged: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


function setLoggedState (response) {
    return dispatch =>
    dispatch({
        type: "SET_LOGGED_STATE",
        payload: response
    })

}

return (<GlobalContext.Provider value= {{
    posts: state.posts,
    setLoggedState
}}>
{children}
</GlobalContext.Provider>);
}
