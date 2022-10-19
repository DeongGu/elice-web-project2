import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/UI/Header';

import About from './pages/About';
import Market from './pages/Market';
import User from './pages/User';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Market />} exact />
        <Route path='/about' element={<About />} />
        <Route path='/users' element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
