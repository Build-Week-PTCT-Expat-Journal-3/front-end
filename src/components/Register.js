import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Container, TextField, Button } from '@material-ui/core';

const formSchema = yup.object().shape({
    username: yup.string().required('Enter a username'),
    password: yup.string().required('Enter a password'),
    firstname: yup.string().required('Enter your first name'),
    location: yup.string().required('Enter your location')
})

export const Register = () => {
    const {push} = useHistory();
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
        axiosWithAuth()
            .post('auth/register', formState)
            .then( res => {
                console.log(res);
                push("/login")
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
            <Container maxWidth='xs' style={styles.registerForm}>
                <h1 style={styles.h1}>Expat Journal</h1>
                <h2 style={styles.h2}>Sign up to share your memories with friends and family</h2>
                <form onSubmit={formSubmit}>
                    <div>
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
                    </div>
                    <br/>
                    <div>
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
                    </div>
                    <br/>
                    <div>
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
                    </div>
                    <br/>
                    <div>
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
        margin: '.67em 0 0 0',
        
    },

    h2: {
        padding: '0 23.5%',
        color: 'lightgrey',
    },

    registerForm: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1%',
        backgroundColor: 'mintcream'

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
        width: '100%',
        maxWidth: '56%'
    }
}