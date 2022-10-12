import { useId } from "react";
import { useNavigate } from "react-router-dom";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const userId = useId();
  return (
    <>
      <li
        onClick={() => {
          navigate(`/item/:${userId}/edit`);
        }}
        key={useId}
      >
        <img src={item.itemImage} alt="상품" />
        <p>
          상품명 : <span>{item.itemName}</span>
        </p>
        <p>한마디: {item.description}</p>
      </li>
    </>
  );
};

export default Item;
