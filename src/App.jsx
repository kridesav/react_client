import './App.css';
import { AuthProvider } from './components/AuthContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;