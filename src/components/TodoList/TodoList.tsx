import { FC } from "react";
import { useTodoContext } from "../../context/TodoContext";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { filteredTodos } = useTodoContext();

  if (filteredTodos.length === 0) {
    return (
      <p className={styles.emptyMessage} data-testid="empty-message">
        No tasks available
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list} data-testid="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            data-testid={`todo-item-${todo.id}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
