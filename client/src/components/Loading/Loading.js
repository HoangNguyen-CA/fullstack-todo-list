import React from 'react';
import styles from './Loading.module.css';

const Loading = (props) => {
  return (
    <>
      {props.show ? (
        <div className={styles.backdrop}>
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

export default Loading;
