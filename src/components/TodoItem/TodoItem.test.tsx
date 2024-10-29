import { fireEvent, render, screen } from "@testing-library/react";
import { MockTodoContextProvider } from "../../tests/mockTodoContextProvider";
import { Todo } from "../../types/todos";
import TodoItem from "./TodoItem";

const renderTodoItem = (todo: Todo, contextOverrides = {}) => {
  render(
    <MockTodoContextProvider value={contextOverrides}>
      <TodoItem todo={todo} />
    </MockTodoContextProvider>
  );
};

describe("TodoItem", () => {
  const todo: Todo = { id: 1, text: "Test Todo", isCompleted: false };

  test("renders todo text", () => {
    renderTodoItem(todo);

    const todoText = screen.getByText("Test Todo");
    expect(todoText).toBeInTheDocument();
  });

  test("checkbox is unchecked when todo is not completed", () => {
    renderTodoItem(todo);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  test("calls toggle function when checkbox is clicked", () => {
    const mockToggle = jest.fn();
    renderTodoItem(todo, { toggle: mockToggle });

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(todo.id);
  });
  
  test("adds .completed class when todo is completed", () => {
    const completedTodo: Todo = { id: 1, text: "Completed Todo", isCompleted: true };
    renderTodoItem(completedTodo);

    const todoElement = screen.getByText("Completed Todo");
    expect(todoElement).toHaveClass("completed");
  });
});
