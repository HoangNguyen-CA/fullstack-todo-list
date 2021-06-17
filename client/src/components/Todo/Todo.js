import React from 'react';
import styles from './Todo.module.css';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';

const Todo = (props) => {
  return (
    <>
      <li className={styles.todo}>
        <p>{props.text}</p>
        <div>
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
