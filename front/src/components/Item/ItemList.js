import Item from "./Item";

import styled from "styled-components";

const ItemList = ({ itemList }) => {
  return (
    <ItemListBlock>
      {itemList.map((item, idx) => {
        return <Item item={item} key={idx} />;
      })}
    </ItemListBlock>
  );
};

export default ItemList;

const ItemListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
