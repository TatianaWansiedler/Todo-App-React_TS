import {
  loadFromLocalStorage,
  saveToLocalStorage,
  addTodo,
  toggleComplete,
  clearCompleted,
} from "./todosFunctions";
import { Todo } from "../types/todos";

const mockTodos: Todo[] = [
  { id: 1, text: "Test todo 1", isCompleted: false },
  { id: 2, text: "Test todo 2", isCompleted: true },
  { id: 3, text: "Test todo 3", isCompleted: false },
];

describe("Todos", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Local Storage Operations", () => {
    test("loadFromLocalStorage should return an empty array when there are no todos", () => {
      const todos = loadFromLocalStorage();
      expect(todos).toEqual([]);
    });

    test("loadFromLocalStorage should return todos from localStorage", () => {
      saveToLocalStorage(mockTodos);
      const loadedTodos = loadFromLocalStorage();
      expect(loadedTodos).toEqual(mockTodos);
    });

    test("saveToLocalStorage should save todos to localStorage", () => {
      saveToLocalStorage(mockTodos);
      const storedTodos = localStorage.getItem("todos");
      expect(storedTodos).toEqual(JSON.stringify(mockTodos));
    });
  });

  describe("Todo Manipulation", () => {
    test("addTodo should add a new todo and save it to localStorage", () => {
      saveToLocalStorage(mockTodos);
      const newTodos = addTodo(mockTodos, "New todo");
      expect(newTodos.length).toBe(mockTodos.length + 1);
      expect(newTodos[0].text).toBe("New todo");
      expect(localStorage.getItem("todos")).toEqual(JSON.stringify(newTodos));
    });

    test("toggleComplete should toggle the completion status of a todo", () => {
      saveToLocalStorage(mockTodos);
      const updatedTodos = toggleComplete(mockTodos, 1);
      expect(updatedTodos[0].isCompleted).toBe(true);
      expect(localStorage.getItem("todos")).toEqual(
        JSON.stringify(updatedTodos)
      );
    });

    test("toggleComplete should not modify the todos if id is not found", () => {
      saveToLocalStorage(mockTodos);
      const updatedTodos = toggleComplete(mockTodos, 999);
      expect(updatedTodos).toEqual(mockTodos);
    });

    test("clearCompleted should remove completed todos and save the updated list", () => {
      saveToLocalStorage(mockTodos);
      const updatedTodos = clearCompleted(mockTodos);
      expect(updatedTodos.length).toBe(2);
      expect(updatedTodos[0].text).toBe("Test todo 1");
      expect(localStorage.getItem("todos")).toEqual(
        JSON.stringify(updatedTodos)
      );
    });
  });
});
