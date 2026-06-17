import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function NotFoundPage() {
	return (
		<div>
			<PageHeader
				title="Page Not Found"
				description="The page you are looking for does not exist."
			/>

			<div className="card">
				<p>
					Sorry, we could not find the page you requested.
				</p>

				<Link to="/">
					<button style={{ marginTop: '20px' }}>
						Back to Dashboard
					</button>
				</Link>
			</div>
		</div>
	);
}