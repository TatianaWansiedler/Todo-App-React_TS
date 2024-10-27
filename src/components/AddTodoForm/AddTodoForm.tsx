import { FC, useState } from "react";
import { useTodoContext } from "../../context/TodoContext";
import styles from "./AddTodoForm.module.scss";

const AddTodo: FC = () => {
  const { addTodo } = useTodoContext();
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTodo = (): void => {
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask("");
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add task</button>
    </div>
  );
};
export default AddTodo;
