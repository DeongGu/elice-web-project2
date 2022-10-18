import styled, { keyframes } from 'styled-components';

import BreakLine from '../UI/BreakLine';
import ProfileStacks from './ProfileStacks';

import FemaleAvatar from '../../assets/imgs/undraw_female_avatar.svg';
import MaleAvatar from '../../assets/imgs/undraw_male_avatar.svg';

const gender = {
  female: FemaleAvatar,
  male: MaleAvatar,
};

export default function ProfileCard({ teamMember }) {
  return (
    <>
      <SlideCard>
        <ProfileImage src={gender[teamMember.gender]} />
        <ProfileName>{teamMember.name}</ProfileName>
        <ProfilePos>{teamMember.pos}</ProfilePos>
        <ProfileDescription>{teamMember.description}</ProfileDescription>
        <BreakLine />
        <ProfileStacks icons={teamMember.stacks} />
      </SlideCard>
    </>
  );
}

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
  border: gray 1rem solid;
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
