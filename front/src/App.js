import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './components/Main/Main';
import UserInfo from './components/User/UserInfo';

import './App.css';

import { UserCheckContextProvider } from './context/UserCheckContext';

function App() {
  return (
    <UserCheckContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Main />} exact />
          <Route path='/:userid' element={<UserInfo />} />
        </Routes>
      </Router>
    </UserCheckContextProvider>
  );
}

export default App;
