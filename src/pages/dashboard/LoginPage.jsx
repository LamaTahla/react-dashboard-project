import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const initialState = {
    formData: {
        email: '',
        password: '',
    },
    errors: {},
    error: '',
    isSubmitting: false,
};

function loginReducer(state, action) {
    switch (action.type) {
        case 'FIELD_CHANGE':
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [action.field]: action.value,
                },
                error: '',
                errors: {
                    ...state.errors,
                    [action.field]: '',
                },
            };

        case 'SET_ERRORS':
            return {
                ...state,
                errors: action.payload,
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };

        case 'START_SUBMIT':
            return {
                ...state,
                isSubmitting: true,
            };

        case 'STOP_SUBMIT':
            return {
                ...state,
                isSubmitting: false,
            };

        default:
            return state;
    }
}

function LoginPage() {
    const navigate = useNavigate();
    const { login, currentUser } = useAuth();

    const [state, dispatch] = useReducer(loginReducer, initialState);

    const { formData, errors, error, isSubmitting } = state;

    useEffect(() => {
        if (!currentUser) {
            return;
        }

        if (currentUser.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/admin/posts');
        }
    }, [currentUser, navigate]);

    function validateForm() {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        dispatch({
            type: 'FIELD_CHANGE',
            field: name,
            value,
        });
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

    dispatch({ type: 'START_SUBMIT' });

    const result = login(formData.email, formData.password);

    if (!result.success) {
        dispatch({
            type: 'SET_ERROR',
            payload: result.message,
        });

        toast.error(result.message);
        dispatch({ type: 'STOP_SUBMIT' });
        return;
    }

    toast.success('Logged in successfully');

    dispatch({ type: 'STOP_SUBMIT' });

    if (result.user.role === 'admin') {
        navigate('/admin');
    } else {
        navigate('/admin/posts');
    }
}

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleSubmit}>
                <span className="eyebrow">Admin Dashboard</span>

                <h1>Login</h1>

                <p className="login-description">
                    Login with admin credentials to access the dashboard.
                </p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    {errors.email && (
                        <p className="error-message">{errors.email}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="123456"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {errors.password && (
                        <p className="error-message">{errors.password}</p>
                    )}
                </div>

                {error && <p className="error-message">{error}</p>}

                <button
                    type="submit"
                    className="primary-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </button>

                <div className="login-hint">
                    <strong>Demo Accounts:</strong>
                    <span>Admin: admin@example.com / 123456</span>
                    <span>Editor: editor@example.com / 123456</span>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;