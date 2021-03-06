import React, { Component } from 'react';
import Todo from '../../components/Todo/Todo';
import TodoInput from '../../components/TodoInput/TodoInput';
import Button from '../../components/Button/Button';
import styles from './TodoList.module.css';
import Modal from '../../components/Modal/Modal';
import { getTodos, addTodo, editTodo, deleteTodo } from './API_Util';

export default class TodoList extends Component {
  state = {
    todos: {},
    show: {
      completed: true,
      uncompleted: true,
    },
    loading: false,
    error: '',
    addTodoVal: '',
    editTodoVal: '',
    currentEditID: '',
    isEditting: false,
  };

  handleAddChange = (e) => {
    this.setState({ addTodoVal: e.target.value });
  };

  handleEditChange = (e) => {
    this.setState({ editTodoVal: e.target.value });
  };

  handleStartEdit = (id) => {
    const editText = this.state.todos[id].text;
    this.setState({
      isEditting: true,
      currentEditID: id,
      editTodoVal: editText,
    });
  };

  async loadTodos() {
    try {
      this.setState({ loading: true });

      const data = await getTodos();
      const newTodos = {};
      for (const todo of data) {
        newTodos[todo._id] = { text: todo.text, completed: todo.completed };
      }
      this.setState({ todos: newTodos, loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e.message });
    }
  }

  handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      const inputTodo = { text: this.state.addTodoVal };
      this.setState({ loading: true });

      const data = await addTodo(inputTodo);

      //update state with result
      const newTodos = { ...this.state.todos };
      newTodos[data._id] = { text: data.text, completed: data.completed };
      this.setState({ todos: newTodos, addTodoVal: '', loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e.message });
    }
  };

  handleEditTodo = async (e) => {
    e.preventDefault();
    try {
      const id = this.state.currentEditID;
      const inputTodo = { text: this.state.editTodoVal };
      this.setState({ loading: true });

      const data = await editTodo(id, inputTodo);

      const newTodos = { ...this.state.todos };
      newTodos[data._id] = {
        text: data.text,
        completed: data.completed,
      };
      this.setState({ todos: newTodos, isEditting: false, loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e.message });
    }
  };

  handleDeleteTodo = async (id) => {
    try {
      this.setState({ loading: true });

      await deleteTodo(id);

      const newTodos = { ...this.state.todos };
      delete newTodos[id];
      this.setState({ todos: newTodos, loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e.message });
    }
  };

  handleToggleComplete = async (id) => {
    try {
      const inputTodo = { ...this.state.todos[id] };
      inputTodo.completed = !inputTodo.completed;
      this.setState({ loading: true });

      const data = await editTodo(id, inputTodo);

      const newTodos = { ...this.state.todos };
      newTodos[data._id] = {
        text: data.text,
        completed: data.completed,
      };
      this.setState({ todos: newTodos, loading: false });
    } catch (e) {
      this.setState({ loading: false, error: e.message });
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

  handleHideModal = () => {
    this.setState({ loading: false, error: '' });
  };

  componentDidMount() {
    this.loadTodos();
  }

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
        <h1 className={styles.header}>What is the plan for today?</h1>
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
        <Modal
          loading={this.state.loading}
          error={this.state.error}
          clicked={this.handleHideModal}
        ></Modal>
      </div>
    );
  }
}
