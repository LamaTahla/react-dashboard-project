export default function ErrorState({ message = 'Something went wrong' }) {
	return (
		<div className="state-card error-state">
			<p>Error: {message}</p>
		</div>
	);
}