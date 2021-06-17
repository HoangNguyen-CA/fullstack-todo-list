import React from 'react';
import styles from './Todo.module.css';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';

const Todo = (props) => {
  const todoStyles = [styles.todo];
  if (props.completed) {
    todoStyles.push(styles.completed);
  }

  return (
    <>
      <li className={todoStyles.join(' ')}>
        <p
          className={styles.text}
          onClick={() => props.toggleComplete(props.id)}
        >
          {props.text}
        </p>
        <div className={styles.iconsContainer}>
          <FaRegEdit
            className={styles.icon}
            onClick={() => props.edit(props.id)}
          ></FaRegEdit>
          <RiDeleteBin2Line
            className={styles.icon}
            onClick={() => props.delete(props.id)}
          ></RiDeleteBin2Line>
        </div>
      </li>
    </>
  );
};

export default Todo;
