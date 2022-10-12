import { Link } from "react-router-dom";
import Item from "../components/Item/Item.js";

const ItemInfo = () => {
  return (
    <>
      <Item></Item>
      <Link to="/item/:itemId/edit">
        <span>상품편집</span>
      </Link>
    </>
  );
};

export default ItemInfo;
