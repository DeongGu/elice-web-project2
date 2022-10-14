import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [form, setForm] = useState(initialState);
  const [formIsValid, setFormIsValid] = useState(initialState);

  const onChangeHandler = (event) => {
    const { value, id } = event.target;

    setForm((prevState) => ({ ...prevState, [id]: value }));
  };

  return {
    form,
    setForm,
    formIsValid,
    setFormIsValid,
    onChangeHandler,
  };
}
