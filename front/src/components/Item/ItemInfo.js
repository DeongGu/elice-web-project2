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
          setItem(response.data.data);
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
          setItem(response.data.data);
          setTempValue(response.data.data);
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

  const isItemName = itemName?.length >= 0 && itemName?.length <= 100;
  const isItemType = itemType?.length >= 0 && itemType?.length <= 100;
  const isItemDesc = itemDesc?.length >= 0 && itemDesc?.length <= 100;
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
          console.log("response:", res.data.message);
          alert("?????????????????????.");
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
          console.log(res.data.message);
          alert("?????????????????????.");
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
        alert("???????????? ?????????");
      } else if (item["dibs.dibsId"]) {
        await axios
          .delete(`${url}dibs/${item["dibs.dibsId"]}`, {
            headers: {
              Authentication: `${sessionStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data.message);
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
            console.log(res.data);
            const newItem = { ...item };
            newItem["dibs.dibsId"] = res.data.data.dibsId;
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
      <StyledImageBlock>
        <StyledLabel htmlFor="itemImage">?????? ?????????</StyledLabel>
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
              <StyledImage src={itemImage[slide]} alt="???????????? ?????????" />
            ) : itemImage ? (
              <StyledImage src={itemImage} alt="???????????? ?????????" />
            ) : (
              <StyledImage
                src={"/assets/images/default.png"}
                alt="???????????? ?????????"
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
                ????????????
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
                ?????????
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
                ????????????
              </label>
            </>
          ) : (
            <>
              {status === "inStock" ? (
                <StyledStatus style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                  ????????????
                </StyledStatus>
              ) : (
                <StyledStatus>????????????</StyledStatus>
              )}
              {status === "onTrading" ? (
                <StyledStatus style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                  ?????????
                </StyledStatus>
              ) : (
                <StyledStatus>?????????</StyledStatus>
              )}
              {status === "outOfStock" ? (
                <StyledStatus style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}>
                  ????????????
                </StyledStatus>
              ) : (
                <StyledStatus>????????????</StyledStatus>
              )}
            </>
          )}
        </StyledStatusBlock>
      </StyledImageBlock>
      <StyledInfoBlock>
        <StyledBlock>
          <StyledLabel htmlFor="itemName">?????????</StyledLabel>
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
        </StyledBlock>

        {isEdit ? (
          <Styledfieldset>
            <StyledLegend>??????????????????</StyledLegend>
            <StyledLabel>
              <input
                onChange={handleChange}
                type="radio"
                value="??????"
                name="itemCategory"
                checked={itemCategory === "??????"}
              />
              ??????
            </StyledLabel>
            <StyledLabel>
              <input
                onChange={handleChange}
                type="radio"
                value="??????"
                name="itemCategory"
                checked={itemCategory === "??????"}
              />
              ??????
            </StyledLabel>
            <StyledLabel>
              <input
                onChange={handleChange}
                type="radio"
                value="?????????"
                name="itemCategory"
                checked={itemCategory === "?????????"}
              />
              ?????????
            </StyledLabel>
            <StyledLabel>
              <input
                onChange={handleChange}
                type="radio"
                value="??????"
                name="itemCategory"
                checked={itemCategory === "??????"}
              />
              ??????
            </StyledLabel>
            <StyledLabel>
              <input
                onChange={handleChange}
                type="radio"
                value="??????"
                name="itemCategory"
                checked={itemCategory === "??????"}
              />
              ??????
            </StyledLabel>
          </Styledfieldset>
        ) : itemCategory ? (
          <StyledBlock>
            <StyledLabel>{"??????????????????"}</StyledLabel>
            <StyledP>{itemCategory}</StyledP>
          </StyledBlock>
        ) : (
          <StyledLabel>
            {"??????????????????"}
            <StyledP>{"??????"}</StyledP>
          </StyledLabel>
        )}
        <StyledBlock>
          <StyledLabel htmlFor="itemType">????????????</StyledLabel>
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
        </StyledBlock>
        <StyledBlock>
          <StyledLabel htmlFor="itemDesc">??? ??????</StyledLabel>
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
        </StyledBlock>
        <StyledBlock>
          <StyledLabel htmlFor="openChat">??????????????? ??????</StyledLabel>
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
        </StyledBlock>
        <ButtonBlock>
          {isEdit ? (
            <>
              <StyledBtn disabled={!validate}>??????</StyledBtn>
              <StyledBtn type="button" onClick={handleDelete}>
                ??????
              </StyledBtn>
            </>
          ) : (
            <>
              <StyledBtn type="button" onClick={handleDibs}>
                ?????????
                {item["dibs.dibsId"] ? "??????" : null}
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
                  {"??????"}
                </StyledBtn>
              ) : (
                <StyledBtn
                  type="button"
                  onClick={() => {
                    setIsEdit((preState) => !preState);
                  }}
                >
                  {"??????"}
                </StyledBtn>
              )}
            </>
          ) : null}
        </ButtonBlock>
      </StyledInfoBlock>
    </StyledForm>
  );
};

export default ItemInfo;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  margin: 20px auto;
  border: 1rem solid gray;
  outline: 1rem solid lightgray;
  border-radius: 20px;
  width: 1100px;
  height: 500px;
  box-sizing: border-box;
  padding-left: 20px;
`;

const StyledImage = styled.img`
  width: 400px;
  height: 290px;
  object-fit: contain;
`;

const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
`;
const StyledInput = styled.input`
  margin: 10px 20px;
  height: 30px;
  width: 70%;
`;

const StyledBtn = styled.button`
  width: 170px;
  height: 65px;
  margin: 0 auto;
  background-color: rgb(119, 187, 63);
  border: none;
  cursor: pointer;
  color: white;
  border-radius: 20px;
  font-size: 25px;

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
  margin-top: 40px;
`;

const StyledLabel = styled.label`
  margin-top: 10px;
  font-weight: bold;
  & + & {
    margin: 5px;
  }
  width: 110px;
`;

const StyledP = styled.p`
  font-size: 20px;
  margin: 10px 20px;
  height: 30px;
  width: 500px;
`;

const StyledStatusBlock = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledStatus = styled.p`
  margin: 5px 20px 20px 20px;
  width: 80px;
  height: 30px;
  border: 1px solid black;
  line-height: 30px;
  text-align: center;
`;

const StyledRadio = styled.input`
  margin: 0px 0px 10px 20px;
`;

const SlideButtonBlock = styled.div`
  display: flex;
  width: 100px;
  justify-content: space-between;
  margin: 0 auto;
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
  width: 47%;
  padding-bottom: 10px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
`;

const StyledLegend = styled.legend`
  /* margin: 10px 0; */
  font-weight: bold;
`;

const StyledInfoBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 22px;
`;

const StyledImageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
