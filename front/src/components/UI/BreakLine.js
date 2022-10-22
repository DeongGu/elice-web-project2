import styled from 'styled-components';

export default function BreakLine() {
  return <BreakLineStyle />;
}

const BreakLineStyle = styled.div`
  width: 50%;
  height: 0.1rem;
  background-color: lightgray;
  margin-top: 1rem;
`;
