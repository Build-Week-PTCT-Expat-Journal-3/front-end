import {createContext} from 'react';

const initialState = {
    posts: [
        {   id:1,
            imageURL: 'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
            postText: 'Hiking in Mountains',
        }
    ]
}

export const GlobalContext = createContext(initialState);