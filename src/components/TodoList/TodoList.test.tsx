import { render, screen } from "@testing-library/react";
import { mockTodos } from '../../tests/mockData';
import { MockTodoContextProvider } from "../../tests/mockTodoContextProvider";
import TodoList from "./TodoList";

const renderTodoList = (contextOverrides = {}) => {
  render(
    <MockTodoContextProvider value={contextOverrides}>
      <TodoList />
    </MockTodoContextProvider>
  );
};

describe("TodoList", () => {
  test("renders empty message when no tasks are available", () => {
    renderTodoList({ filteredTodos: [] });

    const emptyMessage = screen.getByTestId("empty-message");
    expect(emptyMessage).toBeInTheDocument();
  });

  test("renders todo items when tasks are available", () => {
    renderTodoList({ filteredTodos: mockTodos });

    const todoList = screen.getByTestId("todo-list");
    expect(todoList).toBeInTheDocument();

    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems.length).toBe(mockTodos.length);

    const firstTodoText = mockTodos[0].text;
    expect(screen.getByText(firstTodoText)).toBeInTheDocument();
  });
});
