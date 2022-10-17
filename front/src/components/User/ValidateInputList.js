export default function ValidateInputList({
  inputData,
  form,
  formIsValid,
  validateHandler,
}) {
  return inputData.map((data, index) => {
    return (
      <div key={index}>
        <label htmlFor={data.name}>{data.description}</label>
        <input
          type={data.type}
          id={data.name}
          value={form[data.name]}
          onChange={validateHandler}
        />
        {formIsValid[data.name] && <div>통과</div>}
        {!formIsValid[data.name] && form[data.name] && (
          <div>~~식으로 적어주세요.</div>
        )}
      </div>
    );
  });
}
