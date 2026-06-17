import { AUTH_USERS } from '../config/authConfig';

const AUTH_KEY = 'authUser';

export function login(email, password) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  const foundUser = AUTH_USERS.find((user) => {
    return (
      user.email === cleanEmail &&
      user.password === cleanPassword
    );
  });

  if (!foundUser) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  const userToStore = {
    id: foundUser.id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundUser.role,
  };

  localStorage.setItem(AUTH_KEY, JSON.stringify(userToStore));

  return {
    success: true,
    user: userToStore,
  };
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser() {
  const storedUser = localStorage.getItem(AUTH_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(AUTH_KEY);
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}

export function isAdmin() {
  const user = getCurrentUser();

  return user?.role === 'admin';
}

export function hasRole(allowedRoles = []) {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  return allowedRoles.includes(user.role);
}