import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    username: yup.string().required('Enter your username'),
    password: yup.string().required('Enter your password')
});

export const Login = () => {

    const [buttonDisable, setButtonDisable] = useState(true); 

    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const [errorState, setErrorState] = useState({
        username: '',
        password: ''
    });

    const [user, setUser] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisable(!valid);
        })
    }, [formState]);

    const validate = (e) => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then( valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ''
                });
            })
            .catch( err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            })
            
    };

    const inputChange = (e) => {
        e.persist();
        validate(e);
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const formSubmit = (e) => {
        e.preventDefault();
        console.log('user login successful');
        axios
            .post("https://reqres.in/api/login", formState)
            .then( res => {
                console.log('Submit Res: ', res.data);
                setUser([...user, res.data]);
                setFormState({
                    username: '',
                    password: ''
                })
            })
            .catch( err => console.log(err));
    };

    return (
        <form onSubmit={formSubmit}>
            
            <label htmlFor='username'>
                <input 
                    type='text'
                    name='username'
                    id='username'
                    placeholder = 'Username'
                    value={formState.username} 
                    onChange={inputChange} 
                />
                {errorState.username.length > 0 ? (<p>{errorState.username}</p>) : null}
            </label>
            
            <label htmlFor='password'>
                <input 
                    type='password' 
                    name='password'
                    id='password'
                    placeholder= 'Password'
                    value={formState.password} 
                    onChange={inputChange} 
                />
                {errorState.password.length > 0 ? (<p>{errorState.password}</p>) : null}
            </label>

            <button disabled={buttonDisable}>Login</button>

        </form>
    )
}