import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ItemInfo = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/");
      alert("로그인부탁드려요^^");
    }
  }, []);

  const [item, setItem] = useState({
    itemImage: "/assets/images/default.jpg",
    itemName: "",
    itemType: "",
    itemDesc: "",
    userId: "",
    editable: false,
    status: "inStock",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/items/${itemId}`,
          {
            headers: {
              Authentication: `${sessionStorage.getItem("accessToken")}`,
            },
          }
        );
        setItem(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const { itemImage, itemName, itemType, itemDesc, editable, status } = item;

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

  const isItemName = itemName.length >= 0 && itemName.length <= 25;
  const isItemType = itemType.length >= 0 && itemType.length <= 100;
  const isItemDesc = itemDesc.length >= 0 && itemDesc.length <= 30;

  const validate = isItemName && isItemType && isItemDesc;

  const handleChange = (e) => {
    const newItem = {
      ...item,
      [e.target.name]: e.target.value,
    };
    setItem(newItem);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const files = e.target.itemImage.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    formData.append("itemName", itemName);
    formData.append("itemDesc", itemDesc);
    formData.append("itemType", itemType);
    formData.append("status", status);

    try {
      await axios
        .put(`http://localhost:5000/items/${itemId}`, formData, {
          headers: {
            // "content-type": "multipart/form-data",
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log("response:", res.data);
          alert("수정되었습니다.");
          setIsEdit(false);
          navigate(`/items/${itemId}`);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      await axios
        .delete(`http://localhost:5000/items/${itemId}`, {
          headers: {
            Authentication: `${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log("삭제되었습니다.");
          alert("삭제되었습니다.");
          navigate("/");
        });
    } catch (err) {
      console.log(err);
    }
  };

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
        <StyledImage
          src={itemImage || "/assets/images/default.jpg"}
          alt="미리보기 이미지"
        />
      </StyledPreview>

      <StyledStatusBlock>
        {isEdit ? (
          <>
            <label>
              <input
                type="radio"
                onChange={handleChange}
                name="status"
                id="inStock"
                value="inStock"
              ></input>
              거래가능
            </label>
            <label>
              <input
                type="radio"
                onChange={handleChange}
                name="status"
                id="onTrading"
                value="onTrading"
              ></input>
              거래중
            </label>
            <label>
              <input
                type="radio"
                onChange={handleChange}
                name="status"
                id="outOfStock"
                value="outOfStock"
              ></input>
              거래완료
            </label>
          </>
        ) : (
          <>
            {status === "inStock" ? (
              <StyledStatus style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                거래가능
              </StyledStatus>
            ) : (
              <StyledStatus>거래가능</StyledStatus>
            )}
            {status === "onTrading" ? (
              <StyledStatus style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                거래중
              </StyledStatus>
            ) : (
              <StyledStatus>거래중</StyledStatus>
            )}
            {status === "outOfStock" ? (
              <StyledStatus style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                거래완료
              </StyledStatus>
            ) : (
              <StyledStatus>거래완료</StyledStatus>
            )}
          </>
        )}
      </StyledStatusBlock>

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
      <StyledLabel htmlFor="itemType">상품타입</StyledLabel>
      {isEdit ? (
        <StyledInput
          onChange={handleChange}
          name="itemType"
          id="itemType"
          type="text"
          value={itemType}
        />
      ) : (
        <StyledP>{itemType}</StyledP>
      )}
      <StyledLabel htmlFor="itemDesc">한 마디</StyledLabel>
      {isEdit ? (
        <StyledInput
          type="text"
          onChange={handleChange}
          name="itemDesc"
          id="itemDesc"
          value={itemDesc}
        />
      ) : (
        <StyledP>{itemDesc}</StyledP>
      )}
      <ButtonBlock>
        {isEdit ? (
          <>
            <StyledBtn disabled={!validate}>완료</StyledBtn>
            <StyledBtn type="button" onClick={handleDelete}>
              삭제
            </StyledBtn>
          </>
        ) : (
          <>
            <StyledBtn type="button">찜하기</StyledBtn>
            <StyledBtn type="button">배송메시지</StyledBtn>
          </>
        )}

        {editable ? (
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

const StyledStatusBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledStatus = styled.p`
  margin: 5px 20px 20px 20px;
  width: 80px;
  height: 40px;
  border: 1px solid black;
  line-height: 40px;
  text-align: center;
`;
