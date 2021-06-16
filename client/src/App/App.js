import TodoList from '../containers/TodoList/TodoList';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.mainContainer}>
      <TodoList></TodoList>
    </div>
  );
}

export default App;
