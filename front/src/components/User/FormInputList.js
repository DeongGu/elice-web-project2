export default function FormInputList({
  form,
  onChangeHandler,
  formInputData,
}) {
  return formInputData.map((formInput, index) => (
    <div key={`index${index}`}>
      <label htmlFor={formInput.name}>{formInput.description}</label>
      <input
        id={formInput.name}
        type={formInput.type}
        value={form[formInput.name] || ''}
        onChange={(event) => {
          onChangeHandler(event);
        }}
      />
    </div>
  ));
}
