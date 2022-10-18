import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/");
      alert("로그인부탁드려요^^");
    }
  }, []);

  const initialValues = {
    itemImage: "/assets/images/default.jpg",
    itemName: "",
    itemType: "",
    itemDesc: "",
  };

  const [item, setItem] = useState(initialValues);
  // const [createSuccess, setCreateSucess] = useState(false);

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

  const { itemImage, itemName, itemType, itemDesc } = item;

  const isItemName = itemName.length >= 2 && itemName.length <= 25;
  const isItemDetail = itemType.length >= 2 && itemType.length <= 100;
  const isItemDesc = itemDesc.length >= 2 && itemDesc.length <= 30;

  const validate = isItemName && isItemDetail && isItemDesc;

  const handleChange = (e) => {
    const newItem = {
      ...item,
      [e.target.name]: e.target.value,
    };
    setItem(newItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const files = e.target.itemImage.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    formData.append("itemName", itemName);
    formData.append("itemDesc", itemDesc);
    formData.append("itemType", itemType);

    try {
      axios
        .post("http://localhost:5000/items", formData, {
          headers: {
            // "content-Type": "multipart/form-data",
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log("response:", res.data);
          alert("상품 생성 성공");
          navigate("/");
        });
    } catch (err) {
      console.log(err);
      alert("상품 생성 실패");
      setItem(initialValues);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit} enctype="multipart/form-data">
      <StyledLabel htmlFor="itemImage">상품 이미지</StyledLabel>
      <StyledInput
        type="file"
        name="itemImage"
        onChange={(e) => {
          encodeFile(e.target.files[0]);
        }}
        accept="image/*"
        multiple
      />

      <StyledPreview>
        <StyledImage src={itemImage} alt="미리보기 이미지" />
      </StyledPreview>

      <StyledLabel htmlFor="itemName">상품명</StyledLabel>
      <StyledInput
        onChange={handleChange}
        name="itemName"
        id="itemName"
        type="text"
        value={itemName}
      />
      <StyledLabel htmlFor="itemType">상품타입</StyledLabel>
      <StyledInput
        onChange={handleChange}
        name="itemType"
        id="itemType"
        type="text"
        value={itemType}
      />
      <StyledLabel htmlFor="itemDesc">한 마디</StyledLabel>
      <StyledInput
        type="text"
        onChange={handleChange}
        name="itemDesc"
        id="itemDesc"
        value={itemDesc}
      />

      <ButtonBlock>
        <StyledBtn disabled={!validate}>생성</StyledBtn>
        <StyledBtn
          onClick={() => {
            navigate("/");
          }}
        >
          취소
        </StyledBtn>
      </ButtonBlock>
    </StyledForm>
  );
};

export default ItemForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  border: 1px solid black;
  width: 500px;
  height: 800px;
  box-sizing: content-box;
`;

const StyledImage = styled.img`
  max-width: 490px;
  max-height: 300px;
`;

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 50px;
`;
const StyledInput = styled.input`
  margin: 10px 20px;
  height: 30px;
`;

const StyledBtn = styled.button`
  width: 200px;
  height: 50px;
  margin: 30px auto;
  background-color: rgb(83, 151, 223);
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(83, 151, 223, 0.5);
  }

  &:active {
    position: relative;
    top: 2px;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  margin: 10px 0 0 20px;
`;
