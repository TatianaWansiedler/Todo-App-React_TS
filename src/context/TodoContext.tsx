import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import { Todo } from "../types/todos";
import {
  addTodo,
  clearCompleted,
  deleteTodo,
  loadFromLocalStorage,
  toggleComplete,
} from "../utils/todosFunctions";

interface TodoContextProps {
  todos: Todo[];
  addTask: (text: string) => void;
  toggle: (id: number) => void;
  deleteTask: (id: number) => void;
  clearCompletedTasks: () => void;
}

const TodoContext = createContext<TodoContextProps | null>(null);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(loadFromLocalStorage());

  useEffect(() => {
    setTodos(loadFromLocalStorage());
  }, []);

  const addTask = (text: string) => setTodos((prev) => addTodo(prev, text));
  const toggle = (id: number) => setTodos((prev) => toggleComplete(prev, id));
  const deleteTask = (id: number) => setTodos((prev) => deleteTodo(prev, id));
  const clearCompletedTasks = () => setTodos((prev) => clearCompleted(prev));

  return (
    <TodoContext.Provider
      value={{ todos, addTask, toggle, deleteTask, clearCompletedTasks }}
    >
      {children}
    </TodoContext.Provider>
  );
};
