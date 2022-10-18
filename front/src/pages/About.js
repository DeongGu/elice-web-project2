import { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

import useSlide from '../hooks/useSlide.js';
import useDivideSection from '../hooks/useDividedSection.js';

import Slide from '../components/UI/Slide.js';
import ProfileCard from '../components/About/ProfileCard.js';
import BreakLine from '../components/UI/BreakLine.js';

import LogoImage from '../assets/imgs/Vring-logo.png';
import TitleImage from '../assets/imgs/about-images/undraw-dreamer.png';
import TitleWave from '../assets/imgs/about-images/wave.png';
import ReasonImage from '../assets/imgs/about-images/undraw_data.svg';
import AboutImage from '../assets/imgs/about-images/undraw-connection.png';
import TeamImage from '../assets/imgs/about-images/undraw-engineering_team.svg';

const teamMembers = [
  {
    name: '한혜진',
    gender: 'female',
    pos: '팀장, 백엔드',
    description: '즐겁게 끝까지 힘차게!',
    stacks: ['js', 'python', 'r'],
  },
  {
    name: '신성우',
    gender: 'male',
    pos: '프론트엔드',
    description: '끝까지 열심히 하겠습니다.',
    stacks: ['html', 'css', 'js', 'react', 'node'],
  },
  {
    name: '이태의',
    gender: 'female',
    pos: '백엔드',
    description: '열심히 하겠습니다~! 다같이 즐겁게 해보아요!',
    stacks: ['js', 'node', 'python'],
  },
  {
    name: '이하늘',
    gender: 'male',
    pos: '프론트엔드',
    description: '부족한 게 많지만 열심히 하겠습니다!',
    stacks: ['html', 'css', 'js', 'python', 'react'],
  },
  {
    name: '진시하',
    gender: 'male',
    pos: '프론트엔드',
    description: '열심히 하겠습니다!',
    stacks: ['html', 'css', 'js', 'react', 'node'],
  },
];

export default function About() {
  const { count, setCount, startInterval, leftBtnHandler, rightBtnHandler } =
    useSlide(5000, 1, teamMembers);
  const { currentSection, scrollEventHandler } = useDivideSection(2);

  useEffect(() => {
    startInterval();

    window.scrollTo(0, 0);
    window.addEventListener('scroll', scrollEventHandler);

    return () => window.removeEventListener('scroll', scrollEventHandler);
  }, []);

  useEffect(() => {
    console.log(currentSection, count);
  }, [currentSection, count]);

  const slideProps = {
    count,
    setCount,
    slideData: teamMembers,
    leftBtnHandler,
    rightBtnHandler,
  };

  return (
    <Container>
      <SubNav focusOn={currentSection !== 1}>
        <NavBtn active={currentSection === 1}>시작</NavBtn>
        <NavBtn active={currentSection < 5 && currentSection > 1}>이유</NavBtn>
        <NavBtn active={currentSection === 5}>소개</NavBtn>
        <NavBtn active={currentSection === 6}>팀원</NavBtn>
      </SubNav>
      <TitleSection focusOut={currentSection !== 1}>
        <TitleBackground>
          <Title>
            사지 마세요.
            <Subtitle> 브링</Subtitle>
            <ExMark>! </ExMark>
            하세요.
          </Title>
          <Text>환경을 위한, 의류 교환 서비스</Text>
          <StartBtn>시작하기</StartBtn>
        </TitleBackground>
      </TitleSection>
      <ReasonSection
        height={'300vh'}
        focusOn={currentSection < 5 && currentSection > 1}
        focusOut={!(currentSection < 5 && currentSection > 1)}
      >
        <LeftSide>
          <SubContainer focusOut={currentSection !== 2}>
            <Graph firstFocusOn={currentSection === 2}>
              구구절절한 그래프1
            </Graph>
          </SubContainer>
          <SubContainer focusOut={currentSection !== 3}>
            <Graph focusOn={currentSection === 3}>구구절절한 그래프2</Graph>
          </SubContainer>
          <SubContainer focusOut={currentSection !== 4}>
            <Graph focusOn={currentSection === 4}>구구절절한 그래프3</Graph>
          </SubContainer>
        </LeftSide>
        <RightSide>
          <SubContainer>
            <Reason focusOn={currentSection === 2}>구구절절한 설명1</Reason>
          </SubContainer>
          <SubContainer image={ReasonImage} reversed={true}>
            <Reason focusOn={currentSection === 3}>구구절절한 설명2</Reason>
          </SubContainer>
          <SubContainer>
            <Reason focusOn={currentSection === 4}>구구절절한 설명3</Reason>
          </SubContainer>
        </RightSide>
      </ReasonSection>
      <AboutSection
        focusOn={currentSection === 5}
        focusOut={currentSection !== 5}
      >
        <AboutDescription>
          <AboutText>
            <Subtitle>브링</Subtitle>을 만들게 된 이유를 확인해보셨나요?
          </AboutText>
          <AboutText>
            <Subtitle>브링</Subtitle>은 간단히 말해 쓰지 않는 의류를 교환할 수
            있는 서비스입니다.
          </AboutText>
          <AboutText>지금 바로 회원가입해서 서비스를 이용해보세요!</AboutText>
          <AboutStartBtn>지금 바로 시작하기</AboutStartBtn>
          <BreakLine />
          <Logo src={LogoImage}></Logo>
        </AboutDescription>
      </AboutSection>
      <TeamSection
        focusOn={currentSection === 6}
        focusOut={currentSection !== 6}
      >
        <Slide {...slideProps}>
          <ProfileCard teamMember={teamMembers[count]} />
        </Slide>
      </TeamSection>
    </Container>
  );
}

const FadeOut = keyframes`
  0% {
    opacity: 1;
  } to {
    opacity: 0;
  }
`;

const FadeIn = keyframes`
  0% {
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const FadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;
const FadeInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;
const FadeInRight = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;
const FadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(1);
  }
`;

const Container = styled.div`
  height: 590vh;
  display: flex;
  flex-direction: column;
`;

const SubNav = styled.ul`
  &:first-child {
    margin-left: 3rem;
  }
  visibility: hidden;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 2rem;
  list-style: none;
  animation: ${FadeOut} 0.5s forwards;

  ${({ focusOn }) =>
    focusOn &&
    css`
      visibility: visible;
      animation: ${FadeInDown} 1s;
    `}
`;

const NavBtn = styled.li`
  cursor: pointer;
  margin-right: 1rem;
  border-radius: 20px;
  padding: 4px 20px;
  margin-left: ${({ margin }) => margin};
  color: ${({ active }) => (active ? 'white' : '')};
  background-color: ${({ active }) => (active ? '#77bb3f' : '')};
`;

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || '100vh'};
  animation: ${({ animation }) => animation} 1s;

  ${({ focusOut }) =>
    focusOut &&
    css`
      animation: ${FadeOut} 0.5s forwards;
    `}
