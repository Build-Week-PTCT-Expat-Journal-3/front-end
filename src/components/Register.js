import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, TextField, Button } from '@material-ui/core';
import { findByLabelText } from '@testing-library/react';

const formSchema = yup.object().shape({
    username: yup.string().required('Enter a username'),
    password: yup.string().required('Enter a password'),
    firstname: yup.string().required('Enter your first name'),
    location: yup.string().required('Enter your location')
})

export const Register = () => {

    const [buttonDisable, setButtonDisable] = useState(true);
    
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        firstname: '',
        location: ''
    })

    const [errorState, setErrorState] = useState({
        username: '',
        password: '',
        firstname: '',
        location: ''
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
            .post('https://expat-journalp16.herokuapp.com/api/auth/register', formState)
            .then( res => {
                console.log(res);
                setUser([...user, res.data]);
                setFormState({
                    username: '',
                    password: '',
                    firstname: '',
                    location: ''
                })
            })
            .catch( err => console.log(err));
    };

    return (
        <div>
            <Container maxWidth='xs' style={styles.registerContainer}>
                <h1 style={styles.h1}>Expat Journal</h1>
                <h2 style={styles.h2}>Sign up to share your memories with friends and family</h2>
                <form onSubmit={formSubmit} style={styles.registerForm}>
                        <TextField 
                            variant='outlined'
                            type='text'
                            name='username'
                            label='Username'
                            value={formState.username}
                            onChange={inputChange}
                            error={errorState.username.length > 0 ? true : null}
                            helperText={errorState.username.length > 0 ? (errorState.username) : null}
                        />
                    <br/>
                        <TextField 
                            variant='outlined'
                            type='password'
                            name='password'
                            label='Password'
                            value={formState.password}
                            onChange={inputChange}
                            error={errorState.password.length > 0 ? true : null}
                            helperText={errorState.password.length > 0 ? (errorState.password) : null}
                        />
                    <br/>
                        <TextField  
                            variant='outlined'
                            type='text'
                            name='firstname'
                            label='First Name'
                            value={formState.firstname}
                            onChange={inputChange}
                            error={errorState.firstname.length > 0 ? true : null}
                            helperText={errorState.firstname.length > 0 ? (errorState.firstname) : null}
                        />
                    <br/>
                        <TextField  
                            variant='outlined'
                            type='text'
                            name='location'
                            label='Location'
                            value={formState.location}
                            onChange={inputChange}
                            error={errorState.location.length > 0 ? true : null}
                            helperText={errorState.location.length > 0 ? (errorState.location) : null}
                        />
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
                <p>Have an account? <Link to="./" style={styles.link}>Log in</Link></p>
            </Container>
        </div>
    )
}

const styles = {

    h1: {
        margin: '0',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 10%',
        fontSize: '4rem',
        fontFamily: 'Brush Script MT, Brush Script Std, cursive'
        
    },

    h2: {
        justifyContent: 'center',
        padding: '0 10%',
        textAlign: 'center',
        fontSize: '1.25rem',
        color: 'darkgrey',
    },

    registerContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '350px',
        padding: '2%',
        border: '1px solid lightgrey',
        backgroundColor: 'mintcream'

    },

    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10%'
    },

    registerFooter: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1%',
        padding: '.5%',
        maxWidth: '350px',
        border: '1px solid lightgrey',
        backgroundColor: 'mintcream',

    },

    link: {
        textDecoration: 'none'
    },

    button: {
        width: '100%',

    }
}