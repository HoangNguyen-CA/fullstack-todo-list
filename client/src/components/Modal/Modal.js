import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  return (
    <>
      {props.error || props.loading ? (
        <div className={styles.backdrop} onClick={props.clicked}>
          <div className={styles.spinner}>
            <div className={styles['double-bounce1']}></div>
            <div className={styles['double-bounce2']}></div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;
