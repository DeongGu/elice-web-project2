import { useRef } from 'react';

import { Validate } from '../components/User/Validate';

export default function useValidation(setForm, setFormIsValid, TIME = 500) {
  const timerRef = useRef();

  const validateHandler = (event) => {
    const { id, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setFormIsValid((prevState) => ({
        ...prevState,
        [id]: Validate[id].test(value),
      }));
    }, TIME);
  };

  return { validateHandler };
}
