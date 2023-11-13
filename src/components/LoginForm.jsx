import { useState } from 'react'
import { useAuth } from './AuthContext';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, apiServer } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = btoa(`${username}:${password}`);
      const response = await fetch(`${apiServer}`, {
        headers: {
          'Authorization': `Basic ${credentials}`
        }
      });
  
      if (response.ok) {
        // Login successful
        login(username, password);
        alert('Login successful');
      } else {
        // Login failed
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
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
  )
}

export default LoginForm