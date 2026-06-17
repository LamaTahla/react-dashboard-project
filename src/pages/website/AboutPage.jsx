function AboutPage() {
  return (
    <div className="website-page about-page">
      <span className="page-badge">About Project</span>

      <h1>About This React Project after upload to live</h1>

      <p>
        This project is a complete React application that combines a public
        website with an admin dashboard. The public website is designed for
        visitors, while the dashboard is used to manage and explore posts and
        users from an external API.
      </p>

      <div className="about-grid">
        <div className="about-card">
          <h2>Website</h2>
          <p>
            The public website includes a home page, about page, blog page,
            blog details page, and contact page.
          </p>
        </div>

        <div className="about-card">
          <h2>Admin Dashboard</h2>
          <p>
            The dashboard includes posts, users, details pages, statistics,
            settings, and data tables.
          </p>
        </div>

        <div className="about-card">
          <h2>API Integration</h2>
          <p>
            Data is fetched from JSONPlaceholder using separate services and
            custom React hooks.
          </p>
        </div>

        <div className="about-card">
          <h2>Routing</h2>
          <p>
            React Router is used to separate public routes from admin routes
            with different layouts.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;