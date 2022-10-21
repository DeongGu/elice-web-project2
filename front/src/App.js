import './App.css';
import { createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useFetch from './hooks/useFetch';

import Header from './components/UI/Header';
import { GeneralContextProvider } from './context/GeneralContext';

import { CHECK_USER } from './api/Request';

import About from './pages/About';
import Main from './pages/Main';

import ItemCreate from './pages/ItemCreate';
import ItemPage from './pages/ItemPage';
import NotFound from './pages/NotFound';
import Footer from './components/UI/Footer';

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
            <Route path='/' element={<Main />} exact></Route>
            <Route path='/about' element={<About />} />
            <Route path='/items/:itemId' element={<ItemPage />}></Route>
            <Route path='/items' element={<ItemCreate />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Router>
        <Footer />
      </GeneralContextProvider>
    </UserContext.Provider>
  );
}

export default App;
