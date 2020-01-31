/**
 * @file
 * Sundry hooks that have multiple use-cases
 */

import { useRef, useEffect } from 'react';
import { isElement } from './helpers';

/**
 * @function
 * Provides a standardised way of creating the container DOM elements for portals
 * Usage:
  ```
  const SomeComponent = () => {
    const target = usePortal();
    return createPortal(<div>my modal</div>, target);
  }
  ```
 *
 * Modified from: https://www.jayfreestone.com/writing/react-portals-with-hooks/
 */
export const usePortal = parent => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) {
      const rootEl = document.createElement('div');
      rootEl.classList.add('g-portal');
      rootRef.current = rootEl;
    }
    /* eslint-disable no-nested-ternary */
    const parentEl = isElement(parent)
      ? parent
      : typeof parent === 'string'
      ? document.querySelector(parent) || document.createElement('div')
      : document.createElement('div');
    /* eslint-enable no-nested-ternary */

    // Unmounted
    if (!parentEl.parentElement) {
      parentEl.classList.add('g-portal-parent');
      document.body.insertBefore(parentEl, document.body.firstElementChild);
    }

    parentEl.appendChild(rootRef.current);

    return () => {
      rootRef.current.remove();
      // Remove parent element if empty.
      if (parentEl.childNodes.length === 0) parentEl.remove();
    };
  }, [parent]);

  return rootRef.current;
};

export default {
  usePortal,
};
