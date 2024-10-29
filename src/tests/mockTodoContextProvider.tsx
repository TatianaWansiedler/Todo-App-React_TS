import { FC, ReactNode } from "react";
import { TodoContext, TodoContextProps } from "../context/TodoContext";
import { TodoFilter } from "../types/todos";
import { mockTodos } from './mockData';



export const getMockContextValue = (overrides: Partial<TodoContextProps> = {}): TodoContextProps => ({
  todos: mockTodos,
  toggle: jest.fn(),
  addTask: jest.fn(),
  clearCompletedTasks: jest.fn(),
  setFilter: jest.fn(),
  filter: "all" as TodoFilter,
  filteredTodos: mockTodos,
  ...overrides,
});

interface MockTodoContextProviderProps {
  children: ReactNode;
  value?: Partial<TodoContextProps>;
}

export const MockTodoContextProvider: FC<MockTodoContextProviderProps> = ({ children, value }) => {
  return (
    <TodoContext.Provider value={getMockContextValue(value)}>
      {children}
    </TodoContext.Provider>
  );
};
