import React from 'react';
import styles from './TodoInput.module.css';

const TodoInput = (props) => {
  return (
    <div className={styles.container}>
      <input
        value={props.val}
        onChange={props.change}
        className={styles.input}
        autoFocus
      ></input>
      <button onClick={props.submit} className={styles.button}>
        {props.label}
      </button>
    </div>
  );
};

export default TodoInput;
