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
  const [initialList, setInitialList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items", {
          headers: {
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        });
        setItemList(response.data);
        setInitialList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const [selected, setSelected] = useState("itemName");
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

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

  useEffect(() => {
    if (checked) {
      const result = itemList.filter((item) => item.status === "inStock");
      setItemList(result);
    } else {
      setItemList(initialList);
    }
  }, [checked]);

  return (
    <>
      <SearchBlock>
        <select onChange={handleSelect}>
          <option value="all">통합검색</option>
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
      </SearchBlock>

      <SlideBanner></SlideBanner>
      <ItemBlock>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                setChecked(!checked);
              }}
            ></input>
            거래가능만 보기
          </label>
        </div>

        <StyledBtn onClick={() => navigate("/items")}>상품 생성</StyledBtn>
        <ItemList itemList={itemList}></ItemList>
      </ItemBlock>
    </>
  );
};

export default Main;

const ItemBlock = styled.div`
  display: flex;
  width: 1280px;
  margin: 30px auto;
  flex-direction: column;
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

const SearchBlock = styled.div`
  display: flex;
  justify-content: center;

  margin: 30px;

  & select {
    height: 60px;
    width: 150px;
    font-size: 25px;
  }

  input {
    margin-left: 10px;
    height: 54px;
    width: 500px;
    font-size: 25px;
  }

  button {
    margin-left: 10px;
    width: 90px;
    font-size: 25px;
  }
`;
