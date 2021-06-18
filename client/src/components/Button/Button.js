import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
  const buttonStyles = [styles.button];
  if (props.active) {
    buttonStyles.push(styles.active);
  }
  return (
    <button className={buttonStyles.join(' ')} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
