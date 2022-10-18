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
        <StyledImg src={item.itemImage} alt="상품" />
      ) : (
        <StyledImg src={"assets/images/default.jpg"} alt="상품" />
      )}
      <p>
        상품명 : <span>{item.itemName}</span>
      </p>
      <p>한마디: {item.itemDesc}</p>
    </ItemBlock>
  );
};

export default Item;

const ItemBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledImg = styled.img`
  width: 300px;
`;
