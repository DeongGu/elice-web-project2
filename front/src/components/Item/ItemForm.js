import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ItemForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    itemImage: "/assets/images/default.jpg",
    itemName: "",
    itemDetail: "",
    description: "",
  };

  const [item, setItem] = useState(initialValues);

  const encodeFile = async (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    try {
      reader.onload = async () => {
        const newItem = {
          ...item,
          itemImage: reader.result,
        };
        setItem(newItem);
      };
    } catch (err) {
      console.log(err);
    }
  };

  const { itemImage, itemName, itemDetail, description } = item;

  const isItemName = itemName.length >= 2 && itemName.length <= 25;
  const isItemDetail = itemDetail.length >= 2 && itemDetail.length <= 100;
  const isdescription = description.length >= 2 && description.length <= 30;

  const validate = isItemName && isItemDetail && isdescription;

  const handleChange = (e) => {
    const newItem = {
      ...item,
      [e.target.name]: e.target.value,
    };
    setItem(newItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { itemImage, itemName, itemDetail, description };

    try {
      await axios.post("http://localhost:5000/item", data).then((res) => {
        console.log("response:", res.data);
        navigate("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="itemImage">상품 이미지</label>
        <input
          type="file"
          name="itemImage"
          onChange={(e) => {
            encodeFile(e.target.files[0]);
          }}
          accept="image/*"
          multiple
        />

        <div className="preview">
          <StyledImage src={itemImage} alt="미리보기 이미지" />
        </div>

        <label htmlFor="itemName">상품명</label>
        <input
          onChange={handleChange}
          name="itemName"
          id="itemName"
          type="text"
          value={itemName}
        />
        <label htmlFor="itemDetail">상품소개</label>
        <input
          onChange={handleChange}
          name="itemDetail"
          id="itemDetail"
          type="text"
          value={itemDetail}
        />
        <label htmlFor="description">한 마디</label>
        <input
          type="text"
          onChange={handleChange}
          name="description"
          id="description"
          value={description}
        />
        <button disabled={!validate}>생성</button>
      </StyledForm>
    </>
  );
};

export default ItemForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  border: 1px solid black;
  width: 500px;
  height: 700px;
`;

const StyledImage = styled.img`
  width: 400px;
`;

const StyledInput = styled.input``;
