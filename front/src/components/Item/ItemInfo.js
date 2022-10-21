import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ItemInfo = () => {
  const portNum = 5000;
  const url = "http://" + window.location.hostname + ":" + portNum + "/";
  const navigate = useNavigate();
  const { itemId } = useParams();

  const [item, setItem] = useState({});

  const [isEdit, setIsEdit] = useState(false);
  const [tempValue, setTempValue] = useState({});

  const [checkedDibs, setCheckedDibs] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}items/${itemId}`);
          setItem(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}items/${itemId}`, {
            headers: {
              Authentication: `${sessionStorage.getItem("accessToken")}`,
            },
          });
          setItem(response.data);
          setTempValue(response.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [checkedDibs]);

  const {
    itemImage,
    itemName,
    itemType,
    itemDesc,
    editable,
    status,
    openChat,
    itemCategory,
  } = item;

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

  const isItemName = itemName?.length >= 0 && itemName?.length <= 25;
  const isItemType = itemType?.length >= 0 && itemType?.length <= 100;
  const isItemDesc = itemDesc?.length >= 0 && itemDesc?.length <= 30;
  const isOpenChat = openChat?.length >= 0;
  const validate = isItemName && isItemType && isItemDesc && isOpenChat;

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
    formData.append("openChat", openChat);
    formData.append("itemCategory", itemCategory);

    setTempValue({
      itemImage,
      itemName,
      itemType,
      itemDesc,
      editable,
      status,
      openChat,
      itemCategory,
    });

    try {
      await axios
        .put(`${url}items/${itemId}`, formData, {
          headers: {
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
        .delete(`${url}items/${itemId}`, {
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

  const [slide, setSlide] = useState(0);

  const preSlide = () => {
    if (slide === 0) {
      setSlide(itemImage?.length - 1);
    } else {
      setSlide(slide - 1);
    }
  };

  const nextSlide = () => {
    if (slide >= itemImage?.length - 1) {
      setSlide(0);
    } else {
      setSlide(slide + 1);
    }
  };

  const handleDibs = async () => {
    try {
      if (!sessionStorage.getItem("accessToken")) {
        alert("로그인을 하세요");
      } else if (item["dibs.dibsId"]) {
        await axios
          .delete(`${url}dibs/${item["dibs.dibsId"]}`, {
            headers: {
              Authentication: `${sessionStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res);
            const newItem = { ...item };
            setItem(newItem);
            setCheckedDibs((preState) => !preState);
          });
      } else {
        await axios
          .post(
            `${url}dibs/${itemId}`,
            {},
            {
              headers: {
                Authentication: `${sessionStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            const newItem = { ...item };
            newItem["dibs.dibsId"] = res.data.result.dibsId;
            setItem(newItem);
            setCheckedDibs((preState) => !preState);
          });
      }
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
        <SlideBlock>
          {Array.isArray(itemImage) ? (
            <StyledImage src={itemImage[slide]} alt="미리보기 이미지" />
          ) : itemImage ? (
            <StyledImage src={itemImage} alt="미리보기 이미지" />
          ) : (
            <StyledImage
              src={"/assets/images/default.png"}
              alt="미리보기 이미지"
            />
          )}
        </SlideBlock>
        <SlideButtonBlock>
          <SlideButton onClick={preSlide} type="button">
            {"<"}
          </SlideButton>
          <SlideButton onClick={nextSlide} type="button">
            {">"}
          </SlideButton>
        </SlideButtonBlock>
      </StyledPreview>

      <StyledStatusBlock>
        {isEdit ? (
          <>
            <label>
              <StyledRadio
                type="radio"
                onChange={handleChange}
                name="status"
                id="inStock"
                value="inStock"
                checked={status === "inStock"}
              ></StyledRadio>
              거래가능
            </label>
            <label>
              <StyledRadio
                type="radio"
                onChange={handleChange}
                name="status"
                id="onTrading"
                value="onTrading"
                checked={status === "onTrading"}
              ></StyledRadio>
              거래중
            </label>
            <label>
              <StyledRadio
                type="radio"
                onChange={handleChange}
                name="status"
                id="outOfStock"
                value="outOfStock"
                checked={status === "outOfStock"}
              ></StyledRadio>
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
      {isEdit ? (
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
      ) : itemCategory ? (
        <StyledLabel>
          {"상품카테고리"}
          <StyledP>{itemCategory}</StyledP>
        </StyledLabel>
      ) : (
        <StyledLabel>
          {"상품카테고리"}
          <StyledP>{"기타"}</StyledP>
        </StyledLabel>
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
      <StyledLabel htmlFor="openChat">오픈카톡방 주소</StyledLabel>
      {isEdit ? (
        <StyledInput
          type="text"
          onChange={handleChange}
          name="openChat"
          id="openChat"
          value={openChat}
        />
      ) : (
        <StyledP>
          <a href={openChat} target="_blank" rel="noreferrer">
            {openChat}
          </a>
        </StyledP>
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
            <StyledBtn type="button" onClick={handleDibs}>
              찜하기
              {item["dibs.dibsId"] ? "❤️" : null}
            </StyledBtn>
          </>
        )}

        {editable ? (
          <>
            {isEdit ? (
              <StyledBtn
                type="button"
                onClick={() => {
                  setIsEdit((preState) => !preState);
                  setItem(tempValue);
                }}
              >
                {"취소"}
              </StyledBtn>
            ) : (
              <StyledBtn
                type="button"
                onClick={() => {
                  setIsEdit((preState) => !preState);
                }}
              >
                {"편집"}
              </StyledBtn>
            )}
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
  border: 1rem solid gray;
  outline: 1rem solid lightgray;
  border-radius: 20px;
  width: 600px;
  height: 1100px;
  box-sizing: border-box;
`;

const StyledImage = styled.img`
  margin-top: 20px;
  width: 490px;
  height: 290px;
  object-fit: contain;
`;

const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-bottom: 30px;
`;
const StyledInput = styled.input`
  margin: 10px 20px;
  height: 50px;
`;

const StyledBtn = styled.button`
  width: 100px;
  height: 50px;
  margin: 30px auto;
  background-color: rgb(119, 187, 63);
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 20px;
  font-size: 20px;

  &:hover {
    background-color: rgba(119, 187, 63, 0.5);
  }

  &:active {
    position: relative;
    top: 2px;
  }

  &:disabled {
    background-color: rgba(119, 187, 63, 0.2);
  }
`;

const ButtonBlock = styled.div`
  display: flex;
`;

const StyledLabel = styled.label`
  margin-top: 10px;
  font-weight: bold;
  & + & {
    margin: 5px;
  }
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

const StyledRadio = styled.input`
  margin: 5px 5px 10px 20px;
`;

const SlideButtonBlock = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  margin: 20px auto 0 auto;
`;

const SlideButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const SlideBlock = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Styledfieldset = styled.fieldset`
  border: 1px solid black;
  margin: 10px auto;
  width: 460px;
  padding-bottom: 13px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledLegend = styled.legend`
  margin: 10px 0;
`;
