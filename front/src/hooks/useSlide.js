import { useState, useRef, useCallback } from 'react';

export default function useSlide(TIME = 1000, startNum = 1, endNum = 2) {
  const start = startNum - 1;
  const end = endNum - 1;

  const [count, setCount] = useState(start);
  const intervalRef = useRef(null);

  const leftBtnHandler = () => {
    setCount((prevState) => (prevState === start ? end : prevState - 1));
  };

  const rightBtnHandler = () => {
    setCount((prevState) => (prevState === end ? start : prevState + 1));
  };

  const startInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCount((prevState) => (prevState === end ? start : prevState + 1));
    }, TIME);
  });

  return { count, setCount, startInterval, leftBtnHandler, rightBtnHandler };
}
