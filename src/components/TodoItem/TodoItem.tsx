import { FC } from "react";
import { Todo } from "../../types/todos";
import styles from "./TodoItem.module.scss";
import { useTodoContext } from "../../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const { toggle, deleteTask } = useTodoContext();
  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggle(todo.id)}
        className={styles.checkbox}
      />
      <span className={todo.isCompleted ? styles.completed : ""}>
        {todo.text}
      </span>
      <button onClick={() => deleteTask(todo.id)} className={styles.deleteBtn}>
        x
      </button>
    </li>
  );
};

export default TodoItem;
