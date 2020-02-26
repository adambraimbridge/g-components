/**
 * @file
 * Sundry hooks that have multiple use-cases
 */

import { useRef, useState, useEffect } from 'react';
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

/**
 * Overlay hook to wrap oOverlay methods and state
 *
 * Wraps oOverlay functionality and exposes its API and internal state
 * eg, open/close methods and whether the overlay is shown or not.
 *
 * Use in conjunction with `<OverlayContents>` to specify the contents of
 * the overlay.
 *
 * See https://registry.origami.ft.com/components/o-overlay/readme
 *
 * @param {OverlayOptions} options
 * @param {string} options.id - The id for the overlay
 * @param {string} options.title - The title of the overlay
 * @param {boolean} [options.headingShaded=false] - Whether the heading is shaded or not
 * @param {boolean} [options.oLayerContext=document.body] - Where overlay event listeners are added
 * @param {Object} [options.oOverlayOptions] - Extra oOverlay options. See https://registry.origami.ft.com/components/o-overlay/readme#option-reference
 */
export const useOverlay = ({
  id,
  title,
  headingShaded = false,
  oLayerContext = document.body,
  oOverlayOptions,
  // template,
} = {}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    (async () => {
      const { default: Overlay } = await import('@financial-times/o-overlay');
      // Only create the overlay once, otherwise oOverlay errors
      if (!overlay) {
        const oOverlay = new Overlay(id, {
          // Nothing in html, but will be replaced by a React portal to
          // replace the contents
          html: ' ', // Requires a non-empty value
          heading: {
            title,
            shaded: headingShaded,
          },
          ...oOverlayOptions,
        });

        // NOTE: In conjunction with setting `isShowing` in the hide
        // overlay method below, this event listener catches any race
        // conditions where React does not set `isShowing` in time when
        // oOverlay is closed
        oLayerContext.addEventListener('oLayers.close', () => {
          setIsShowing(false);
        });

        setOverlay(oOverlay);
      }
    })();
  }, [headingShaded, id, oLayerContext, oOverlayOptions, overlay, title]);

  const showOverlay = () => {
    if (!overlay) {
      return;
    }
    overlay.open();
    setIsShowing(true);
  };
  const hideOverlay = () => {
    // NOTE: `isShowing` needs to be set here in case oOverlay events
    // don't trigger the React lifecycle in time
    setIsShowing(false);

    if (!overlay) {
      return;
    }
    overlay.close();
  };

  const oOverlayContentsSelector = `.o-overlay--${id} .o-overlay__content`;

  return {
    isShowing,
    showOverlay,
    hideOverlay,
    overlay,
    oOverlayContentsSelector,
  };
};
