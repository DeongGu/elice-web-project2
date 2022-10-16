// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ItemList from "../components/Item/ItemList.js";
import SlideBanner from "../components/UI/SlideBanner.js";

const Main = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <SlideBanner></SlideBanner>
      <MainBlock>
        <Search>
          <select>
            <option value="1">인기순</option>
            <option value="2">조회순</option>
            <option value="3">상품명</option>
            <option value="4">한마디</option>
          </select>
          <input type={"text"} placeholder="검색하세요"></input>
          <button>검색</button>
        </Search>

        <StyledBtn onClick={() => navigate("/item")}>상품 생성</StyledBtn>

        <ItemList></ItemList>
      </MainBlock>
    </>
  );
};

export default Main;

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
`;

const Search = styled.div`
  margin: 30px;

  & select {
    height: 40px;
  }

  input {
    margin-left: 10px;
    height: 35px;
    width: 200px;
  }

  button {
    margin-left: 10px;
    height: 30px;
  }
`;

const StyledBtn = styled.button`
  display: block;
  width: 100px;
  margin: 0 1000px;
  height: 50px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  background-color: rgba(23, 255, 256, 0.7);

  &:hover {
    background-color: rgba(23, 255, 256, 0.3);
  }
`;
