export interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    user: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface TodoState {
    todos: Todo[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | string | any;
  }