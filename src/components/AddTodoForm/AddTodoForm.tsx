import { FC, KeyboardEvent, memo, useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import styles from "./AddTodoForm.module.scss";

const AddTodoForm: FC = () => {
  const { addTask, setFilter } = useTodoContext();
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
      setFilter("all")
    }
  };

  const handleEnterKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleAddTodo}>
      <input
        required
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleEnterKeyPress}
        data-testid="add-todo-input"
      />
      <button type="submit" className={styles.addBtn} data-testid="add-todo-button">
        ADD
      </button>
    </form>
  );
};

export default memo(AddTodoForm);
