import React from 'react';
import styles from './TodoInput.module.css';

const TodoInput = (props) => {
  return (
    <form className={styles.container} onSubmit={props.submit}>
      <input
        value={props.val}
        onChange={props.change}
        className={styles.input}
        autoFocus
      ></input>
      <button type='submit' className={styles.button}>
        {props.label}
      </button>
    </form>
  );
};

export default TodoInput;
