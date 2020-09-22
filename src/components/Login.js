import React, { useState, useEffect, useContext } from 'react';
import * as yup from 'yup';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import { Link, useHistory } from 'react-router-dom';
import {GlobalContext} from "../contexts/GlobalState";

const formSchema = yup.object().shape({
    username: yup.string().required('Enter your username'),
    password: yup.string().required('Enter your password')
});


export const Login = () => {
    const {setLoggedState} = useContext(GlobalContext);
    const [buttonDisable, setButtonDisable] = useState(true); 
    const { push } = useHistory();
    const [formState, setFormState] = useState({
        username: '',
        password: ''
    });

    const [errorState, setErrorState] = useState({
        username: '',
        password: ''
    });


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

    const inputChange = e => {
        e.persist();
        validate(e);
        setFormState({...formState, [e.target.name]: e.target.value});
    };

    const formSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
            .post("https://expat-journalp16.herokuapp.com/api/auth/login", formState)
            .then(res => {
                console.log('New User: ', res.data)
                window.localStorage.setItem("token", res.data.token)
                localStorage.setItem("id", res.data.id)
        
                push("/protected");
            })
            .catch( err => {
                console.log(err)
             })
    };

    return (

        <div>
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
            <div>
                <p>Don't have an account? <Link to="./register">Sign Up</Link></p>
            </div>
        </div>
    )
}