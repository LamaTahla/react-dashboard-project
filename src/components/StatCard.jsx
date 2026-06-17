export default function StatCard({ title, value, type = 'number' }) {
	return (
		<div className="card">
			<h3>{title}</h3>

			<p className={type === 'text' ? 'stat-text' : 'stat-number'}>
				{value}
			</p>
		</div>
	);
}