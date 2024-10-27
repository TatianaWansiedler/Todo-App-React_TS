import React from 'react';
import TodoList from './components/TodoList/TodoList';
import FooterToolbar from './components/FooterToolbar/FooterToolbar';
import { TodoProvider } from './context/TodoContext';
import './App.scss';

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="app">
        <h1>Todo List</h1>
        <TodoList />
        <FooterToolbar />
      </div>
    </TodoProvider>
  );
};

export default App;