import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { StatusMessage } from '../components/StatusMessage';
import { useLanguage } from '../i18n/LanguageContext';

export function LoginPage() {
  const { t } = useLanguage();
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
      setError(e instanceof Error ? e.message : 'Sign-in failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">ACCOUNT</span>
        <h1>{t('loginTitle')}</h1>
        <p>{t('loginText')}</p>
        {state?.message && <StatusMessage type="success">{state.message}</StatusMessage>}
        {error && <StatusMessage type="error">{error}</StatusMessage>}

        <form className="form-stack" onSubmit={submit}>
          <label>{t('email')}<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label>{t('password')}<input required type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          <button className="button button-full" disabled={submitting} type="submit">{submitting ? 'Signing in…' : 'Sign in'}</button>
        </form>
        <p className="auth-switch">{t('noAccount')} <Link to="/register">{t('register')}</Link></p>
      </div>
      <div className="auth-aside"><strong>ONE GATEWAY.</strong><span>ALL SERVICES.</span></div>
    </section>
  );
}
