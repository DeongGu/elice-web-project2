import styled from 'styled-components';

import { Validate } from './Validate';

export default function ValidateInputList({
  inputData,
  form,
  formIsValid,
  validateHandler,
}) {
  return inputData.map((data, index) => {
    return (
      <Container key={index}>
        <Label htmlFor={data.name}>{data.description}</Label>
        <Input
          type={data.type}
          id={data.name}
          value={form[data.name]}
          onChange={validateHandler}
        />
        {formIsValid[data.name] && (
          <SuccessMsg>이렇게 제출하셔도 좋습니다.</SuccessMsg>
        )}
        {!formIsValid[data.name] && form[data.name] && Validate[data.name] && (
          <ErrorMsg>~~식으로 적어주세요.</ErrorMsg>
        )}
      </Container>
    );
  });
}

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.div`
  text-align: left;
  margin-bottom: 0.5rem;
  font-family: ;
`;

const Input = styled.input`
  height: 2.5rem;
  border: lightgray 1px solid;
  border-radius: 20px;
`;

const SuccessMsg = styled.div``;

const ErrorMsg = styled.div``;
