export default function InputList({ inputData, onChangeHandler, form }) {
  return inputData.map((data, index) => {
    return (
      <div key={index}>
        <label htmlFor={data.name}>{data.description}</label>
        <input
          type={data.type}
          id={data.name}
          value={form[data.name]}
          onChange={onChangeHandler}
        />
      </div>
    );
  });
}
