import { useId } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const userId = useId();
  return (
    <ItemBlock
      onClick={() => {
        navigate(`/item/:${userId}`);
      }}
      key={useId}
    >
      <StyledImg src={item.itemImage} alt="상품" />
      <p>
        상품명 : <span>{item.itemName}</span>
      </p>
      <p>한마디: {item.description}</p>
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
