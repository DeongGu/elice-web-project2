import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ItemInfo = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [isMyItem, setIsMyItem] = useState(true);

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

  useEffect(() => {
    //토큰 보내서 유저 확인 후에 상품id에 맞는 정보 얻기
    const fetchData = async () => {
      try {
        const response = await axios.get("/dummy/item.json");
        setItem(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const { itemImage, itemName, itemDetail, description } = item;

  const handleChange = () => {};
  const handleSubmit = () => {};

  /* 찜하기 버튼 - 클릭했을때 로그인 상태 확인, //로그인 o 상품정보에 */
  /* 찜(배열)에 유저id 넣기 //로그인 x 로그인 모달창 or 로그인하라는 메시지창 */

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel htmlFor="itemImage">상품 이미지</StyledLabel>
      {isEdit ? (
        <StyledInput
          type="file"
          name="itemImage"
          onChange={(e) => {
            encodeFile(e.target.files[0]);
          }}
          accept="image/*"
          multiple
        />
      ) : null}
      <StyledPreview>
        <StyledImage src={itemImage} alt="미리보기 이미지" />
      </StyledPreview>
      <StyledLabel htmlFor="itemName">상품명</StyledLabel>
      {isEdit ? (
        <StyledInput
          onChange={handleChange}
          name="itemName"
          id="itemName"
          type="text"
          value={itemName}
        />
      ) : (
        <StyledP>{itemName}</StyledP>
      )}
      <StyledLabel htmlFor="itemDetail">상품소개</StyledLabel>
      {isEdit ? (
        <StyledInput
          onChange={handleChange}
          name="itemDetail"
          id="itemDetail"
          type="text"
          value={itemDetail}
        />
      ) : (
        <StyledP>{itemDetail}</StyledP>
      )}
      <StyledLabel htmlFor="description">한 마디</StyledLabel>
      {isEdit ? (
        <StyledInput
          type="text"
          onChange={handleChange}
          name="description"
          id="description"
          value={description}
        />
      ) : (
        <StyledP>{description}</StyledP>
      )}
      <ButtonBlock>
        {isEdit ? (
          <>
            <StyledBtn>완료</StyledBtn>
            <StyledBtn type="button">삭제</StyledBtn>
          </>
        ) : (
          <>
            <StyledBtn type="button">찜하기</StyledBtn>
            <StyledBtn type="button">배송메시지</StyledBtn>
          </>
        )}

        {isMyItem ? (
          <>
            <StyledBtn
              type="button"
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "취소" : "편집"}
            </StyledBtn>
          </>
        ) : null}
      </ButtonBlock>
    </StyledForm>
  );
};

export default ItemInfo;

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
  width: 100px;
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

const StyledP = styled.p`
  margin: 10px 20px;
  height: 30px;
`;
