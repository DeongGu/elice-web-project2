import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemList from "../components/Item/ItemList.js";

const Main = (props) => {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    axios.get("/dummy/data.json").then((res) => {
      // console.log(res.data);
      setItemList(res.data);
    });
  }, []);

  return (
    <>
      <h1>여기는 메인페이지입니다.</h1>
      <ul>
        <li key={1}>
          <Link to="/prolog">
            <span>소개</span>
          </Link>
        </li>

        <li key={2}>
          <Link to="/item/create">
            <span>상품 생성</span>
          </Link>
        </li>
      </ul>

      <ul>
        <ItemList itemList={itemList}></ItemList>
      </ul>
    </>
  );
};

export default Main;
