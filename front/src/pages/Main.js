// import { useState } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ItemList from "../components/Item/ItemList.js";
import SlideBanner from "../components/UI/SlideBanner.js";

const Main = (props) => {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items", {
          headers: {
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        });
        setItemList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const [selected, setSelected] = useState("itemName");
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      await axios
        .get(`http://localhost:5000/items?search=${search}`, {
          headers: {
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setItemList(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <SlideBanner></SlideBanner>
      <MainBlock>
        <Search>
          <select onChange={handleSelect}>
            <option value="itemName">상품명</option>
            <option value="itemType">상품타입</option>
            <option value="itemDesc">한마디</option>
          </select>

          <input
            type={"text"}
            placeholder="검색하세요"
            onChange={handleChange}
            value={search}
          ></input>
          <button type="button" onClick={handleSearch}>
            검색
          </button>
        </Search>

        <StyledBtn onClick={() => navigate("/items")}>상품 생성</StyledBtn>

        <ItemList itemList={itemList}></ItemList>
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