`;

const TitleSection = styled(Section)`
  height: 90vh;
  flex-direction: column;
  background-image: url(${TitleWave});
  background-position: 0 100%;
  background-size: 100% 20%;
  background-repeat: repeat-x;
  animation: ${FadeInUp} 0.5s;

  ${({ focusOut }) =>
    focusOut &&
    css`
      animation: ${FadeOut} 0.5s forwards;
    `}
`;

const TitleBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${TitleImage});
  background-repeat: no-repeat;
  background-position: 50% 0%;
  animation: ${FadeInUp} 1s;
`;

const Title = styled.div`
  margin-top: 8rem;
  font-family: 'elice-bold';
  font-size: 3rem;
  margin-bottom: 3rem;
`;

const Subtitle = styled.span`
  font-family: 'elice-bold';
  color: #77bb3f;
`;

const ExMark = styled.span`
  font-weight: bold;
  color: #b3df8f;
`;

const Text = styled.div`
  font-family: 'elice';
  font-size: 2rem;
  margin-bottom: 3rem;
`;

const StartBtn = styled.div`
  padding: 4px 16px;
  font-size: 1.25rem;
  font-family: 'elice-bold';
  color: white;
  background-color: #77bb3f;
  border: #77bb3f 1px solid;
  border-radius: 20px;
`;

const ReasonSection = styled(Section)`
  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeIn} 1s;
    `}
`;

const LeftSide = styled.div`
  height: 100%;
  width: 100%;
`;

const RightSide = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: ${({ image }) => `url(${image})`};
  background-size: 30%;
  background-position: ${({ reversed }) => (reversed ? '90%' : '10%')} 90%;
  background-repeat: no-repeat;

  ${({ focusOut }) =>
    focusOut &&
    css`
      animation: ${FadeOut} 0.5s forwards;
    `}

  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeInRight} 1s;
    `}
`;

const Reason = styled.div`
  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeInRight} 1s;
    `}
`;

const Graph = styled.div`
  position: sticky;
  top: 49.2vh;

  ${({ firstFocusOn }) =>
    firstFocusOn &&
    css`
      animation: ${FadeInLeft} 1s;
    `}

  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeIn} 2s;
    `}
`;

const AboutSection = styled(Section)`
  background-image: url(${AboutImage});
  background-size: 60%;
  background-position: 50% 100%;
  background-repeat: no-repeat;

  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeIn} 1s;
    `}
`;

const AboutStartBtn = styled(StartBtn)`
  width: 40%;
  margin-top: 4rem;
`;

const AboutDescription = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const AboutText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  &:first-of-type {
    padding-top: 4rem;
  }
  &:last-of-type {
    margin-bottom: 0rem;
  }
`;

const Logo = styled.img`
  align-self: center;
  width: 6rem;
`;

const TeamSection = styled(Section)`
  background-image: url(${TeamImage});
  background-size: 30%;
  background-position: 10% 90%;
  background-repeat: no-repeat;

  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeIn} 1s;
    `}

  ${({ focusOut }) =>
    focusOut &&
    css`
      animation: ${FadeOut} 0.5s forwards;
    `}
`;
