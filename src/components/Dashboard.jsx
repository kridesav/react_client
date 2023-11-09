import { useAuth } from './AuthContext';
import LoginForm from './LoginForm';
import CheckTicket from './CheckTicket';

function Dashboard() {
  const { auth } = useAuth();
  return auth ? <CheckTicket /> : <LoginForm />;
}

export default Dashboard;