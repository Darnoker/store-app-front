import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { StatusMessage } from '../components/StatusMessage';

export function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (form.password.length < 12) {
      setError('Hasło musi mieć co najmniej 12 znaków.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
      });
      navigate('/login', { replace: true, state: { message: 'Konto zostało utworzone. Możesz się zalogować.' } });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Rejestracja nie powiodła się.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <span className="eyebrow">NOWE KONTO</span>
        <h1>Dołącz do Store App</h1>
        <p>Backend wymaga emaila i hasła o długości 12–72 znaki.</p>
        {error && <StatusMessage type="error">{error}</StatusMessage>}
        <form className="form-stack" onSubmit={submit}>
          <div className="form-row">
            <label>Imię<input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></label>
            <label>Nazwisko<input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></label>
          </div>
          <label>Email<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Hasło<input required minLength={12} maxLength={72} type="password" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <button className="button button-full" disabled={submitting} type="submit">{submitting ? 'Tworzenie konta…' : 'Utwórz konto'}</button>
        </form>
        <p className="auth-switch">Masz już konto? <Link to="/login">Zaloguj się</Link></p>
      </div>
      <div className="auth-aside auth-aside-alt"><strong>BOOKS.</strong><span>BLADES.</span></div>
    </section>
  );
}
