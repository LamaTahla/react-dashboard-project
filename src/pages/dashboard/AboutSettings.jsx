import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

import { getAboutPage, updateAboutPage } from '../../api/postsService';
import { queryKeys } from '../../api/queryKeys';

function AboutSettings() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    badge: '',
    title: '',
    body: '',
    card1Title: '',
    card1Description: '',
    card2Title: '',
    card2Description: '',
    card3Title: '',
    card3Description: '',
    card4Title: '',
    card4Description: '',
  });

  const {
    data: about,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.aboutPage,
    queryFn: getAboutPage,
  });

  useEffect(() => {
    if (about) {
      setFormData({
        badge: about.badge || '',
        title: about.title || '',
        body: about.body || '',
        card1Title: about.card1Title || '',
        card1Description: about.card1Description || '',
        card2Title: about.card2Title || '',
        card2Description: about.card2Description || '',
        card3Title: about.card3Title || '',
        card3Description: about.card3Description || '',
        card4Title: about.card4Title || '',
        card4Description: about.card4Description || '',
      });
    }
  }, [about]);

  const mutation = useMutation({
   mutationFn: (updatedData) => {
  if (!about?.id) {
    throw new Error('About page id was not found');
  }

  return updateAboutPage(about.id, {
    ...about,
    ...updatedData,
  });
},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.aboutPage });
      toast.success('About page updated successfully');
    },
    onError: () => {
      toast.error('Failed to update about page');
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
    return <LoadingState message="Loading about settings..." />;
  }

  if (isError) {
    return <ErrorState message={error.message} />;
  }

  if (!about) {
    return <ErrorState message="About page content was not found." />;
  }

  return (
    <div className="page">
      <PageHeader
        title="About Settings"
        subtitle="Update the content displayed on the public About page"
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
            rows="5"
          />
        </div>

        <h2>Cards</h2>

        <div className="form-group">
          <label>Card 1 Title</label>
          <input
            type="text"
            name="card1Title"
            value={formData.card1Title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Card 1 Description</label>
          <textarea
            name="card1Description"
            value={formData.card1Description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Card 2 Title</label>
          <input
            type="text"
            name="card2Title"
            value={formData.card2Title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Card 2 Description</label>
          <textarea
            name="card2Description"
            value={formData.card2Description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Card 3 Title</label>
          <input
            type="text"
            name="card3Title"
            value={formData.card3Title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Card 3 Description</label>
          <textarea
            name="card3Description"
            value={formData.card3Description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label>Card 4 Title</label>
          <input
            type="text"
            name="card4Title"
            value={formData.card4Title}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Card 4 Description</label>
          <textarea
            name="card4Description"
            value={formData.card4Description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Updating...' : 'Update About Page'}
        </button>
      </form>
    </div>
  );
}

export default AboutSettings;