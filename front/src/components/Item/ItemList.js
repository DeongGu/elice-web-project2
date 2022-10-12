import Item from "./Item";

const ItemList = ({ itemList }) => {
  return (
    <>
      {itemList &&
        itemList.map((item, idx) => {
          return <Item item={item} key={idx} />;
        })}
    </>
  );
};

export default ItemList;
