import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import ItemCreate from "./pages/ItemCreate";
import ItemInfo from "./pages/ItemInfo";
import ItemEdit from "./components/Item/ItemForm";
import Header from "./components/UI/Header";
import Prolog from "./pages/Prolog";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/item/create" element={<ItemCreate />}></Route>
          <Route path="/item/:itemId" element={<ItemInfo />}></Route>
          <Route path="/item/:itemId/edit" element={<ItemEdit />}></Route>
          <Route path="/prolog" element={<Prolog />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
