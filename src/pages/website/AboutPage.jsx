import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = "https://6a215200b1d0aaf32b4f377b.mockapi.io/api/v1";

const getAboutPage = async () => {
  const response = await fetch(`${API_BASE_URL}/posts?slug=about`);

  if (!response.ok) {
    throw new Error("Failed to fetch about page");
  }

  const data = await response.json();

  return data[0];
};

function AboutPage() {
  const {
    data: about,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["about-page"],
    queryFn: getAboutPage,
  });

  if (isLoading) {
    return (
      <div className="website-page about-page">
        <p>Loading about page...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="website-page about-page">
        <p>{error.message}</p>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="website-page about-page">
        <p>About page content was not found.</p>
      </div>
    );
  }

  const cards = [
    {
      title: about.card1Title,
      description: about.card1Description,
    },
    {
      title: about.card2Title,
      description: about.card2Description,
    },
    {
      title: about.card3Title,
      description: about.card3Description,
    },
    {
      title: about.card4Title,
      description: about.card4Description,
    },
  ];

  return (
    <div className="website-page about-page">
      <span className="page-badge">{about.badge}</span>

      <h1>{about.title}</h1>

      <p>{about.body}</p>

      <div className="about-grid">
        {cards.map((card, index) => (
          <div className="about-card" key={index}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutPage;