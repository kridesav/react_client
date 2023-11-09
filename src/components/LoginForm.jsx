import React, { useState } from 'react'
import axios from 'axios';

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://ticketguru-tg.rahtiapp.fi/login', {
                username: username,
                password: password,
            });
            // vastauksen käsittely tähän
            console.log('kirjautuminen onnistui', response.data);
        } catch (error) {
            // Virheen käsittely tähän
            console.log('kirjautuminen epäonnistu', error)
        }
    }

    return (
        <>
            <div>
                <h1>Login to TicketGuru service</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="inputText">
                        <p>Username</p>
                        <input
                            id="username"
                            autoComplete="username"
                            className="inputContainer"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" />
                    </div>
                    <div className="inputText">
                        <p>Password</p>
                        <input
                            id="password"
                            autoComplete="current-password"
                            className="inputContainer"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                    </div>
                    <div className="space"></div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
                <small className="copyright">&copy; SK(R)UM team</small>
            </div>
        </>
    )
}

export default LoginForm;