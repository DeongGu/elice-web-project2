import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = (props) => {
  return (
    <StyledHeader>
      <Link to="/">
        <h1>브링브링</h1>
      </Link>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  margin: 10px;
  border: 5px solid black;
`;
