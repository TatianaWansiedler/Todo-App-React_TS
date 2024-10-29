import { FC } from "react";
import "./App.scss";
import FooterToolbar from "./components/FooterToolbar/FooterToolbar";
import TodoList from "./components/TodoList/TodoList";
import { TodoProvider } from "./context/TodoContext";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

const App: FC = () => {
  return (
    <TodoProvider>
      <main className="app">
        <h1>todos</h1>
        <div className="container">
          <AddTodoForm />
          <TodoList />
          <FooterToolbar />
        </div>
      </main>
    </TodoProvider>
  );
};

export default App;
