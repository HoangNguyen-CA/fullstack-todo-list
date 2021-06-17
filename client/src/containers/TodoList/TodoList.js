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

  async loadTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    const newTodos = {};
    for (const todo of data) {
      newTodos[todo._id] = { text: todo.text, completed: todo.completed };
    }
    this.setState({ todos: newTodos });
  }

  componentDidMount() {
    this.loadTodos();
  }

  handleAddChange = (e) => {
    this.setState({ addTodoVal: e.target.value });
  };

  handleAddTodo = async () => {
    const newTodo = { text: this.state.addTodoVal };
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();

      //update state with result
      const newTodos = this.state.todos;
      newTodos[data._id] = { text: data.text, completed: data.completed };
      this.setState({ todos: newTodos, addTodoVal: '' });
    } catch (e) {
      console.log(e);
    }
  };

  handleStartEdit = (id) => {
    console.log(this.state.todos[id]);

    const newText = this.state.todos[id].text;
    this.setState({
      isEditting: true,
      currentEditID: id,
      editTodoVal: newText,
    });
  };

  handleEditChange = (e) => {
    this.setState({ editTodoVal: e.target.value });
  };

  handleEditTodo = async () => {
    try {
      const id = this.state.currentEditID;
      const newTodo = {
        text: this.state.editTodoVal,
        completed: this.state.todos[id].completed,
      };
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      const newTodos = this.state.todos;
      newTodos[data._id] = {
        text: data.text,
        completed: data.completed,
      };
      this.setState({ todos: newTodos, isEditting: false });
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data == null) throw new Error('deletion failed');

      const newTodos = this.state.todos;
      delete newTodos[id];
      this.setState({ todos: newTodos });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const todos = [];
    for (let [id, todo] of Object.entries(this.state.todos)) {
      todos.push(
        <Todo
          id={id}
          key={id}
          text={todo.text}
          edit={this.handleStartEdit}
          delete={this.handleDeleteTodo}
        ></Todo>
      );
    }

    return (
      <div className={styles.mainContainer}>
        <h1 className={styles.header}>Todo List</h1>

        <TodoInput
          val={this.state.addTodoVal}
          change={this.handleAddChange}
          submit={this.handleAddTodo}
          label='Add Todo'
        ></TodoInput>
        {this.state.isEditting ? (
          <TodoInput
            val={this.state.editTodoVal}
            change={this.handleEditChange}
            submit={this.handleEditTodo}
            label='Save Edit'
          ></TodoInput>
        ) : (
          <ul className={styles.todosContainer}>{todos}</ul>
        )}
      </div>
    );
  }
}
