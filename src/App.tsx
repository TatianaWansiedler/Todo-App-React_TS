import React from 'react';
import TodoList from './components/TodoList/TodoList';
import FooterToolbar from './components/FooterToolbar/FooterToolbar';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoList />
      <FooterToolbar />
    </div>
  );
};

export default App;
