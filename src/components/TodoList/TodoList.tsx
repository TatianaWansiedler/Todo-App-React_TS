import { FC } from "react";
import { useTodoContext } from "../../context/TodoContext";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { filteredTodos } = useTodoContext();

  if (filteredTodos.length === 0) {
    return <p className={styles.emptyMessage}>No tasks available</p>;
  }

  return (
    <div>
      <ul className={styles.list}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
