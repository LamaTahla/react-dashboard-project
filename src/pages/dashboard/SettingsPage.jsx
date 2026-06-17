import { useState, useEffect } from 'react';
import PreviewBox from '../../components/PreviewBox';
import SettingsPanel from '../../components/SettingsPanel';
import { posts } from '../../data/posts';

export default function SettingsPage() {
	const [title, setTitle] = useState('Latest Posts');
	const [postsPerPage, setPostsPerPage] = useState(3);
	const [order, setOrder] = useState('DESC');
	const [showExcerpt, setShowExcerpt] = useState(true);
	const [buttonText, setButtonText] = useState('Read More');
	const [category, setCategory] = useState('all');

	const [message, setMessage] = useState('');

	useEffect(() => {
		setMessage(`Selected Category: ${category}`);
	}, [category]);

	return (
		<div>
			<h1>Frontend Settings</h1>
			<p>{message}</p>

			<SettingsPanel
				title={title}
				setTitle={setTitle}
				postsPerPage={postsPerPage}
				setPostsPerPage={setPostsPerPage}
				order={order}
				setOrder={setOrder}
				showExcerpt={showExcerpt}
				setShowExcerpt={setShowExcerpt}
				buttonText={buttonText}
				setButtonText={setButtonText}
				category={category}
				setCategory={setCategory}
			/>

			<hr />

			<PreviewBox
				title={title}
				posts={posts}
				postsPerPage={postsPerPage}
				order={order}
				showExcerpt={showExcerpt}
				buttonText={buttonText}
				category={category}
			/>
		</div>
	);
}