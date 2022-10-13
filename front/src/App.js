import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import RegisterForm from './components/User/RegisterForm';

import { UserCheckContextProvider } from './context/UserCheckContext';

function App() {
  return (
    <UserCheckContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<RegisterForm />} exact />
        </Routes>
      </Router>
    </UserCheckContextProvider>
  );
}

export default App;
