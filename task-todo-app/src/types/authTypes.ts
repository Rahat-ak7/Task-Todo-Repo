export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthState {
    user: null | any;
    token: null | string;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: null | string | any;
  }