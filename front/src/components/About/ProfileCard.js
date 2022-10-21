import styled from 'styled-components';

import BreakLine from '../UI/BreakLine';
import Gender from '../UI/Gender';
import ProfileStacks from './ProfileStacks';

export default function ProfileCard({ teamMember }) {
  return (
    <>
      <SlideCard>
        <ProfileImage src={Gender[teamMember.gender]} />
        <ProfileName>{teamMember.name}</ProfileName>
        <ProfilePos>{teamMember.pos}</ProfilePos>
        <ProfileDescription>{teamMember.description}</ProfileDescription>
        <BreakLine />
        <ProfileStacks icons={teamMember.stacks} />
      </SlideCard>
    </>
  );
}

const SlideCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 30%;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border: gray 0.25rem solid;
  border-radius: 50%;
`;

const ProfileName = styled.div`
  font-size: 2rem;
  font-family: elice-bold;
`;

const ProfilePos = styled.span`
  font-size: 1.25rem;
  font-family: elice-bold;
`;

const ProfileDescription = styled.div`
  margin-top: 2rem;
`;
