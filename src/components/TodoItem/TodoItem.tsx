import { FC, memo } from "react";
import { Todo } from "../../types/todos";
import styles from "./TodoItem.module.scss";
import { useTodoContext } from "../../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
  "data-testid"?: string;
}

const TodoItem: FC<TodoItemProps> = ({ todo, "data-testid": testId }) => {
  const { toggle } = useTodoContext();
  return (
    <li className={styles.item} data-testid={testId}>
      <div className={styles["checkbox-wrapper-18"]}>
        <div className={styles["round"]}>
          <input
            type="checkbox"
            id={`checkbox-${todo.id}`}
            checked={todo.isCompleted}
            onChange={() => toggle(todo.id)}
            ddata-testid="checkbox"
          />
          <label htmlFor={`checkbox-${todo.id}`}></label>
        </div>
      </div>
      <span className={todo.isCompleted ? styles.completed : ""}>
        {todo.text}
      </span>
    </li>
  );
};

export default memo(TodoItem);
