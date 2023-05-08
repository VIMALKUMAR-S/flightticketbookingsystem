import React, { useState } from 'react';
import classNames from 'classnames';
import '../styles/Login.scss';
import { useRecoilState } from 'recoil';
import { roleState, tokenState } from '../atom/atoms';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useRecoilState(tokenState)
    const [role, setRole] = useRecoilState(roleState)
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(
            'login', {
            "email": username,
            "password": password

        }
        ).then((res) => {
            console.log(res)
            var tem = res.data.split(' ')
            setToken(tem[0])
            localStorage.setItem('jwt', tem[0])
            setRole(tem[1])
            localStorage.setItem('role', tem[1])
            toast.success("Logged in...")
            navigate("../home")


        })

    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <label className="login-form__label">
                Email/Username:
                <input type="email" name="username" value={username} onChange={handleInputChange} className="login-form__input" />
            </label>
            <label className="login-form__label">
                Password:
                <input type="password" name="password" value={password} onChange={handleInputChange} className="login-form__input" />
            </label>
            {error && <div className="login-form__error">{error}</div>}
            <button type="submit" className={classNames('login-form__button', { 'login-form__button--disabled': !username || !password })} disabled={!username || !password}>
                Log In
            </button>
            <span>
                <a href='/signup'>
                    Don't have account ?
                </a>
            </span>
        </form>
    );
};

export default Login;
