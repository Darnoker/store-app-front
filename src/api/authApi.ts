import { apiFetch } from './http';
import type { AccessToken, LoginRequest, RegisterRequest, UserProfile } from '../types/api';

export const authApi = {
  login(payload: LoginRequest) {
    return apiFetch<AccessToken>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  register(payload: RegisterRequest) {
    return apiFetch<UserProfile>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  me() {
    return apiFetch<UserProfile>('/users/me', { auth: true });
  },
};
