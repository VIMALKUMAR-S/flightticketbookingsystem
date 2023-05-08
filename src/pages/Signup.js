import React, { useState } from 'react';
import classNames from 'classnames';
import '../styles/Signup.scss';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirm_password') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            toast.error('Passwords do not match')

        } else {
            axios.post(
                'signup',
                {
                    "email": email,
                    "password": password
                }
            ).then((res) => {

                toast.success("Account Created")

            }).catch((err) => {
                toast.error(err.data.msg)

            })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <label className="signup-form__label">
                Email:
                <input type="email" name="email" value={email} onChange={handleInputChange} className="signup-form__input" />
            </label>
            <label className="signup-form__label">
                Password:
                <input type="password" name="password" value={password} onChange={handleInputChange} className="signup-form__input" />
            </label>
            <label className="signup-form__label">
                Confirm Password:
                <input type="password" name="confirm_password" value={confirmPassword} onChange={handleInputChange} className="signup-form__input" />
            </label>
            {error && <div className="signup-form__error">{error}</div>}
            <button type="submit" className={classNames('signup-form__button', { 'signup-form__button--disabled': password !== confirmPassword })} disabled={password !== confirmPassword}>
                Sign Up
            </button>
            <span>
                <a href='../'>click here to login</a>
            </span>
        </form>
    );
};

export default Signup;
