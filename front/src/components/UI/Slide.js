import styled from 'styled-components';

export default function Slide({
  children,
  count,
  setCount,
  slideData,
  leftBtnHandler,
  rightBtnHandler,
}) {
  return (
    <>
      <SlideStyle>
        {children}
        <SlideButtons>
          <SlideButton onClick={leftBtnHandler}>&lt;</SlideButton>
          {slideData.map((member, index) => (
            <SlideNumber
              key={index}
              count={count}
              index={index}
              onClick={() => setCount(index)}
            />
          ))}
          <SlideButton onClick={rightBtnHandler}>&gt;</SlideButton>
        </SlideButtons>
      </SlideStyle>
    </>
  );
}

const SlideStyle = styled.div`
  height: 75%;
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: gray 1rem solid;
  border-radius: 20px;
  outline: lightgray 1rem solid;
`;

const SlideButtons = styled.div`
  width: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const SlideNumber = styled.button`
  cursor: pointer;
  border: none;
  height: 1rem;
  width: 1rem;
  border: gray 1px solid;
  border-radius: 50%;
  background-color: ${({ count, index }) =>
    count === index ? 'gray' : 'transparent'};
`;

const SlideButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  text-align: center;
  color: gray;
`;
