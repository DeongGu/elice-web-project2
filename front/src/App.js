import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Main from './components/Main/Main';
import UserInfo from './components/Main/UserInfo';

import { UserCheckContextProvider } from './context/UserCheckContext';

function App() {
  return (
    <UserCheckContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} exact />
          <Route path='/users' element={<UserInfo />} />
        </Routes>
      </Router>
    </UserCheckContextProvider>
  );
}

export default App;
