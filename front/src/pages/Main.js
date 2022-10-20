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

  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/items");
        setItemList(response.data);
        setInitialList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState(false);

  const enterSearch = async (e) => {
    if (e.key === "Enter") {
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
    }
  };

  const handleSearch = async (e) => {
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

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleCategory = (e) => {
    if (e.target.checked) {
      const newCategory = [...category, e.target.value];
      setCategory(newCategory);

      if (category.length === 1) {
        const filterItems = itemList.filter(
          (item) => item.itemCategory === category[0]
        );
        setItemList(filterItems);
      } else if (category.length === 2) {
        const filterItems = itemList.filter(
          (item) => item.itemCategory === (category[0] || category[1])
        );
        setItemList(filterItems);
      } else if (category.length === 3) {
        const filterItems = itemList.filter(
          (item) =>
            item.itemCategory === (category[0] || category[1] || category[2])
        );
        setItemList(filterItems);
      } else if (category.length === 4) {
        const filterItems = itemList.filter(
          (item) =>
            item.itemCategory ===
            (category[0] || category[1] || category[2] || category[3])
        );
        setItemList(filterItems);
      } else if (category.length === 5) {
        const filterItems = itemList.filter(
          (item) =>
            item.itemCategory ===
            (category[0] ||
              category[1] ||
              category[2] ||
              category[3] ||
              category[4])
        );
        setItemList(filterItems);
      }
    } else {
      const newCategory = [...category];
      const result = newCategory.filter((el) => el !== e.target.value);
      setCategory(result);
      if (category.length === 1) {
        const filterItems = itemList.filter(
          (item) => item.itemCategory === category[0]
        );
        setItemList(filterItems);
      } else if (category.length === 2) {
        const filterItems = itemList.filter(
          (item) => item.itemCategory === (category[0] || category[1])
        );
        setItemList(filterItems);
      } else if (category.length === 3) {
        const filterItems = itemList.filter(
          (item) =>
            item.itemCategory === (category[0] || category[1] || category[2])
        );
        setItemList(filterItems);
      } else if (category.length === 4) {
        const filterItems = itemList.filter(
          (item) =>
            item.itemCategory ===
            (category[0] || category[1] || category[2] || category[3])
        );
        setItemList(filterItems);
      } else if (category.length === 5) {
        const filterItems = itemList.filter(
          (item) =>
            item.itemCategory ===
            (category[0] ||
              category[1] ||
              category[2] ||
              category[3] ||
              category[4])
        );
        setItemList(filterItems);
      }
    }
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
    <MainBlock>
      <SearchBlock>
        <input
          type={"text"}
          placeholder="검색하세요"
          onChange={handleChange}
          value={search}
          onKeyDown={enterSearch}
        ></input>
        <button type="button" onClick={handleSearch}>
          검색
        </button>
      </SearchBlock>
      <FilterBlock>
        <StyleLegend
          onClick={() => {
            setVisible((preState) => !preState);
          }}
        >
          정렬 카테고리 ✅
        </StyleLegend>

        {visible ? (
          <IndexBlock>
            <StyledLabel>
              <input
                type="checkbox"
                name="상의"
                value="상의"
                onChange={handleCategory}
              ></input>
              상의
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="하의"
                value="하의"
                onChange={handleCategory}
              ></input>
              하의
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="아우터"
                value="아우터"
                onChange={handleCategory}
              ></input>
              아우터
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="모자"
                value="모자"
                onChange={handleCategory}
              ></input>
              모자
            </StyledLabel>
            <StyledLabel>
              <input
                type="checkbox"
                name="기타"
                value="기타"
                onChange={handleCategory}
              ></input>
              기타
            </StyledLabel>
          </IndexBlock>
        ) : null}
      </FilterBlock>

      <SlideBanner></SlideBanner>
      <ItemBlock>
        <div>
          <label>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => {
                setChecked((preState) => !preState);
              }}
            ></input>
            거래가능만 보기
          </label>
        </div>

        <StyledBtn onClick={() => navigate("/items")}>상품 생성</StyledBtn>
        <ItemList itemList={itemList}></ItemList>
      </ItemBlock>
    </MainBlock>
  );
};

export default Main;

const MainBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemBlock = styled.div`
  display: flex;
  width: 1280px;
  margin: 30px auto;
  flex-direction: column;
`;

const StyledBtn = styled.button`
  display: block;
  width: 100px;
  margin: 0 0 0 auto;
  height: 50px;
  cursor: pointer;
  border-radius: 15px;
  border: none;
  font-size: 20px;
  color: white;
  background-color: rgb(119, 187, 63);

  &:hover {
    background-color: rgba(119, 187, 63, 0.3);
  }
`;

const SearchBlock = styled.div`
  display: flex;
  justify-content: center;

  margin: 30px;

  input {
    margin-left: 10px;
    height: 54px;
    width: 600px;
    font-size: 25px;
  }

  button {
    margin-left: 10px;
    width: 90px;
    font-size: 25px;
  }
`;

const FilterBlock = styled.fieldset`
  position: relative;
  border: none;
  width: 500px;
  margin: 0 auto;

  font-size: 20px;
`;

const IndexBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 90px;
  width: 330px;
  height: 100px;
  border: 2px solid rgba(0, 0, 0, 0.4);
  z-index: 10;
  background-color: white;
  border-radius: 40px;
`;

const StyleLegend = styled.legend`
  cursor: pointer;
`;

const StyledLabel = styled.label`
  & {
    margin-right: 10px;
  }
`;
