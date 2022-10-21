import styled from 'styled-components';
import stackIcons from './StackIcons';

export default function ProfileStacks({ icons }) {
  return (
    <ProfileStacksStyle>
      {icons.map((icon, index) => (
        <ProfileStackIcon key={index} src={stackIcons[icon]} />
      ))}
    </ProfileStacksStyle>
  );
}

const ProfileStacksStyle = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ProfileStackIcon = styled.img`
  width: 3rem;
  height: 3rem;
  fill: ${({ color }) => color};
`;
