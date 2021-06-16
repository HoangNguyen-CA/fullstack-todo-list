import React, { Component } from 'react';
import Todo from '../../components/Todo/Todo';
import TodoInput from '../../components/TodoInput/TodoInput';
import styles from './TodoList.module.css';

export default class TodoList extends Component {
  state = {
    todos: [],
    addTodoVal: '',
  };

  async getTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    this.setState({ todos: data });
  }

  componentDidMount() {
    this.getTodos();
    this.setState({
      todos: [
        { _id: 1, text: 'test' },
        { _id: 2, text: 'test2' },
        { _id: 3, text: 'test3' },
      ],
    });
  }

  handleAddInputChange = (e) => {
    this.setState({ addTodoVal: e.target.value });
  };

  handleAddInputSubmit = (e) => {
    const newTodo = { _id: Math.random(), text: this.state.addTodoVal };
    this.setState({ todos: this.state.todos.concat(newTodo) });
  };

  render() {
    const todos = this.state.todos.map((todo, index) => {
      return <Todo key={todo._id} text={todo.text}></Todo>;
    });
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.header}>Todo List</h1>
        <TodoInput
          val={this.state.addTodoVal}
          change={this.handleAddInputChange}
          submit={this.handleAddInputSubmit}
        ></TodoInput>
        <ul className={styles.todosContainer}>{todos}</ul>
      </div>
    );
  }
}
