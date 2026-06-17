import PostCard from './PostCard';

export default function PreviewBox({
	title,
    posts,
	postsPerPage,
	order,
	showExcerpt,
	buttonText,
	category,
}) {
	const filteredPosts = posts.filter((post) => {
		if (category === 'all') {
			return true;
		}

		return post.category === category;
	});

	const orderedPosts = [...filteredPosts].sort((a, b) => {
		if (order === 'ASC') {
			return a.id - b.id;
		}

		return b.id - a.id;
	});

	const visiblePosts = orderedPosts.slice(0, Number(postsPerPage));
    console.log(visiblePosts);
	return (
		<div className="preview">
			<h2>{title}</h2>

			<p className="preview-meta">
				Category: {category} / Order: {order} / Posts: {postsPerPage}
			</p>

			<div className="posts-list">
				{visiblePosts.map((post) => (
					<PostCard
						key={post.id}
						post={post}
						showExcerpt={showExcerpt}
						buttonText={buttonText}
					/>
				))}

				{visiblePosts.length === 0 && (
					<p>No posts found.</p>
				)}
			</div>
		</div>
	);
}
