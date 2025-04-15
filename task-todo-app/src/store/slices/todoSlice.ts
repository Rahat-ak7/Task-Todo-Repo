import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Todo } from '../../types/todoTypes';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
});

export const addTodoAsync = createAsyncThunk('todo/addTodo', async (text: string) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/todos`,
    { text },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
  return response.data;
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // Sync reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(addTodoAsync.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      });
  },
});

export const { /* sync actions if any */ } = todoSlice.actions;
export default todoSlice.reducer;