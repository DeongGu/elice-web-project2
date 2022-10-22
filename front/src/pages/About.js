import { useEffect, useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';

import GeneralContext from '../context/GeneralContext.js';

import useSlide from '../hooks/useSlide.js';
import useDivideSection from '../hooks/useDivideSection.js';

import Slide from '../components/UI/Slide.js';
import ProfileCard from '../components/About/ProfileCard.js';
import BreakLine from '../components/UI/BreakLine.js';

import TitleImage from '../assets/images/about-images/undraw-dreamer.png';
import TitleWave from '../assets/images/about-images/wave.png';
import ReasonImage from '../assets/images/about-images/undraw_data.svg';
import AboutImage from '../assets/images/about-images/undraw-connection.png';
import TeamImage from '../assets/images/about-images/undraw-engineering_team.svg';

import BarChartOne from '../components/About/Chart/BarChart.js';
import DonutChartFirst from '../components/About/Chart/DonutChartFirst.js';
import DonutChartSecond from '../components/About/Chart/DonutChartSecond.js';
import DonutChartThird from '../components/About/Chart/DonutChartThird.js';
import StackedChart from '../components/About/Chart/StackedChart.js';
import AboutForm from '../components/About/AboutForm.js';

import LogoImage from '../assets/images/Vring-logo.png';

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
    stacks: ['html', 'css', 'js', 'react', 'node', 'python'],
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
    stacks: ['html', 'css', 'js', 'react'],
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
  const generalContext = useContext(GeneralContext);

  const { count, setCount, startInterval, leftBtnHandler, rightBtnHandler } =
    useSlide(5000, 1, teamMembers.length);
  const {
    currentSection,
    scrollEventHandler,
    sections,
    innerHeight,
    subSection,
  } = useDivideSection(2);

  const slideProps = {
    count,
    setCount,
    slideData: teamMembers,
    leftBtnHandler,
    rightBtnHandler,
  };

  useEffect(() => {
    startInterval();

    window.scrollTo(0, 0);
    window.addEventListener('scroll', scrollEventHandler);

    return () => window.removeEventListener('scroll', scrollEventHandler);
  }, []);

  return (
    <>
      {currentSection === 5 && generalContext.showAboutForm && <AboutForm />}
      <Container>
        <SubNav focusOn={currentSection !== 1}>
          <NavBtn
            onClick={() => window.scrollTo(0, 0)}
            active={currentSection === 1}
          >
            시작
          </NavBtn>
          <NavBtn
            onClick={() =>
              window.scrollTo(
                0,
                sections.firstSection - innerHeight / subSection
              )
            }
            active={currentSection < 5 && currentSection > 1}
          >
            이유
          </NavBtn>
          <NavBtn
            onClick={() =>
              window.scrollTo(
                0,
                sections.fourthSection - innerHeight / subSection
              )
            }
            active={currentSection === 5}
          >
            소개
          </NavBtn>
          <NavBtn
            onClick={() =>
              window.scrollTo(
                0,
                sections.fifthSection - innerHeight / subSection
              )
            }
            active={currentSection === 6}
          >
            팀원
          </NavBtn>
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
            <StartBtn onClick={generalContext.registerFormHandler}>
              시작하기
            </StartBtn>
          </TitleBackground>
        </TitleSection>
        <ReasonSection
          focusOn={currentSection < 5 && currentSection > 1}
          focusOut={!(currentSection < 5 && currentSection > 1)}
        >
          <LeftSide>
            <SubContainer focusOut={currentSection !== 2}>
              <Graph firstFocusOn={currentSection === 2}>
                <GraphWrap>
                  <DonutChartSecond />
                  <DonutChartThird />
                  <DonutChartFirst />
                </GraphWrap>
              </Graph>
            </SubContainer>
            <SubContainer focusOut={currentSection !== 3}>
              <Graph focusOn={currentSection === 3}>
                <BarChartOne />
              </Graph>
            </SubContainer>
            <SubContainer focusOut={currentSection !== 4}>
              <Graph focusOn={currentSection === 4}>
                국민환경의식조사(2021)
                <StackedChart />
              </Graph>
            </SubContainer>
          </LeftSide>
          <RightSide>
            <SubContainer focusOut={currentSection !== 2}>
              <Reason focusOn={currentSection === 2}>
                <Text className='title'>
                  <strong>환경</strong>과 <Negative>패션 산업</Negative>
                </Text>
                <br />
                <br />
                <br />
                <p>
                  패션 산업이 환경에 미치는 영향은 매우 큽니다. <br />
                  <br />전 세계에서 배출되는 온실가스의 <Negative>10%</Negative>
                  가 패션 산업에서 기인합니다. UN에 따르면 이는 항공, 해상운송
                  산업의 탄소 배출량을 합한 것보다 많은 수치입니다.
                  <br />
                  <sup>(EPRS2017, UN 2018)</sup>
                </p>
                <br />
                <p>
                  인류가 배출하는 폐기용수의 <Negative>20%</Negative>가 패션
                  산업에서 나옵니다. <br />
                  또한 바다에서 발견된 미세 플라스틱 <Negative>35%</Negative>의
                  1차 원인물질이 합성 섬유입니다. <sup>(EPRS2017)</sup>
                </p>
                <br />
                <p>
                  이뿐 아니라 한 해 버려지는 의류(섬유)폐기물의 양은
                  <br /> 미국 내에서만 12.5백만 톤, 한국은 7.5만 톤에 달합니다.
                  <br />
                  <sup>(EPA2009)</sup>
                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                  <sup>(환경부2019)</sup>
                </p>
              </Reason>
            </SubContainer>
            <SubContainer
              focusOut={currentSection !== 3}
              image={ReasonImage}
              reversed={true}
            >
              <Reason focusOn={currentSection === 3}>
                <Text className='title'>
                  <strong>패션 산업</strong>과 <strong>국민 환경 인식</strong>
                </Text>
                <br />
                <br />
                <br />
                <p>
                  시민들이 가장 심각하다고 생각하는 환경문제
                  <br /> 1순위인 쓰레기 증가 <strong>55.4%</strong>,<br />
                  2순위인 기후변화 <strong>48.8%</strong>,<br />
                  4순위인 미세 플라스틱으로 인한 생태계 및 건강피해{' '}
                  <strong>45.9%</strong>, <br />
                  및 수질오염 및 물 부족 문제 <br />
                  모두 패션 산업과 밀접하게 연관되어 있습니다.{' '}
                  <sub>(KEI2021)</sub>
                </p>
              </Reason>
            </SubContainer>
            <SubContainer focusOut={currentSection !== 4}>
              <Reason focusOn={currentSection === 4}>
                <Text className='title'>
                  <strong>문제점</strong>
                </Text>
                <br />
                <br />
                <br />
                <p>
                  한국환경연구원이 2021년에 실시한 국민환경의식조사에 따르면
                  ‘환경에 관심이 있다', ‘환경문제의 원인을 알고 있다’의 응답
                  비율이 <strong>73.3%</strong>, <strong>52.8%</strong> 입니다.{' '}
                </p>
                <br />
                <p>
                  하지만 '환경문제의 해결 방법을 알고 있다' 의 응답 비율은{' '}
                  <strong>41.5%</strong> 에 불과합니다.
                </p>
                <br />
                <p>
                  {' '}
                  이는 환경에 관심이 있고 문제도 인식하고 있으나 해결방안을
                  찾는데 시민들이 어려움을 겪고 있다는 것을 보여줍니다.
                </p>
              </Reason>
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
            <AboutStartBtn onClick={generalContext.registerFormHandler}>
              지금 바로 시작하기
            </AboutStartBtn>
            <BreakLine />
            <Logo src={LogoImage}></Logo>
          </AboutDescription>
        </AboutSection>
        <TeamSection
          focusOn={currentSection === 6}
          focusOut={currentSection !== 6}
        >
          <TeamSubSection>
            <Slide {...slideProps}>
              <ProfileCard teamMember={teamMembers[count]} />
            </Slide>
          </TeamSubSection>
        </TeamSection>
      </Container>
    </>
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
  height: 570vh;
  display: flex;
  flex-direction: column;
`;

const SubNav = styled.ul`
  z-index: 9;
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
  z-index: 9;
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

const StartBtn = styled.button`
  cursor: pointer;
  padding: 4px 16px;
  font-size: 1.25rem;
  font-family: 'elice-bold';
  color: white;
  background-color: #77bb3f;
  border: #77bb3f 1px solid;
  border-radius: 20px;
`;

const ReasonSection = styled(Section)`
  height: 300vh;
  display: flex;
  flex-direction: row;

  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeIn} 1s;
    `}
`;

const LeftSide = styled.div`
  height: 100%;
  width: 50%;
`;

const RightSide = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  height: 100vh;
  display: flex;
  padding: 0 2rem 0 2rem;
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

const Negative = styled.span`
  color: #cd2e57;
  font-weight: bold;
`;

const Reason = styled.div`
  p {
    font-size: 1.5rem;
    text-align: left;
  }

  sub {
    font-size: 1rem;
    color: #c8c8c8;
  }

  sup {
    font-size: 1rem;
    color: #c8c8c8;
  }

  strong {
    color: #77bb3f;
  }

  .title {
    font-size: 3rem;
  }
  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeInRight} 1s;
    `};
`;

const Graph = styled.div`
  ${({ firstFocusOn }) =>
    firstFocusOn &&
    css`
      animation: ${FadeInLeft} 1s;
    `}
  ${({ focusOn }) =>
    focusOn &&
    css`
      animation: ${FadeInLeft} 1s;
    `};
`;

const GraphWrap = styled.div`
  display: flex;
  flex-direction: row;
}`;

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
  height: 80vh;
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

const TeamSubSection = styled(Section)`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
