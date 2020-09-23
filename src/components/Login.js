  
import React, { useState, useEffect} from 'react';
import { Button, Container, TextField } from '@material-ui/core';
import * as yup from 'yup';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import { Link, useHistory } from 'react-router-dom';

const formSchema = yup.object().shape({
    username: yup.string().required('Enter your username'),
    password: yup.string().required('Enter your password')
});


export const Login = () => {
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
             <Container maxWidth='xs' style={styles.loginContainer}>
                <h1 style={styles.h1}>Expat Journal</h1>
                <form onSubmit={formSubmit} style={styles.loginForm}>
                    <div>
                        <TextField 
                            variant='outlined'
                            type='text'
                            name='username'
                            label= 'Username'
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
                            label= 'Password'
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
                            Login
                    </Button>
                </form>
            </Container>
            <Container maxWidth='xs' style={styles.loginFooter}>                
                <p>Don't have an account? <Link to="./register" style={styles.link}>Sign Up</Link></p>
            </Container>
        </div>
    )
}

const styles = {

    h1: {
        margin: '0 0 5% 0',
        textAlign: 'center',
        padding: '0 10%',
        fontSize: '4rem',
        fontFamily: 'Brush Script MT, Brush Script Std, cursive'

    },

    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '350px',
        padding: '1% 2% 2% 2%',
        border: '1px solid lightgrey',
        backgroundColor: 'mintcream'

    },

    loginForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 10%'
    },

    loginFooter: {
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