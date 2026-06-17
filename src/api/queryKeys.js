export const queryKeys = {
  posts: ['posts'],
  users: ['users'],

  post: (id) => ['posts', id],
  user: (id) => ['users', id],
};