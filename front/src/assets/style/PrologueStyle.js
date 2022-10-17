import styled from "styled-components";

const PrologueStyle = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;

  .tabWrap {
    padding-top: 10rem;

    position: fixed;
    top: 0;
    width: 7rem;
    height: 100vh;
    text-align: center;

    button {
      font-size: 20px;
      margin-right: 8px;
      background: #ffffff;
      border: none;
    }
  }

  .bodyWrap {
    display: flex;
    flex-direction: column;
    margin: 5rem 3rem 5rem 10rem;

    .graph {
      z-index: 1 !important;
      display: flex;
      flex-direction: row;
    }
  }
`;

export default PrologueStyle;
