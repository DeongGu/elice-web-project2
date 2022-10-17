import { createGlobalStyle } from "styled-components";
import TextStyle from "./fonts/AppleSDGothicNeoSB.ttf";

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: AppleSDGothicNeoSB;
    src: local("AppleSDGothicNeoSB"),
    url(${TextStyle});
    font-weight: 50;
    font-style: normal;
}

  body {
    margin: 0;
  }

  * {
    font-family: "AppleSDGothicNeoSB", "Arial", sans-serif;
  }

  *::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
