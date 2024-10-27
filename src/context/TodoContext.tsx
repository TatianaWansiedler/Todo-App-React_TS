import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { Todo } from '../types/todos';

interface TodoContextProps {
  todos: Todo[];
  addTodo: (text: string) => void;
}

const TodoContext = createContext<TodoContextProps | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, isCompleted: false };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };



  return (
    <TodoContext.Provider value={{todos, addTodo}}>
      {children}
    </TodoContext.Provider>
  );
};
