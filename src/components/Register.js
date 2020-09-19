import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, TextField } from '@material-ui/core';

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
            <Container maxWidth='sm' style={styles.registerForm}>
                <form onSubmit={formSubmit}>
                        <TextField 
                            variant='outlined'
                            type='text'
                            name='name'
                            id='name'
                            label='Full Name'
                            value={formState.name}
                            onChange={inputChange}
                            error={errorState.name.length > 0 ? true : null}
                            helperText={errorState.name.length > 0 ? (errorState.name) : null}
                        />
                        <TextField 
                            variant='outlined'
                            type='email'
                            name='email'
                            id='email'
                            label='Email'
                            value={formState.email}
                            onChange={inputChange}
                            error={errorState.email.length > 0 ? true : null}
                            helperText={errorState.email.length > 0 ? (errorState.email) : null}
                        />
                        <TextField  
                            variant='outlined'
                            type='text'
                            name='username'
                            id='username'
                            label='Username'
                            value={formState.username}
                            onChange={inputChange}
                            error={errorState.username.length > 0 ? true : null}
                            helperText={errorState.username.length > 0 ? (errorState.username) : null}
                        />
                        <TextField  
                            variant='outlined'
                            type='password'
                            name='password'
                            id='password'
                            label='Password'
                            value={formState.password}
                            onChange={inputChange}
                            error={errorState.password.length > 0 ? true : null}
                            helperText={errorState.password.length > 0 ? (errorState.password) : null}
                        />
                        <br/>
                    <button disabled={buttonDisable}>Sign up</button>
                </form>
            </Container>
            <Container maxWidth='sm' style={styles.registerFooter}>
                <div>
                    <p>Have an account already?<Link to="./">Log in</Link></p>
                </div>
            </Container>
        </div>
    )
}

const styles = {
    registerForm: {
        backgroundColor: 'gainsboro',

    },

    registerFooter: {
        backgroundColor: 'gainsboro',

    }
}