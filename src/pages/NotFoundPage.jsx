import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle, FaHome } from "react-icons/fa";

export default function NotFoundPage() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-icon">
          <FaExclamationTriangle />
        </div>

        <span className="not-found-code">404</span>

        <h1>Page Not Found</h1>

        <p>
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="not-found-actions">
          <Link to={isAdminRoute ? "/admin" : "/"} className="primary-btn">
            <FaHome />
            <span>{isAdminRoute ? "Back to Dashboard" : "Back to Home"}</span>
          </Link>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => window.history.back()}
          >
            <FaArrowLeft />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}