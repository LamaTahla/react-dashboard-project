import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

import { getContactPage, updateContactPage } from '../../api/postsService';
import { queryKeys } from '../../api/queryKeys';

function ContactSettings() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    badge: '',
    title: '',
    body: '',
    email: '',
    phone: '',
    address: '',
    facebook: '',
    github: '',
    linkedin: '',
  });

  const {
    data: contact,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.contactPage,
    queryFn: getContactPage,
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        badge: contact.badge || '',
        title: contact.title || '',
        body: contact.body || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        facebook: contact.facebook || '',
        github: contact.github || '',
        linkedin: contact.linkedin || '',
      });
    }
  }, [contact]);

  const mutation = useMutation({
    mutationFn: (updatedData) => {
      if (!contact?.id) {
        throw new Error('Contact page id was not found');
      }

      return updateContactPage(contact.id, {
        ...contact,
        ...updatedData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.contactPage });
      toast.success('Contact page updated successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update contact page');
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate(formData);
  };

  if (isLoading) {
    return <LoadingState message="Loading contact settings..." />;
  }

  if (isError) {
    return <ErrorState message={error.message} />;
  }

  if (!contact) {
    return <ErrorState message="Contact page content was not found." />;
  }

  return (
    <div className="page">
      <PageHeader
        title="Contact Settings"
        subtitle="Update the content displayed on the public Contact page"
      />

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Badge</label>
          <input
            type="text"
            name="badge"
            value={formData.badge}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <h2>Social Links</h2>

        <div className="form-group">
          <label>Facebook</label>
          <input
            type="url"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub</label>
          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn</label>
          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Updating...' : 'Update Contact Page'}
        </button>
      </form>
    </div>
  );
}

export default ContactSettings;