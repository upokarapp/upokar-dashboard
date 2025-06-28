import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../context"
import { adminLogin } from "../../Api"
import Loader from '../loader';
import './login.css';
const LoginPage = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { state, dispatch } = useContext(Context);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (!name || !password) {
            setError('Please fill in all fields.');
            return;
        }

        // Reset error if fields are filled
        setError('');
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await adminLogin({ name, password });
            dispatch({ type: "LOADING", payload: false });
            dispatch({ type: "LOGIN_SUCCESS", payload: response });
            navigate('/');
        } catch (error) {
            dispatch({ type: "LOADING", payload: false });
            alert('Login failed. Please check your credentials.');
        }
    };
    if (state.isLoading) return <Loader />
    return (
        <section id='login'>
            <div className="login-page">
                <div className="login-container">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && <p className="error-message">{error}</p>}
                        <div className="input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Your Name"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Your Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <button type="submit" className="login-button">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
