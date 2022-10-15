import { useCallback, useRef } from 'react';

import { Validate } from '../components/User/Validate';

export default function useValidation(setForm, setFormIsValid, TIME = 300) {
  const timerRef = useRef();

  const validateHandler = useCallback((event) => {
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
  });

  return { validateHandler };
}
