import React from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toggleTodo, deleteTodo } from "../redux/TodosSlice";
import styles from '../styles/todo.module.scss'

type TodoProps = {
  todos: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }[];
  users: {
    id: number;
    name: string;
    email: string;
  }[];
};

export const Todo: React.FC<TodoProps> = ({ todos, users }) => {
  const dispatch = useAppDispatch();

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className={styles.list}>
      {todos.map((todo) => {
        const user = users.find((user) => user.id === todo.userId);
        return (
          <div key={todo.id} className={styles.todo}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <div className="text">
              <span>{todo.title}</span> - <span>{user ? user.email : "Unknown user"}</span>              
            </div>
            <button className={styles.remove_button} onClick={() => handleDelete(todo.id)}>Удалить</button>
          </div>
        );
      })}
    </div>
  );
};