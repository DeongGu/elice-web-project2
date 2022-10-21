import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ItemForm = () => {
  const portNum = 5000;
  const url = "http://" + window.location.hostname + ":" + portNum + "/";

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      alert("로그인부탁드려요^^");
      navigate("/");
    }
  }, []);

  const initialValues = {
    itemImage: "/assets/images/default.png",
    itemName: "",
    itemCategory: "기타",
    itemType: "",
    itemDesc: "",
    openChat: "",
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

  const { itemImage, itemName, itemType, itemDesc, openChat, itemCategory } =
    item;

  const isItemName = itemName?.length >= 2 && itemName?.length <= 30;
  const isItemDetail = itemType?.length >= 2 && itemType?.length <= 100;
  const isItemDesc = itemDesc?.length >= 2 && itemDesc?.length <= 30;
  const isOpenChat = openChat?.length >= 2;
  const isItemCategory = itemCategory;

  const validate =
    isItemName && isItemDetail && isItemDesc && isOpenChat && isItemCategory;

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
    formData.append("openChat", openChat);
    formData.append("itemCategory", itemCategory);

    try {
      axios
        .post(`${url}items`, formData, {
          headers: {
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log("response:", res.data.message);
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

      <Styledfieldset>
        <StyledLegend>상품카테고리</StyledLegend>
        <StyledLabel>
          <input
            onChange={handleChange}
            type="radio"
            value="상의"
            name="itemCategory"
            checked={itemCategory === "상의"}
          />
          상의
        </StyledLabel>
        <StyledLabel>
          <input
            onChange={handleChange}
            type="radio"
            value="하의"
            name="itemCategory"
            checked={itemCategory === "하의"}
          />
          하의
        </StyledLabel>
        <StyledLabel>
          <input
            onChange={handleChange}
            type="radio"
            value="아우터"
            name="itemCategory"
            checked={itemCategory === "아우터"}
          />
          아우터
        </StyledLabel>
        <StyledLabel>
          <input
            onChange={handleChange}
            type="radio"
            value="모자"
            name="itemCategory"
            checked={itemCategory === "모자"}
          />
          모자
        </StyledLabel>
        <StyledLabel>
          <input
            onChange={handleChange}
            type="radio"
            value="기타"
            name="itemCategory"
            checked={itemCategory === "기타"}
          />
          기타
        </StyledLabel>
      </Styledfieldset>

      <StyledLabel htmlFor="itemType">상품타입</StyledLabel>
      <StyledInput
        onChange={handleChange}
        name="itemType"
        id="itemType"
        type="text"
        value={itemType}
        placeholder="바지, 상의"
      />
      <StyledLabel htmlFor="itemDesc">한 마디</StyledLabel>
      <StyledInput
        type="text"
        onChange={handleChange}
        name="itemDesc"
        id="itemDesc"
        value={itemDesc}
        placeholder="예시) 나의 추억이었고, 즐거움이었습니다."
      />

      <StyledLabel htmlFor="openChat">오픈카톡방 주소</StyledLabel>
      <StyledInput
        type="text"
        onChange={handleChange}
        name="openChat"
        id="openChat"
        value={openChat}
        placeholder="필수 입력 사항입니다."
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
  border: 1rem solid gray;
  outline: 1rem solid lightgray;
  border-radius: 20px;
  width: 500px;
  height: 1000px;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  width: 490px;
  height: 290px;
  object-fit: contain;
`;

const StyledPreview = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 20px;
`;
const StyledInput = styled.input`
  margin: 10px 20px;
  height: 50px;
`;

const StyledBtn = styled.button`
  width: 200px;
  height: 50px;
  margin: 30px auto;
  background-color: rgb(119, 187, 63);
  color: white;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: rgba(119, 187, 63, 0.5);
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
  margin-top: 10px;
  & + & {
    margin: 5px;
  }
  cursor: pointer;
`;

const Styledfieldset = styled.fieldset`
  border: 1px solid black;
  margin: 10px auto;
  width: 430px;
  padding-bottom: 13px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledLegend = styled.legend`
  margin: 10px 0;
`;
