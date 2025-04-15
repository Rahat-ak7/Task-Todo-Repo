import React, { useState } from 'react';
import { useAppDispatch } from '../../store/store';
import { addNewTodo } from '../../features/todos/todosSlice';
import Input from '../common/Input';
import Button from '../common/Button';
import './AddTodoForm.scss';

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(addNewTodo(title));
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo..."
        className="add-todo-input"
      />
      <Button type="submit" variant="primary" className="add-todo-button">
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;