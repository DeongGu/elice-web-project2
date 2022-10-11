import { useState } from "react";
import styled from "styled-components";

const ItemImage = () => {
  const [imageSrc, setImageSrc] = useState("/assets/images/default.jpg");

  const encodeFile = async (fileBlob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    try {
      reader.onload = async () => {
        setImageSrc(reader.result);
      };
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="container">
      <h2>상품 이미지</h2>

      <input
        type="file"
        onChange={(e) => {
          encodeFile(e.target.files[0]);
        }}
        accept="image/*"
        multiple
      />

      <div className="preview">
        {imageSrc && <StyledImage src={imageSrc} alt="preview-img" />}
      </div>
    </main>
  );
};

export default ItemImage;

const StyledImage = styled.img`
  width: 100%;
`;
