import { API_BASE_URL } from '../config/apiConfig';

export const getPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();

  return data.filter(
    (post) => post.type !== 'page' && post.slug !== 'about'
  );
};

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
    throw new Error('Failed to fetch about page');
  }

  const data = await response.json();

  const aboutPage = data.find((post) => post.slug === 'about');

  if (!aboutPage) {
    throw new Error('About page content was not found');
  }

  return aboutPage;
};

export const updateAboutPage = async (id, aboutData) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...aboutData,
      id,
      slug: 'about',
      type: 'page',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to update about page');
  }

  return response.json();
};