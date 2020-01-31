/**
 * @file
 * Modal dialog box
 */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import { usePortal } from '../../shared/hooks';
import './styles.scss';

const Modal = ({ className, parent, children, isOpen, closeModal, closeButton }) => {
  const parentEl = usePortal(parent);

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
            tabIndex={0}
          />
          <div className="g-modal">
            {closeButton && (
              <div className="g-modal__close-button">
                <i
                  className="g-modal__close-button-icon"
                  role="button"
                  onClick={closeModal}
                  onKeyPress={closeModal}
                  tabIndex={-1}
                  aria-label="Close modal"
                />
              </div>
            )}
            {children}
          </div>
        </React.Fragment>
      ),
      parentEl,
    )
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  parent: PropTypes.oneOfType([PropTypes.string, PropTypes.string]),
  closeButton: PropTypes.bool,
  classNames: PropTypes.string,
};

Modal.defaultProps = {
  parent: undefined,
  closeButton: true,
  classNames: undefined,
};

export default Modal;
