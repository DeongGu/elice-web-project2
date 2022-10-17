import styled from "styled-components";

const NavStyle = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 5rem;
  box-shadow: 0px 3px 5px 0.1px #c8c8c8;
  flex-direction: row;
  width: 100%;
  position: sticky;
  top: 0;
  z-index:99;


  .fixed {
    width: 100%;
    top: 0;
    right: 0;
    font-size: 22px;
    text-align:center
  }

  .btnWrap {
    display: flex;

    button {
      font-size: 20px;
      margin-right: 8px;
      color: #000000;
      background: transparent;
      border: none;
    }

    .logBtn {
      border: 0px solid 
      transition: all 0.3s;
    }
    .logBtn:hover {
      border: #0d6efd;
      border-radius: 3px;
      color: #fff;
      background: #0d6efd;
    }
  }

  .header-logo {
    width: 10%;
    height: 100%;
    animation: fadein 2s;
  }
`;

export default NavStyle;
