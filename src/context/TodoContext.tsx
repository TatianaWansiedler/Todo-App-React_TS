import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Todo, TodoFilter } from "../types/todos";
import {
  addTodo,
  clearCompleted,
  loadFromLocalStorage,
  saveToLocalStorage,
  toggleComplete,
} from "../utils/todosFunctions";

export interface TodoContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  addTask: (text: string) => void;
  toggle: (id: number) => void;
  clearCompletedTasks: () => void;
  setFilter: (filter: TodoFilter) => void;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(loadFromLocalStorage());
  const [filter, setFilter] = useState<TodoFilter>("all");

  useEffect(() => {
    setTodos(loadFromLocalStorage());
  }, []);

  useEffect(() => {
    saveToLocalStorage(todos);
  }, [todos]);

  const addTask = useCallback((text: string) => {
    setTodos((prev) => addTodo(prev, text));
  }, []);

  const toggle = useCallback((id: number) => {
    setTodos((prev) => toggleComplete(prev, id));
  }, []);

  const clearCompletedTasks = useCallback(() => {
    setTodos((prev) => clearCompleted(prev));
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (filter) {
        case "active":
          return !todo.isCompleted;
        case "completed":
          return todo.isCompleted;
        case "all":
        default:
          return true;
      }
    });
  }, [todos, filter]);

  const contextValue = useMemo(
    () => ({
      todos,
      addTask,
      toggle,
      clearCompletedTasks,
      setFilter,
      filter,
      filteredTodos,
    }),
    [todos, addTask, toggle, clearCompletedTasks, filter, filteredTodos]
  );

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
