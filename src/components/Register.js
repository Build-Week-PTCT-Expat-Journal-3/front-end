import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from '@material-ui/core';
import { findByLabelText } from '@testing-library/react';

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
            <Container maxWidth='xs' style={styles.registerForm}>
                <h1 style={styles.h1}>Expat Journal</h1>
                <div>
                    <h2 style={styles.h2}>Sign up to share your memories with friends and family</h2>
                </div>
                <form onSubmit={formSubmit}>
                    <div>
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
                    </div>
                    <br/>
                    <div>
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
                    </div>
                    <br/>
                    <div>
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
                    </div>
                    <br/>
                    <div>
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
                    </div>
                        <br/>
                    <Button 
                        type='submit'
                        variant='contained'
                        color='primary' 
                        disabled={buttonDisable}
                        style={styles.button}>
                            Sign up
                    </Button>
                </form>
            </Container>
            <Container maxWidth='xs' style={styles.registerFooter}>
                <div>
                    <p>Have an account? <Link to="./" style={styles.link}>Log in</Link></p>
                </div>
            </Container>
        </div>
    )
}

const styles = {

    h1: {
        margin: '.67em 0 0 0'
    },

    h2: {
        padding: '0 23.5%',
        color: 'lightgrey',
    },

    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1%',
        backgroundColor: 'mintcream',

    },

    registerFooter: {
        marginTop: '1%',
        padding: '.5%',
        backgroundColor: 'mintcream',

    },

    link: {
        textDecoration: 'none'
    },

    button: {
        width: '53%',
    }
}