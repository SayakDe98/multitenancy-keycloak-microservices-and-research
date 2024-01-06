import './App.css';
import Public from './components/Public';
import Protected from './components/Protected';
import useAuth from './hooks/useAuth';

function App() {
  const [isLogin, token] = useAuth();
  return isLogin ? <Protected /> : <Public />;
}

export default App;