import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="container mx-auto max-w-container px-4 py-20 text-center">
      <h1 className="text-6xl font-secondary font-black mb-4">404</h1>
      <h2 className="text-3xl font-secondary font-bold mb-4">
        Page <span className="text-primary">Not Found</span>
      </h2>
      <p className="text-light-gray mb-8 max-w-md mx-auto">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
