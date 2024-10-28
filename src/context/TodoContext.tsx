import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Todo, TodoFilter } from "../types/todos";
import {
  addTodo,
  clearCompleted,
  loadFromLocalStorage,
  toggleComplete,
} from "../utils/todosFunctions";

interface TodoContextProps {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: TodoFilter;
  addTask: (text: string) => void;
  toggle: (id: number) => void;
  clearCompletedTasks: () => void;
  setFilter: (filter: TodoFilter) => void;
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
  const [filter, setFilter] = useState<TodoFilter>("all");

  useEffect(() => {
    setTodos(loadFromLocalStorage());
  }, []);

  const addTask = (text: string) => setTodos((prev) => addTodo(prev, text));
  const toggle = (id: number) => setTodos((prev) => toggleComplete(prev, id));
  const clearCompletedTasks = () => setTodos((prev) => clearCompleted(prev));

  const filteredTodos = todos.filter((todo) => {
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

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTask,
        toggle,
        clearCompletedTasks,
        setFilter,
        filter,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
