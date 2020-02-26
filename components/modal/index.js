/**
 * @file
 * Modal dialog box
 */

import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import { usePortal } from '../../shared/hooks';
import './styles.scss';

const Modal = ({ className, parent, children, isOpen, closeModal: closeCallback, closeButton }) => {
  const parentEl = usePortal(parent);
  const lastFocused = useRef(null);
  const childContainer = useRef(null);
  const closeButtonRef = useRef(null);
  const allFocusable = useRef(null);

  const closeModal = useCallback(
    (...args) => {
      if (lastFocused.current) lastFocused.current.focus();
      allFocusable.current.forEach(el => {
        el.tabindex = el.originalTabIndex;
      });
      closeCallback(...args);
    },
    [closeCallback],
  );

  // Do some fuckery with tabindices
  useEffect(() => {
    if (isOpen) {
      lastFocused.current = document.activeElement;
      allFocusable.current = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      allFocusable.current.forEach(el => {
        el.originalTabIndex = el.tabIndex;
        el.tabIndex = -1;
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!childContainer.current || !closeButtonRef.current) return;

    // Via https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/
    const focusable = [
      ...childContainer.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
      closeButtonRef.current,
    ];

    const [focusableFirstChild] = focusable;
    // Focus on first focasable
    focusableFirstChild.focus();
    const handler = ({ keyCode }) => {
      if (keyCode === 9) {
        const currentElIndex = focusable.indexOf(document.activeElement);
        console.log(currentElIndex);
        if (currentElIndex === -1 && focusableFirstChild) {
          console.log('first child!');
          focusableFirstChild.focus();
        } else if (currentElIndex + 1 < focusable.length) {
          console.log('another child!');
          focusable[currentElIndex + 1].focus();
        } else if (focusableFirstChild) {
          console.log('loop');
          focusableFirstChild.focus();
        } else {
          throw new Error('Unhandled focus exception');
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [children, childContainer, closeButtonRef, isOpen]);

  // Set up escape key handler
  useEffect(() => {
    const handler = ({ keyCode }) => {
      if (keyCode === 27) {
        lastFocused.current.focus();
        closeModal();
      }
    };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [closeModal]);

  return (
    parentEl &&
    createPortal(
      isOpen && (
        <React.Fragment>
          <div
            className={classnames('g-modal-background', className)}
            role="button"
            aria-label="Close modal"
            onClick={closeModal}
            onKeyPress={closeModal}
            tabIndex={-1}
          />
          <div className="g-modal">
            {closeButton && (
              <div className="g-modal__close-button">
                <i
                  className="g-modal__close-button-icon"
                  role="button"
                  onClick={closeModal}
                  onKeyPress={closeModal}
                  ref={closeButtonRef}
                  aria-label="Close dialog"
                />
              </div>
            )}
            <div className="g-modal__body" ref={childContainer}>
              {children}
            </div>
          </div>
        </React.Fragment>
      ),
      parentEl,
    )
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  parent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  closeButton: PropTypes.bool,
  classNames: PropTypes.string,
};

Modal.defaultProps = {
  parent: undefined,
  closeButton: true,
  classNames: undefined,
};

export default Modal;
