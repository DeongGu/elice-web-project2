import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = (props) => {
  return (
    <Wrapper>
      <StyledTitle>
        <StyledImg src="../assets/images/default.jpg"></StyledImg>
        <StyledH1>브링브링</StyledH1>
      </StyledTitle>

      <StyledNav>
        <NavStyle to="/prolog">소개</NavStyle>
        <NavStyle to="/">메인페이지</NavStyle>
        <NavStyle to="/team">팀소개</NavStyle>
      </StyledNav>

      <StyledUser>
        <button>로그인</button>
      </StyledUser>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  height: 105px;
  border-bottom: 2px solid black;
`;

const StyledImg = styled.img`
  width: 100px;
`;

const StyledTitle = styled.div`
  display: flex;
  width: 300px;
  align-items: center;
`;

const StyledH1 = styled.h1`
  font-size: 35px;
  font-weight: bold;
  @media (max-width: 830px) {
    display: none;
  }
`;
const StyledUser = styled.div`
  width: 300px;
`;

const StyledNav = styled.nav`
  display: flex;
  width: 400px;
  justify-content: space-around;
  font-size: 20px;
  font-weight: bold;
`;

const NavStyle = styled(NavLink)`
  display: block;
  text-align: center;
  line-height: 100px;
  width: 110px;
  color: black;
  height: 100px;
  box-sizing: border-box;
  text-decoration: none;
  /* outline: invert; */
  &:link {
    transition: 0.2s;
  }
  &:active {
    color: rgba(0, 0, 0, 0.3);
    position: relative;
    top: 2px;
  }
  &:hover {
    border: 3px solid rgba(0, 0, 0, 0.1);
  }
`;
