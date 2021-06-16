import React, { Component } from 'react';
import Todo from '../../components/Todo/Todo';
import TodoInput from '../../components/TodoInput/TodoInput';
import styles from './TodoList.module.css';

export default class TodoList extends Component {
  state = {
    todos: [],
    addTodoVal: '',
    editTodoVal: '',
    isEditting: false,
    currentEditID: '',
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
        { id: 1, text: 'test', completed: false },
        { id: 2, text: 'test2', completed: false },
        { id: 3, text: 'test3', completed: false },
      ],
    });
  }

  handleAddInputChange = (e) => {
    this.setState({ addTodoVal: e.target.value });
  };

  handleAddInputSubmit = (e) => {
    const newTodo = { id: Math.random(), text: this.state.addTodoVal };
    this.setState({ todos: this.state.todos.concat(newTodo) });
  };

  handleEditInputChange = (e) => {
    this.setState({ editTodoVal: e.target.value });
  };

  handleEditInputSubmit = () => {
    const newTodos = this.state.todos;
    const index = newTodos.findIndex(
      (todo) => todo.id === this.state.currentEditID
    );
    const newTodo = {
      id: this.state.currentEditID,
      text: this.state.editTodoVal,
    };
    newTodos[index] = newTodo;
    this.setState({ todos: newTodos, isEditting: false });
  };

  handleStartEditing = (id) => {
    const foundTodo = this.state.todos.find((todo) => todo.id === id);

    this.setState({
      isEditting: true,
      currentEditID: id,
      editTodoVal: foundTodo.text,
    });
  };

  render() {
    const todos = this.state.todos.map((todo, index) => {
      return (
        <Todo
          id={todo.id}
          key={todo.id}
          text={todo.text}
          edit={this.handleStartEditing}
        ></Todo>
      );
    });
    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.header}>Todo List</h1>

        <TodoInput
          val={this.state.addTodoVal}
          change={this.handleAddInputChange}
          submit={this.handleAddInputSubmit}
          label='Add Todo'
        ></TodoInput>
        {this.state.isEditting ? (
          <TodoInput
            val={this.state.editTodoVal}
            change={this.handleEditInputChange}
            submit={this.handleEditInputSubmit}
            label='Save Edit'
          ></TodoInput>
        ) : (
          <ul className={styles.todosContainer}>{todos}</ul>
        )}
      </div>
    );
  }
}
