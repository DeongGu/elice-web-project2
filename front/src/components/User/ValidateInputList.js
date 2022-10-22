import styled from "styled-components";

import { Validate } from "./Validate";

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
        {!formIsValid[data.name] && form[data.name] && Validate[data.name] && (
          <ErrorMsg>{data.alert}</ErrorMsg>
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
  box-shadow: 0 1px 4px 0 rgba(34, 34, 34, 0.1) inset;
  padding-left: 12px;
`;

const ErrorMsg = styled.div`
  font-size: 0.9rem;
`;
