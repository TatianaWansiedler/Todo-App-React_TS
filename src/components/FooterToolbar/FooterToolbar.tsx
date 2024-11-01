import { FC, memo } from "react";
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
      <span className={styles.counter} data-testid="active-count">{activeCount} items left</span>
      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={getButtonClass("all")}
          data-testid="filter-all"
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={getButtonClass("active")}
          data-testid="filter-active"
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={getButtonClass("completed")}
          data-testid="filter-completed"
        >
          Completed
        </button>
      </div>
      <button
        onClick={clearCompletedTasks}
        className={`${styles.button} ${styles.clearButton}`}
        data-testid="clear-completed"
        disabled={!todos.length}
      >
        Clear completed
      </button>
    </div>
  );
};

export default memo(FooterToolbar);
