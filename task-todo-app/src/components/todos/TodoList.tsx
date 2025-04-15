import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import TodoItem from './TodoItem';
import './TodoList.scss';

const TodoList: React.FC = () => {
  const { todos, status, error } = useSelector((state: RootState) => state.todos);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="no-todos">No todos found. Add one to get started!</div>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;