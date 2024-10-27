import { FC } from "react";
import { useTodoContext } from "../../context/TodoContext";
import AddTodo from '../AddTodoForm/AddTodoForm';
import styles from "./TodoList.module.scss";

const TodoList: FC = () => {
  const { todos } = useTodoContext();

  return (
    <div>
      <AddTodo />
      <ul className={styles.list}>
        {todos.map(todo => (
          <li key={todo.id} className={styles.todoItem}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
