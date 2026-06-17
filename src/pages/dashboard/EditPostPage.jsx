import { useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

import { getPostById, updatePost } from '../../api/postsService';
import { queryKeys } from '../../api/queryKeys';

const initialState = {
  formData: {
    title: '',
    body: '',
    imageUrl: '',
  },
  errors: {},
  submitError: '',
};

function editPostReducer(state, action) {
  switch (action.type) {
    case 'LOAD_SUCCESS':
      return {
        ...state,
        formData: {
          title: action.payload.title || '',
          body: action.payload.body || '',
          imageUrl: action.payload.imageUrl || '',
        },
      };

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

    case 'SUBMIT_ERROR':
      return {
        ...state,
        submitError: action.payload,
      };

    default:
      return state;
  }
}

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [state, dispatch] = useReducer(editPostReducer, initialState);

  const { formData, errors, submitError } = state;

  const {
    data: post,
    isLoading: postLoading,
    isError: postIsError,
    error: postError,
  } = useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => getPostById(id),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (post) {
      dispatch({
        type: 'LOAD_SUCCESS',
        payload: post,
      });
    }
  }, [post]);

  const updateMutation = useMutation({
    mutationFn: updatePost,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });

      await queryClient.invalidateQueries({
        queryKey: queryKeys.post(id),
      });

      toast.success('Post updated successfully');
      navigate('/admin/posts');
    },

    onError: (error) => {
      dispatch({
        type: 'SUBMIT_ERROR',
        payload: error.message || 'Failed to update post',
      });

      toast.error(error.message || 'Failed to update post');
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

  function handleChange(e) {
    const { name, value } = e.target;

    dispatch({
      type: 'FIELD_CHANGE',
      field: name,
      value,
    });
  }

  function validateForm() {
    const validationErrors = {};

    if (!formData.title.trim()) {
      validationErrors.title = 'Title is required';
    }

    if (!formData.body.trim()) {
      validationErrors.body = 'Body is required';
    } else if (formData.body.trim().length < 20) {
      validationErrors.body = 'Body must be at least 20 characters';
    }

    if (formData.imageUrl.trim() && !isValidUrl(formData.imageUrl.trim())) {
      validationErrors.imageUrl = 'Please enter a valid image URL';
    }

    return validationErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      dispatch({
        type: 'SET_ERRORS',
        payload: validationErrors,
      });

      toast.error('Please fix the form errors');
      return;
    }

    updateMutation.mutate({
      id,
      postData: {
        title: formData.title.trim(),
        body: formData.body.trim(),
        imageUrl: formData.imageUrl.trim(),
      },
    });
  }

  if (postLoading) {
    return <LoadingState message="Loading post data..." />;
  }

  if (postIsError) {
    return (
      <ErrorState
        message={postError?.message || 'Failed to load post data.'}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title="Edit Post"
        subtitle="Update post information"
      />

      <form className="form-card" onSubmit={handleSubmit}>
        {submitError && <p className="form-error">{submitError}</p>}

        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />

          {errors.title && <p className="form-error">{errors.title}</p>}
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
            <p className="form-error">{errors.imageUrl}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="body">Body</label>

          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Enter post body"
            rows="8"
          />

          {errors.body && <p className="form-error">{errors.body}</p>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="form-cancel-btn"
            onClick={() => navigate('/admin/posts')}
            disabled={updateMutation.isPending}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? 'Updating...' : 'Update Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPostPage;