import { useState } from 'react';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

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

  return (
    <div className="website-page">
      <h1>Contact Us</h1>

      <p>
        Have a question or want to get in touch? Send us a message and we will
        respond as soon as possible.
      </p>

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