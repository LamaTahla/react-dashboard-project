export default function EmptyState({ message = 'No data found' }) {
	return (
		<div className="state-card">
			<p>{message}</p>
		</div>
	);
}