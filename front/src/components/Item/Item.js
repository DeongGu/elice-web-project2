import { useId } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Item = ({ item }) => {
  const navigate = useNavigate();

  let status = "";
  const currentTime = new Date();

  const createTime = new Date(item.createdAt);

  const dday = currentTime.getTime() - createTime.getTime();

  const day = dday / (1000 * 60 * 60 * 24);
  const hour = dday / (1000 * 60 * 60);
  const minute = dday / (1000 * 60);

  let result = 0;
  let answer = "";

  if (day >= 1) {
    result = day;
    answer = `${Math.floor(result)}일 전`;
  } else if (hour >= 1) {
    result = hour;
    answer = `${Math.floor(result)}시간 전`;
  } else {
    result = minute;
    answer = `${Math.floor(result)}분 전`;
  }

  if (item.status === "inStock") {
    status = "거래가능";
  } else if (item.status === "outOfStock") {
    status = "거래완료";
  } else {
    status = "거래 중";
  }
  return (
    <ItemBlock
      onClick={() => {
        navigate(`/items/${item.itemId}`);
      }}
      key={useId}
    >
      {item.itemImage ? (
        <StyledImg src={item.itemImage[0]} alt="상품" />
      ) : (
        <StyledImg src={"assets/images/default.png"} alt="상품" />
      )}
      <Status>{status}</Status>
      <StyledP>
        <b>상품명</b> : {item.itemName}
      </StyledP>
      <StyledP>
        <b>한마디</b>: {item.itemDesc}
      </StyledP>
      <Time>{answer}</Time>
    </ItemBlock>
  );
};

export default Item;

const ItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  width: 250px;
  height: 400px;
  margin-bottom: 20px;
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  &:active {
    position: relative;
    top: 4px;
  }
`;
const StyledImg = styled.img`
  width: 230px;
  height: 300px;
  object-fit: cover;
`;

const StyledP = styled.p`
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-bottom: 8px;
`;

const Status = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 95px;
  left: 18px;
  width: 60px;
  border: 1px solid black;
  color: white;
  background-color: red;
  text-align: center;
`;

const Time = styled.div`
  position: absolute;
  z-index: 10;
  text-align: center;
  bottom: 0;
  color: rgba(0, 0, 0, 0.2);
  right: 20px;
`;
