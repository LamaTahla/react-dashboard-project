import { API_BASE_URL } from '../config/apiConfig';

export async function getUsers() {
  const response = await fetch(`${API_BASE_URL}/users`);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function getUserById(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}