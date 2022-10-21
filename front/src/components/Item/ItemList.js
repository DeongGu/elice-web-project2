import Item from "./Item";

import styled from "styled-components";

const ItemList = ({ itemList }) => {
  return (
    <ItemListBlock>
      {itemList.length > 0
        ? itemList.map((item, idx) => {
            return <Item item={item} key={idx} />;
          })
        : null}
    </ItemListBlock>
  );
};

export default ItemList;

const ItemListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1280px;
  margin: 30px auto;

  @media (max-width: 1280px) {
    width: 960px;
  }
  @media (max-width: 990px) {
    width: 640px;
  }
  @media (max-width: 430px) {
    width: 300px;
  }
`;
