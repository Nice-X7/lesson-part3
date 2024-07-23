import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { loadTodos } from "../redux/TodosSlice";
import { loadUsers } from "../redux/UsersSlice";
import { Todo } from "./Todos";
import styles from '../styles/todo.module.scss'

export const Content = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const users = useAppSelector((state) => state.users.users);
  const loadingTodos = useAppSelector((state) => state.todos.loading);
  const loadingUsers = useAppSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(loadTodos());
    dispatch(loadUsers());
  }, [dispatch]);

  if (loadingTodos || loadingUsers) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.list}>
      <Todo todos={todos} users={users} />
    </div>
  );
};