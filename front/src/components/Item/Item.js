import { useId } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Item = ({ item }) => {
  const navigate = useNavigate();

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
      <StyledP>
        <b>상품명</b> : {item.itemName}
      </StyledP>
      <StyledP>
        <b>한마디</b>: {item.itemDesc}
      </StyledP>
    </ItemBlock>
  );
};

export default Item;

const ItemBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 380px;
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
`;
