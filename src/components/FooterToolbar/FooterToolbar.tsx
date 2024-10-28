import { FC } from "react";
import { useTodoContext } from "../../context/TodoContext";
import styles from "./FooterToolbar.module.scss";
import { TodoFilter } from "../../types/todos";

const FooterToolbar: FC = () => {
  const { todos, clearCompletedTasks, setFilter, filter } = useTodoContext();
  const activeCount = todos.filter((todo) => !todo.isCompleted).length;
  const getButtonClass = (buttonFilter: TodoFilter): string => {
    return `${styles.button} ${filter === buttonFilter ? styles.active : ""}`;
  };

  return (
    <div className={styles.toolbar}>
      <span className={styles.counter}>{activeCount} items left</span>
      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={getButtonClass("all")}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={getButtonClass("active")}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={getButtonClass("completed")}
        >
          Completed
        </button>
      </div>
      <button
        onClick={clearCompletedTasks}
        className={`${styles.button} ${styles.clearButton}`}
      >
        Clear Completed
      </button>
    </div>
  );
};

export default FooterToolbar;
