import { useRef, useEffect } from 'react';

/**
 * Save a state or something else in a ref and returns the previous state.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const usePrevious = (value: any): any => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default usePrevious;
