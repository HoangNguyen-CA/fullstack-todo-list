import React, { Component } from 'react';
import Todo from '../components/Todo';

export default class TodoList extends Component {
  state = {
    todos: [],
  };

  async getTodos() {
    const res = await fetch('/api/todos');
    const data = await res.json();
    this.setState({ todos: data });
  }

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div>
        {this.state.todos.map((todo, index) => {
          return <Todo key={todo._id} text={todo.text}></Todo>;
        })}
      </div>
    );
  }
}
