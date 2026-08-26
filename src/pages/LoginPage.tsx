import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { StatusMessage } from '../components/StatusMessage';

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { from?: string; message?: string } | null;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login({ email, password });
      navigate(state?.from || '/', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Logowanie nie powiodło się.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">KONTO</span>
        <h1>Zaloguj się</h1>
        <p>Po zalogowaniu uzyskasz dostęp do profilu i swoich zamówień.</p>
        {state?.message && <StatusMessage type="success">{state.message}</StatusMessage>}
        {error && <StatusMessage type="error">{error}</StatusMessage>}

        <form className="form-stack" onSubmit={submit}>
          <label>Email<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>Hasło<input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <button className="button button-full" disabled={submitting} type="submit">{submitting ? 'Logowanie…' : 'Zaloguj się'}</button>
        </form>
        <p className="auth-switch">Nie masz konta? <Link to="/register">Zarejestruj się</Link></p>
      </div>
      <div className="auth-aside"><strong>ONE GATEWAY.</strong><span>ALL SERVICES.</span></div>
    </section>
  );
}
