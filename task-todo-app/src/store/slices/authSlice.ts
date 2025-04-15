import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import api from '../../services/api';
import { setAuthToken } from '../../utils/auth';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    _id: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ email: string; _id: string; token: string }>) {
      state.isAuthenticated = true;
      state.user = {
        email: action.payload.email,
        _id: action.payload._id,
      };
      state.loading = false;
      state.error = null;
      setAuthToken(action.payload.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    loadUserStart(state) {
      state.loading = true;
    },
    loadUserSuccess(state, action: PayloadAction<{ email: string; _id: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadUserFailure(state, action: PayloadAction<string>) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      localStorage.removeItem('token');
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  loadUserStart,
  loadUserSuccess,
  loadUserFailure,
} = authSlice.actions;

export default authSlice.reducer;

// Thunk actions
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await api.post('/auth/login', { email, password });
    dispatch(loginSuccess(response.data));
  } catch (err: any) {
    dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
  }
};

export const register = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await api.post('/auth/register', { email, password });
    dispatch(loginSuccess(response.data));
  } catch (err: any) {
    dispatch(loginFailure(err.response?.data?.message || 'Registration failed'));
  }
};

export const loadUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(loadUserStart());
    const response = await api.get('/auth/me');
    dispatch(loadUserSuccess(response.data));
  } catch (err: any) {
    dispatch(loadUserFailure(err.response?.data?.message || 'Failed to load user'));
  }
};

export const logoutUser = (): AppThunk => (dispatch) => {
  dispatch(logout());
};


