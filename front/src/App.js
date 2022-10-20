import { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useFetch from './hooks/useFetch';

import { GeneralContextProvider } from './context/GeneralContext';

import { CHECK_USER } from './api/Request';

import Header from './components/UI/Header';

import About from './pages/About';
import Market from './pages/Market';
import User from './pages/User';

import './App.css';

export const UserContext = createContext(null);

function App() {
  const { data: user, setData: setUser, isLoading } = useFetch(CHECK_USER);

  const logoutHandler = () => {
    setUser(null);
    sessionStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutHandler, isLoading }}>
      <GeneralContextProvider>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<Market />} exact />
            <Route path='/about' element={<About />} />
            <Route path='/users/my-profile' element={<User />} exact />
            <Route path='/users/:userId' element={<User />} />
          </Routes>
        </Router>
      </GeneralContextProvider>
    </UserContext.Provider>
  );
}

export default App;
