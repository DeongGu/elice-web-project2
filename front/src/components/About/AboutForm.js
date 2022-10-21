import ModalBackground from '../UI/ModalBackground';

import styled, { keyframes } from 'styled-components';

export default function AboutForm() {
  return (
    <>
      <ModalBackground />

      <Form>
        <Reason>
          <text className='title'>
            <Strong>Do Vring</Strong>
          </text>
          <br />
          <br />
          <br />

          <p>
            실제로 시민들이 실천하고 있는 ‘친환경적 행동’들은 주로 “소비” 혹은
            “폐기”에 <br />
            초점이 맞춰져 있습니다. <sub>(KEI2021)</sub> <br />
            <br />
            하지만 우리나라에서 하루에 배출되는 폐의류의 양이 무려 200톤이 넘는
            다는 점은
            <br />
            ‘친환경적 제품 소비’나 ‘분리수거 잘하기’가 증상에 대한 완화책은 될
            수 있지만, <br />
            근본적인 해결책은 될 수 없음을 보여줍니다. <sub>(환경부2019)</sub>
          </p>
          <br />
          <p>
            근본적인 해결책은 과잉생산으로 인한 과잉소비, 과잉소비로 인한
            과잉폐기로 <br />
            이어지는 악순환을 끊어내는 것이라 생각, <br />
            <br />
            이를 위해 <strong>‘자원 순환’</strong>에 초점을 맞춰 ‘의류 및 패션
            용품의 재사용’을 할 수 있도록 <br />
            <strong>‘중고 의류 교환 서비스’</strong>가 탄생했습니다!
            <br /> <br />
            전부 읽으셨다면 <strong>검은 배경</strong>을 눌러서 창을 꺼주세요!
          </p>
        </Reason>
      </Form>
    </>
  );
}

const FadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(1);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 20;
  left: 50%;
  top: 50%;
  padding: 0 1.5rem 1.5rem 1.5rem;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 50rem;
  background-color: white;
  border: lightgray 1px solid;
  border-radius: 20px;
  animation: ${FadeInUp} 1s;
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

  negative {
    color: #cd2e57;
  }

  .title {
    font-size: 3rem;
  }
`;

const Strong = styled.span`
  font-family: elice-bold;
  color: #77bb3f;
`;
