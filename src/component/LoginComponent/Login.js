import React from 'react';
import './Login.css';
import { Button } from '@mui/material';
import { auth, provider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
const [state, dispatch] = useStateValue();

    const signIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user
                })
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png' alt='slack logo' />
                <h1>Sign in to DevX Solutions</h1>
                <p>devxsolutions.slack.com</p>
                <Button onClick={signIn} className='button'>Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
