import styled from 'styled-components';

export default function InputList({ inputData, onChangeHandler, form }) {
  return inputData.map((data, index) => {
    return (
      <Container key={'input:' + index}>
        <Label htmlFor={data.name}>{data.description}</Label>
        <Input
          type={data.type}
          id={data.name}
          value={form[data.name]}
          onChange={onChangeHandler}
        />
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
