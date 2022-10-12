import { useState } from 'react';

import useRequest from './useRequest';

export default function useForm(
  initialState = {},
  method = 'get',
  endPoint = ''
) {
  const [form, setForm] = useState(initialState);
  const [formIsValid, setFormIsValid] = useState(initialState);

  const { onSubmitHandler } = useRequest(
    method,
    endPoint,
    form,
    setForm,
    initialState
  );

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
    onSubmitHandler,
  };
}
