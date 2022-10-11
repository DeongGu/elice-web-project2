import React from "react";
import { Link } from "react-router-dom";

const Main = (props) => {
  return (
    <>
      <h1>여기는 메인페이지입니다.</h1>
      <ul>
        <li>
          <Link to="/prolog">
            <span>소개</span>
          </Link>
        </li>

        <li>
          <Link to="/item/create">
            <span>상품 생성</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Main;
