import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

import { getContactPage } from '../../api/postsService';
import { queryKeys } from '../../api/queryKeys';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const {
    data: contact,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.contactPage,
    queryFn: getContactPage,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: '',
    });

    setSuccessMessage('');
  }

  function validateForm() {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
    }

    return errors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSuccessMessage('Your message has been sent successfully.');

    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setFormErrors({});
  }

  if (isLoading) {
    return <LoadingState message="Loading contact page..." />;
  }

  if (isError) {
    return <ErrorState message={error.message || 'Failed to load contact page'} />;
  }

  if (!contact) {
    return <ErrorState message="Contact page content was not found." />;
  }

  return (
    <div className="website-page contact-page">
      <span className="page-badge">{contact.badge}</span>

      <h1>{contact.title}</h1>

      <p>{contact.body}</p>

      <div className="contact-info-grid">
        <div className="contact-info-card">
          <h2>Email</h2>
          <p>{contact.email}</p>
        </div>

        <div className="contact-info-card">
          <h2>Phone</h2>
          <p>{contact.phone}</p>
        </div>

        <div className="contact-info-card">
          <h2>Address</h2>
          <p>{contact.address}</p>
        </div>
      </div>

      <div className="contact-social-links">
        {contact.facebook && (
          <a href={contact.facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        )}

        {contact.github && (
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}

        {contact.linkedin && (
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
          />

          {formErrors.name && (
            <span className="form-error">{formErrors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
          />

          {formErrors.email && (
            <span className="form-error">{formErrors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            name="message"
            rows="6"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />

          {formErrors.message && (
            <span className="form-error">{formErrors.message}</span>
          )}
        </div>

        {successMessage && (
          <div className="form-success">
            {successMessage}
          </div>
        )}

        <button type="submit" className="primary-btn">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactPage;