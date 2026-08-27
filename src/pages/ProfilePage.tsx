import { useAuth } from '../auth/AuthContext';
import { formatDate, shortId } from '../utils/format';

export function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <section className="section page-section">
      <div className="container narrow-container">
        <div className="profile-hero">
          <div className="profile-avatar">{(user.firstName?.[0] || user.email[0]).toUpperCase()}</div>
          <div><span className="eyebrow">PROFIL</span><h1>{[user.firstName, user.lastName].filter(Boolean).join(' ') || user.email}</h1><p>{user.email}</p></div>
        </div>
        <div className="profile-grid">
          <div><span>User ID</span><strong>{shortId(user.userId)}</strong></div>
          <div><span>Status</span><strong>{user.status}</strong></div>
          <div><span>Role</span><strong>{user.roles.join(', ')}</strong></div>
          <div><span>Account created</span><strong>{formatDate(user.createdAt)}</strong></div>
        </div>
      </div>
    </section>
  );
}
