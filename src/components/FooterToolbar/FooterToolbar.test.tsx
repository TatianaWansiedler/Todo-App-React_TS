import { fireEvent, render, screen } from "@testing-library/react";
import { mockTodos } from '../../tests/mockData';
import { MockTodoContextProvider } from "../../tests/mockTodoContextProvider";
import FooterToolbar from "./FooterToolbar";

const renderFooterToolbar = (contextOverrides = {}) => {
  render(
    <MockTodoContextProvider value={contextOverrides}>
      <FooterToolbar />
    </MockTodoContextProvider>
  );
};

describe("FooterToolbar", () => {
  test("displays the count of active items", () => {
    renderFooterToolbar({ todos: mockTodos });

    const counter = screen.getByTestId("active-count");
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveTextContent("2 items left");
  });

  test("applies active class to the correct filter button", () => {
    renderFooterToolbar({ todos: mockTodos, filter: "active" });

    const allButton = screen.getByTestId("filter-all");
    const activeButton = screen.getByTestId("filter-active");
    const completedButton = screen.getByTestId("filter-completed");

    expect(activeButton).toHaveClass("active");
    expect(allButton).not.toHaveClass("active");
    expect(completedButton).not.toHaveClass("active");
  });

  test("calls setFilter with 'all' when 'All' button is clicked", () => {
    const mockSetFilter = jest.fn();

    renderFooterToolbar({ todos: mockTodos, setFilter: mockSetFilter });

    const allButton = screen.getByTestId("filter-all");
    fireEvent.click(allButton);

    expect(mockSetFilter).toHaveBeenCalledWith("all");
  });

  test("calls setFilter with 'active' when Active button is clicked", () => {
    const mockSetFilter = jest.fn();

    renderFooterToolbar({ todos: mockTodos, setFilter: mockSetFilter });

    const activeButton = screen.getByTestId("filter-active");
    fireEvent.click(activeButton);

    expect(mockSetFilter).toHaveBeenCalledWith("active");
  });

  test("calls setFilter with 'completed' when Completed button is clicked", () => {
    const mockSetFilter = jest.fn();

    renderFooterToolbar({ todos: mockTodos, setFilter: mockSetFilter });

    const completedButton = screen.getByTestId("filter-completed");
    fireEvent.click(completedButton);

    expect(mockSetFilter).toHaveBeenCalledWith("completed");
  });

  test("calls clearCompletedTasks when Clear Completed button is clicked", () => {
    const mockClearCompletedTasks = jest.fn();

    renderFooterToolbar({
      todos: mockTodos,
      clearCompletedTasks: mockClearCompletedTasks,
    });

    const clearButton = screen.getByTestId("clear-completed");
    fireEvent.click(clearButton);

    expect(mockClearCompletedTasks).toHaveBeenCalled();
  });

  test("disables Clear Completed button when all tasks are completed", () => {
    const mockClearCompletedTasks = jest.fn();

    renderFooterToolbar({
      todos: [],
      clearCompletedTasks: mockClearCompletedTasks,
    });

    const clearButton = screen.getByTestId("clear-completed");
    expect(clearButton).toBeDisabled();
  });
});
