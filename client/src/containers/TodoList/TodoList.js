import React, { Component } from 'react';
import Todo from '../../components/Todo/Todo';
import TodoInput from '../../components/TodoInput/TodoInput';
import Button from '../../components/Button/Button';
import styles from './TodoList.module.css';
import Loading from '../../components/Loading/Loading';

export default class TodoList extends Component {
  state = {
    todos: {},
    show: {
      completed: true,
      uncompleted: true,
    },
    loading: false,
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
      this.setState({ loading: true });

      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const data = await res.json();

      //update state with result
      const newTodos = { ...this.state.todos };
      newTodos[data._id] = { text: data.text, completed: data.completed };
      this.setState({ todos: newTodos, addTodoVal: '', loading: false });
    } catch (e) {
      console.log('ERROR');
    }
  };

  handleStartEdit = (id) => {
    const editText = this.state.todos[id].text;
    this.setState({
      isEditting: true,
      currentEditID: id,
      editTodoVal: editText,
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

      this.setState({ loading: true });
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      const newTodos = { ...this.state.todos };
      newTodos[data._id] = {
        text: data.text,
        completed: data.completed,
      };
      this.setState({ todos: newTodos, isEditting: false, loading: false });
    } catch (e) {
      console.log('ERROR');
    }
  };

  handleDeleteTodo = async (id) => {
    try {
      this.setState({ loading: true });
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data == null) throw new Error('deletion failed');

      const newTodos = { ...this.state.todos };
      delete newTodos[id];
      this.setState({ todos: newTodos, loading: false });
    } catch (e) {
      console.log('ERROR');
    }
  };

  handleToggleComplete = async (id) => {
    const newTodo = { ...this.state.todos[id] };
    newTodo.completed = !newTodo.completed;
    try {
      this.setState({ loading: true });
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(newTodo),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data == null) throw new Error('deletion failed');

      const newTodos = { ...this.state.todos };
      newTodos[data._id] = {
        text: data.text,
        completed: data.completed,
      };
      this.setState({ todos: newTodos, loading: false });
    } catch (e) {
      console.log('ERROR');
    }
  };

  handleShowAll = () => {
    const newShow = { completed: true, uncompleted: true };
    this.setState({ show: newShow });
  };

  handleShowCompleted = () => {
    const newShow = { completed: true, uncompleted: false };
    this.setState({ show: newShow });
  };

  handleShowUncompleted = () => {
    const newShow = { completed: false, uncompleted: true };
    this.setState({ show: newShow });
  };

  handleStopLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    const todos = [];
    const showCompleted = this.state.show.completed;
    const showUncompleted = this.state.show.uncompleted;
    const showAll = showCompleted && showUncompleted;

    for (let [id, todo] of Object.entries(this.state.todos)) {
      const todoElement = (
        <Todo
          id={id}
          key={id}
          text={todo.text}
          edit={this.handleStartEdit}
          delete={this.handleDeleteTodo}
          completed={todo.completed}
          toggleComplete={this.handleToggleComplete}
        ></Todo>
      );
      if (showCompleted && showUncompleted) {
        todos.push(todoElement);
      } else if (showCompleted && todo.completed === true) {
        todos.push(todoElement);
      } else if (showUncompleted && todo.completed === false) {
        todos.push(todoElement);
      }
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

        <div className={styles.buttonContainer}>
          <Button clicked={this.handleShowAll} active={showAll}>
            Show All
          </Button>
          <Button
            clicked={this.handleShowCompleted}
            active={showCompleted && !showAll}
          >
            Show Completed
          </Button>
          <Button
            clicked={this.handleShowUncompleted}
            active={showUncompleted && !showAll}
          >
            Show Uncompleted
          </Button>
        </div>
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
        <Loading
          show={this.state.loading}
          clicked={this.handleStopLoading}
        ></Loading>
      </div>
    );
  }
}
