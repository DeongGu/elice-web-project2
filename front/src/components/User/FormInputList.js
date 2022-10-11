export default function FormInputList({ form, setForm, formInputData }) {
  const onChangeHandler = (event) => {
    const { value, id } = event.target;

    setForm((prevState) => ({ ...prevState, [id]: value }));
  };

  return formInputData.map((formInput, index) => (
    <div key={`index${index}`}>
      <label htmlFor={formInput.name}>{formInput.description}</label>
      <input
        id={formInput.name}
        type={formInput.type}
        value={form[formInput.name]}
        onChange={(event) => {
          onChangeHandler(event);
        }}
      />
    </div>
  ));
}
