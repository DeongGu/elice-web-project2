import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";

import UserInfo from "./components/Main/UserInfo";

import { UserCheckContextProvider } from "./context/UserCheckContext";

import ItemCreate from "./pages/ItemCreate";
import ItemPage from "./pages/ItemPage";
import ItemEdit from "./components/Item/ItemForm";
import Header from "./components/UI/Header";
import Prolog from "./pages/Prolog";
import NotFound from "./pages/NotFound";
import GlobalStyle from "./style/GlobalStyle";

function App() {
  return (
    <div className="App">
      <UserCheckContextProvider>
        <Router>
          <GlobalStyle></GlobalStyle>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} exact></Route>
            <Route path="/users" element={<UserInfo />} />
            <Route path="/item/:itemId/edit" element={<ItemEdit />}></Route>
            <Route path="/item/:itemId" element={<ItemPage />}></Route>
            <Route path="/item" element={<ItemCreate />}></Route>
            <Route path="/prolog" element={<Prolog />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </UserCheckContextProvider>
    </div>
  );
}

export default App;
