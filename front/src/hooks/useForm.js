import { useState, useContext } from 'react';

import UserCheckContext from '../context/UserCheckContext';

export default function useForm(initialState = {}, endPoint = '') {
  const userCheck = useContext(UserCheckContext);
  const [form, setForm] = useState(initialState);
  const [formIsValid, setFormIsValid] = useState(initialState);
  const [formIsFocused, setFormIsFocused] = useState(initialState);

  const onChangeHandler = (event) => {
    const { value, id } = event.target;

    setForm((prevState) => ({ ...prevState, [id]: value }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (endPoint === 'GET') {
    }
    if (endPoint === 'GET') {
    }
    if (endPoint === 'GET') {
    }
    if (endPoint === 'GET') {
    }

    setForm(initialState);
  };

  return {
    form,
    formIsValid,
    setFormIsValid,
    formIsFocused,
    setFormIsFocused,
    onChangeHandler,
    onSubmitHandler,
  };
}
