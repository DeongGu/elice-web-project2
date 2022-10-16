import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
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
      <BrowserRouter>
        <GlobalStyle></GlobalStyle>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/item/:itemId/edit" element={<ItemEdit />}></Route>
          <Route path="/item/:itemId" element={<ItemPage />}></Route>
          <Route path="/item" element={<ItemCreate />}></Route>
          <Route path="/prolog" element={<Prolog />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
