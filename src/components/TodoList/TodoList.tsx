import { FC } from "react";
import { useTodoContext } from "../../context/TodoContext";
import AddTodo from "../AddTodoForm/AddTodoForm";
import styles from "./TodoList.module.scss";
import TodoItem from "../TodoItem/TodoItem";

const TodoList: FC = () => {
  const { todos } = useTodoContext();

  if (todos.length === 0) {
    return <p className={styles.emptyMessage}>No tasks available</p>;
  }
  
  return (
    <div>
      <AddTodo />
      <ul className={styles.list}>
        {todos.map((todo) => (
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
