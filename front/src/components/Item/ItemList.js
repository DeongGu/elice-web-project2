import Item from "./Item";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ItemList = () => {
  const [itemList, setItemList] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await axios.get("/dummy/data.json");
        setItemList(response.data);
      } catch (err) {
        console.log(err);
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

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
`;
