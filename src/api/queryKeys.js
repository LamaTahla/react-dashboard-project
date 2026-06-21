export const queryKeys = {
  posts: ['posts'],
  users: ['users'],
  aboutPage: ['about-page'],
  contactPage: ['contact-page'],

  post: (id) => ['posts', id],
  user: (id) => ['users', id],
};
