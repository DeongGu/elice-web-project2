import { useId } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Item = ({ item }) => {
  const navigate = useNavigate();

  return (
    <ItemBlock
      onClick={() => {
        navigate(`/item/:${item.id}`);
      }}
      key={useId}
    >
      <StyledImg src={item.itemImage} alt="상품" />
      <p>
        상품명 : <span>{item.item_name}</span>
      </p>
      <p>한마디: {item.item_desc}</p>
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
