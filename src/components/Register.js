import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('Enter your full name'),
    email: yup.string().email('Enter a valid email address').required('Enter an email address'),
    username: yup.string().required('Enter a username'),
    password: yup.string().required('Enter a password')
})

export const Register = () => {

    const [buttonDisable, setButtonDisable] = useState(true);
    
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })

    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })

    const [user, setUser] = useState([]);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisable(!valid);
        });
    }, [formState])

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
        console.log('User Registration Successful');
        axios
            .post("https://reqres.in/api/users", formState)
            .then( res => {
                console.log(res);
                setUser([...user, res.data]);
                setFormState({
                    name: '',
                    email: '',
                    password: '',
                    terms: ''
                })
            })
            .catch( err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={formSubmit}>
                <label htmlFor='name'>
                    <input 
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Full Name'
                        value={formState.name}
                        onChange={inputChange}
                    />
                    {errorState.name.length > 0 ? (<p>{errorState.name}</p>) : null}
                </label>
                <label htmlFor='email'>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                        value={formState.email}
                        onChange={inputChange}
                    />
                    {errorState.email.length > 0 ? (<p>{errorState.email}</p>) : null}
                </label>
                <label htmlFor='username'>
                    <input 
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Username'
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
                        placeholder='Password'
                        value={formState.password}
                        onChange={inputChange}
                    />
                    {errorState.password.length > 0 ? (<p>{errorState.password}</p>) : null}
                </label>
                <button disabled={buttonDisable}>Sign up</button>
            </form>
        </div>
    )
}