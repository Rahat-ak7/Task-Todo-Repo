import React, { useState } from 'react';
import { useAppDispatch } from '../store/store';
import { registerUser } from '../features/auth/authSlice';
import { useUnauthRedirect } from '../hooks/useAuth';
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import './AuthPage.scss';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  useUnauthRedirect();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ email, password })).unwrap();
    } catch (err: any) {
      console.log("🚀 ~ handleSubmit ~ err:", err)
      // setError(err?.[0]?. || 'Registration failed');
      setError(err?.errors?.[0]?.msg || err?.msg ||'Registration failed');
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <h1>Register</h1>
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
            Register
          </Button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;