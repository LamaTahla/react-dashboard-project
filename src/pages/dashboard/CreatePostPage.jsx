import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';

import { createPost } from '../../api/postsService';
import { queryKeys } from '../../api/queryKeys';
import { useAuth } from '../../context/AuthContext';

const initialState = {
  formData: {
    title: '',
    body: '',
    imageUrl: '',
  },
  errors: {},
  submitError: '',
};

function postFormReducer(state, action) {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
        errors: {
          ...state.errors,
          [action.field]: '',
        },
        submitError: '',
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
        submitError: '',
      };

    case 'SET_SUBMIT_ERROR':
      return {
        ...state,
        submitError: action.payload,
      };

    default:
      return state;
  }
}

function CreatePostPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(postFormReducer, initialState);

  const { formData, errors, submitError } = state;

  const createMutation = useMutation({
    mutationFn: createPost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });

      toast.success('Post created successfully');
      navigate('/admin/posts');
    },

    onError: (error) => {
      dispatch({
        type: 'SET_SUBMIT_ERROR',
        payload: error.message || 'Failed to create post',
      });

      toast.error(error.message || 'Failed to create post');
    },
  });

  function isValidUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    dispatch({
      type: 'FIELD_CHANGE',
      field: name,
      value,
    });
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.body.trim()) {
      newErrors.body = 'Body is required';
    } else if (formData.body.trim().length < 20) {
      newErrors.body = 'Body must be at least 20 characters';
    }

    if (formData.imageUrl.trim() && !isValidUrl(formData.imageUrl.trim())) {
      newErrors.imageUrl = 'Please enter a valid image URL';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      dispatch({
        type: 'SET_ERRORS',
        payload: validationErrors,
      });

      toast.error('Please fix the form errors');
      return;
    }

    createMutation.mutate({
      title: formData.title.trim(),
      body: formData.body.trim(),
      imageUrl: formData.imageUrl.trim(),
      userId: String(currentUser?.id || '1'),
    });
  }

  return (
    <div>
      <PageHeader
        title="Create Post"
        subtitle="Add a new post and save it in MockAPI."
      />

      <form className="form-card" onSubmit={handleSubmit}>
        {submitError && <p className="form-error">{submitError}</p>}

        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter post title"
            value={formData.title}
            onChange={handleChange}
          />

          {errors.title && (
            <span className="form-error">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>

          <textarea
            id="body"
            name="body"
            rows="8"
            placeholder="Enter post body"
            value={formData.body}
            onChange={handleChange}
          />

          {errors.body && (
            <span className="form-error">{errors.body}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>

          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />

          {errors.imageUrl && (
            <span className="form-error">{errors.imageUrl}</span>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="form-cancel-btn"
            onClick={() => navigate('/admin/posts')}
            disabled={createMutation.isPending}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? 'Creating...' : 'Create Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;