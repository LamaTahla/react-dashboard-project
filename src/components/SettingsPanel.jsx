export default function SettingsPanel({
	title,
	setTitle,
	postsPerPage,
	setPostsPerPage,
	order,
	setOrder,
	showExcerpt,
	setShowExcerpt,
	buttonText,
	setButtonText,
    category,
	setCategory,
}) {
	return (
		<div className="settings-panel">
			<div className="field">
				<label>Section Title</label>
				<input
					type="text"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
			</div>
            <div className="field">
				<label>Category</label>
				<select
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				>
					<option value="all">All Categories</option>
					<option value="news">News</option>
					<option value="blog">Blog</option>
					<option value="events">Events</option>
				</select>
			</div>

			<div className="field">
				<label>Posts Per Page</label>
				<input
					type="number"
					value={postsPerPage}
					onChange={(event) => setPostsPerPage(event.target.value)}
				/>
			</div>

			<div className="field">
				<label>Order</label>
				<select
					value={order}
					onChange={(event) => setOrder(event.target.value)}
				>
					<option value="DESC">DESC</option>
					<option value="ASC">ASC</option>
				</select>
			</div>

			<div className="field">
				<label>Button Text</label>
				<input
					type="text"
					value={buttonText}
					onChange={(event) => setButtonText(event.target.value)}
				/>
			</div>

			<div className="field checkbox-field">
				<label>
					<input
						type="checkbox"
						checked={showExcerpt}
						onChange={(event) => setShowExcerpt(event.target.checked)}
					/>
					Show Excerpt
				</label>
			</div>
		</div>
	);
}