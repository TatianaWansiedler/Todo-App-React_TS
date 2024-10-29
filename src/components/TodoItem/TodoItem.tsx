import { FC } from "react";
import { Todo } from "../../types/todos";
import styles from "./TodoItem.module.scss";
import { useTodoContext } from "../../context/TodoContext";

interface TodoItemProps {
  todo: Todo;
  "data-testid"?: string;
}

const TodoItem: FC<TodoItemProps> = ({ todo, 'data-testid': testId }) => {
  const { toggle } = useTodoContext();
  return (
    <li className={styles.item} data-testid={testId}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => toggle(todo.id)}
        className={styles.checkbox}
      />
      <span className={todo.isCompleted ? styles.completed : ""}>
        {todo.text}
      </span>
    </li>
  );
};

export default TodoItem;
