import React, { useState } from 'react';
import { Todo } from '../../types/todoTypes';
import { useAppDispatch } from '../../store/store';
import { deleteTodo, toggleTodo, updateTodo } from '../../features/todos/todosSlice';
import Button from '../common/Button';
import './TodoItem.scss';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = () => {
    dispatch(toggleTodo(todo));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ id: todo._id, title: editTitle }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="todo-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="todo-edit-input"
          />
          <Button size="small" onClick={handleUpdate}>
            Save
          </Button>
          <Button variant="secondary" size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      ) : (
        <>
          <div className="todo-content">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={handleToggle}
              className="todo-checkbox"
            />
            <span className="todo-title">{todo.title}</span>
          </div>
          <div className="todo-actions">
            <Button variant="secondary" size="small" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" size="small" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;