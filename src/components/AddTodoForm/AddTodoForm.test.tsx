import { fireEvent, render, screen } from "@testing-library/react";
import { MockTodoContextProvider } from "../../tests/mockTodoContextProvider";
import AddTodoForm from './AddTodoForm';

const renderAddTodoForm = (contextOverrides = {}) => {
  render(
    <MockTodoContextProvider value={contextOverrides}>
      <AddTodoForm />
    </MockTodoContextProvider>
  );
};

describe("AddTodoForm", () => {
  test("renders input and button", () => {
    renderAddTodoForm();

    const input = screen.getByTestId("add-todo-input");
    const button = screen.getByTestId("add-todo-button");
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("adds task when the button is clicked", () => {
    const mockAddTask = jest.fn();
    renderAddTodoForm({ addTask: mockAddTask });

    const input = screen.getByTestId("add-todo-input");
    const button = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);

    expect(mockAddTask).toHaveBeenCalledWith("New Task");
    expect(input).toHaveValue("");
  });

  test("adds task when the Enter key is pressed", () => {
    const mockAddTask = jest.fn();
    renderAddTodoForm({ addTask: mockAddTask });

    const input = screen.getByTestId("add-todo-input");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(mockAddTask).toHaveBeenCalledWith("New Task");
    expect(input).toHaveValue("");
  });

  test("does not add task if input is empty", () => {
    const mockAddTask = jest.fn();
    renderAddTodoForm({ addTask: mockAddTask });

    const input = screen.getByTestId("add-todo-input");
    const button = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    expect(mockAddTask).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    expect(mockAddTask).not.toHaveBeenCalled();
  });
});