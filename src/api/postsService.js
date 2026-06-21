import { API_BASE_URL } from '../config/apiConfig';

export async function getPosts() {
  const response = await fetch(`${API_BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

export async function getPostById(id) {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
}

export async function createPost(postData) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
}

export async function updatePost({ id, postData }) {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Failed to update post');
  }

  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  return true;
}
export const getAboutPage = async () => {
  const response = await fetch(`${API_BASE_URL}/posts?slug=about`);

  if (!response.ok) {
    throw new Error("Failed to fetch about page");
  }

  const data = await response.json();

  return data[0];
};

export const updateAboutPage = async (id, aboutData) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...aboutData,
      slug: "about",
      type: "page",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update about page");
  }

  return response.json();
};