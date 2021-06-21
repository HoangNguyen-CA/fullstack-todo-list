import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
  const spinner = (
    <div className={styles.spinner}>
      <div className={styles['double-bounce1']}></div>
      <div className={styles['double-bounce2']}></div>
    </div>
  );

  const errorDisplay = (
    <div className={styles.errorContainer}>
      <p>{props.error}</p>
    </div>
  );
  return (
    <>
      {props.error || props.loading ? (
        <div className={styles.backdrop} onClick={props.clicked}>
          {props.loading ? spinner : ''}
          {props.error ? errorDisplay : ''}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Modal;
