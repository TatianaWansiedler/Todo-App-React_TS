import { FC } from 'react';
import './App.scss';
import FooterToolbar from './components/FooterToolbar/FooterToolbar';
import TodoList from './components/TodoList/TodoList';
import { TodoProvider } from './context/TodoContext';
import AddTodo from './components/AddTodoForm/AddTodoForm';

const App: FC = () => {
  return (
    <TodoProvider>
      <div className="app">
        <h1>Todos</h1>
        <AddTodo />
        <TodoList />
        <FooterToolbar />
      </div>
    </TodoProvider>
  );
};

export default App;