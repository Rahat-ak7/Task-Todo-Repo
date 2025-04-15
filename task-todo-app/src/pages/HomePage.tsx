import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchTodos } from '../features/todos/todosSlice';
import Layout from '../components/layout/Layout';
import AddTodoForm from '../components/todos/AddTodoForm';
import TodoList from '../components/todos/TodoList';
import { useAuthRedirect } from '../hooks/useAuth';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useAuthRedirect();

  useEffect(() => {
    if (token) {
      dispatch(fetchTodos());
    }
  }, [dispatch, token]);

  return (
    <Layout>
      <h1>My Todos</h1>
      <AddTodoForm />
      <TodoList />
    </Layout>
  );
};

export default HomePage;