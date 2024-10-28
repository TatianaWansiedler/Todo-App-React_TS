import { Todo } from "../types/todos";

export const loadFromLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
};

export const saveToLocalStorage = (todos: Todo[]): void => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const addTodo = (todos: Todo[], text: string): Todo[] => {
  const newTodo: Todo = { id: Date.now(), text, isCompleted: false };
  const updatedTodos = [newTodo, ...todos];
  saveToLocalStorage(updatedTodos);
  return updatedTodos;
};

export const toggleComplete = (todos: Todo[], id: number): Todo[] => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return todos;

  const updatedTodos = [
    ...todos.slice(0, index),
    { ...todos[index], isCompleted: !todos[index].isCompleted },
    ...todos.slice(index + 1),
  ];

  saveToLocalStorage(updatedTodos);
  return updatedTodos;
};

export const clearCompleted = (todos: Todo[]): Todo[] => {
  const updatedTodos = todos.filter((todo) => !todo.isCompleted);
  saveToLocalStorage(updatedTodos);
  return updatedTodos;
};
