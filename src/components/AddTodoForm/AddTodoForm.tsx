import { FC, KeyboardEvent, useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import styles from "./AddTodoForm.module.scss";

const AddTodo: FC = () => {
  const { addTask } = useTodoContext();
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTodo = (): void => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
    }
  };

  const handleEnterKeyPress = (
    e: KeyboardEvent<HTMLInputElement>,
    handleAddTodo: () => void
  ): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => handleEnterKeyPress(e, handleAddTodo)}
      />
      <button className={styles.addBtn} onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
export default AddTodo;
