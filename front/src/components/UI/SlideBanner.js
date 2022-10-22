import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SlideBanner = () => {
  const slideRef = useRef(null);
  const slideList = [
    "/assets/images/banner1.png",
    "/assets/images/banner2.png",
    "/assets/images/banner3.png",
    "/assets/images/banner4.png",
  ];
  const [slide, setSlide] = useState(0);

  const preSlide = () => {
    if (slide === 0) {
      setSlide(3);
    } else {
      setSlide(slide - 1);
    }
  };

  const nextSlide = () => {
    if (slide >= 3) {
      setSlide(0);
    } else {
      setSlide(slide + 1);
    }
  };

  const navClick = (e) => {
    if (e.target.className[e.target.className.length - 1] === "1") {
      setSlide(0);
    } else if (e.target.className[e.target.className.length - 1] === "2") {
      setSlide(1);
    } else if (e.target.className[e.target.className.length - 1] === "3") {
      setSlide(2);
    } else {
      setSlide(3);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${slide}00%)`;
  }, [slide]);

  const changeState = useRef();

  function callback() {
    setSlide(slide + 1);
  }

  useEffect(() => {
    changeState.current = callback;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev === slideList.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [slideList.length]);

  return (
    <Wrapper>
      <SlideBlock ref={slideRef}>
        <StyledImg src={slideList[0]} alt="이미지"></StyledImg>
        <StyledImg src={slideList[1]} alt="이미지"></StyledImg>
        <StyledImg src={slideList[2]} alt="이미지"></StyledImg>
        <StyledImg src={slideList[3]} alt="이미지"></StyledImg>
      </SlideBlock>
      <ButtonBlock>
        <StyledBtn onClick={preSlide}>{"<"}</StyledBtn>
        <NavBlock>
          {Array(4)
            .fill()
            .map((_, i) => {
              if (i === slide) {
                return (
                  <NavBtn
                    key={i}
                    className={i + 1}
                    style={{ backgroundColor: "black" }}
                    onClick={navClick}
                  ></NavBtn>
                );
              } else {
                return (
                  <NavBtn key={i} className={i + 1} onClick={navClick}></NavBtn>
                );
              }
            })}
        </NavBlock>
        <StyledBtn onClick={nextSlide}>{">"}</StyledBtn>
      </ButtonBlock>
    </Wrapper>
  );
};

export default SlideBanner;

const Wrapper = styled.div`
  width: 1150px;
  margin: 10px auto;
  overflow: hidden;
  @media (max-width: 600px) {
    width: 400px;
  }
`;

const SlideBlock = styled.div`
  display: flex;
  margin: 0 auto;
`;

const StyledImg = styled.img`
  width: 1150px;
  @media (max-width: 600px) {
    width: 400px;
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;

  &:hover {
    color: rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const NavBtn = styled.div`
  border: 1px solid black;
  padding: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 10px;
  cursor: pointer;
`;

const NavBlock = styled.div`
  display: flex;
`;
