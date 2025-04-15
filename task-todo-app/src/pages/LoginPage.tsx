import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { loginUser } from '../features/auth/authSlice';
import { useUnauthRedirect } from '../hooks/useAuth';
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import './AuthPage.scss';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  useUnauthRedirect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
    } catch (err: any) {
      console.log("🚀 ~ handleSubmit ~ err:", err)
      setError(err.message || 'Login failed');
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Login</h1>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" fullWidth>
            Login
          </Button>
        </form>
        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;