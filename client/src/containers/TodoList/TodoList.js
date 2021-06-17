import React, { Component } from 'react';
import Todo from '../../components/Todo/Todo';
import TodoInput from '../../components/TodoInput/TodoInput';
import styles from './TodoList.module.css';

export default class TodoList extends Component {
  state = {
    todos: {},
    addTodoVal: '',
    editTodoVal: '',
    isEditting: false,
    currentEditID: '',
  };

  //TODO: fix
  async getTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    const newTodos = {};
    for (const todo of data) {
      newTodos[todo._id] = { text: todo.text, completed: todo.completed };
    }
    console.log(newTodos);
    this.setState({ todos: newTodos });
  }

  componentDidMount() {
    this.getTodos();
    /*
    this.setState({
      todos: {
        1: { text: 'test1', completed: false },
        2: { text: 'test2', completed: false },
        3: { text: 'test3', completed: false },
      },
    });*/
  }

  handleAddInputChange = (e) => {
    this.setState({ addTodoVal: e.target.value });
  };

  handleAddInputSubmit = (e) => {
    const newTodos = this.state.todos;
    const id = Math.random();
    newTodos[id] = { text: this.state.addTodoVal, completed: false };
    this.setState({ todos: newTodos, addTodoVal: '' });
  };

  handleEditInputChange = (e) => {
    this.setState({ editTodoVal: e.target.value });
  };

  handleEditInputSubmit = () => {
    const newTodos = this.state.todos;
    newTodos[this.state.currentEditID] = {
      text: this.state.editTodoVal,
      completed: this.state.todos[this.state.currentEditID].completed,
    };
    this.setState({ todos: newTodos, isEditting: false });
  };

  handleEditTodo = (id) => {
    this.setState({
      isEditting: true,
      currentEditID: id,
      editTodoVal: this.state.todos[id].text,
    });
  };

  handleDeleteTodo = (id) => {
    const newTodos = this.state.todos;
    delete newTodos[id];
    this.setState({ todos: newTodos });
  };
  render() {
    const todos = [];
    for (let [id, todo] of Object.entries(this.state.todos)) {
      todos.push(
        <Todo
          id={id}
          key={id}
          text={todo.text}
          edit={this.handleEditTodo}
          delete={this.handleDeleteTodo}
        ></Todo>
      );
    }

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
