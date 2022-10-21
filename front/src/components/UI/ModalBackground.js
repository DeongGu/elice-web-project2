import { useContext } from 'react';
import styled from 'styled-components';

import GeneralContext from '../../context/GeneralContext';

export default function ModalBackground() {
  const generalContext = useContext(GeneralContext);

  return (
    <ModalStyle
      onClick={() => {
        generalContext.disableFormHandler();
        generalContext.disableUserFormHandler();
      }}
    ></ModalStyle>
  );
}

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
`;
