import React, { useEffect, useRef } from 'react';

// TODO: maby change this to a more safe compare function
// like lodash isEqual or a md5 hash. This will fail if object
// properties are ordered differently.
const jsonEqual = (a: Record<string, unknown>, b: Record<string, unknown>) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Since useEffect isnt very good at comparing
 * other things than simple literals we need
 * a useEffect wrapper hook with a deep object compare.
 * This keeps the previous dependency state in a ref
 * and compares with the current.
 *
 * Use as a you would a normal useEffect hook.
 *
 * @example
 * useDeepEffect(() => {
 *  // will only run when changed
 * }, [state]);
 */
const useDeepEffect = (
  fn: React.EffectCallback,
  deps: React.DependencyList,
): void => {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every(
      (obj: Record<string, unknown>, index: number) =>
        jsonEqual(obj, deps[index]),
    );

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
};

export default useDeepEffect;
