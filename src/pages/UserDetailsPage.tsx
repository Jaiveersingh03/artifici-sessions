import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface UserDetailsPageProps {
  onDetailsSubmit: (userDetails: { name: string; email: string; phone: string }) => void;
}

const UserDetailsPage = ({ onDetailsSubmit }: UserDetailsPageProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onDetailsSubmit({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    });
  };

  return (
    <div className="page-enter p-6 sm:p-8 md:p-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
          Welcome to Lovable AI
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Please enter your details to continue.
        </p>
        <div className="mt-4 flex gap-4 justify-center">
          <Link to="/auth">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/teacher-dashboard">
            <Button variant="outline">Teacher Dashboard</Button>
          </Link>
        </div>
      </header>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-foreground mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="user-name"
              name="name"
              className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="user-email" className="block text-sm font-medium text-foreground mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="user-email"
              name="email"
              className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="user-phone" className="block text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="user-phone"
              name="phone"
              className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
              placeholder="+91 12345 67890"
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full text-white font-bold py-3 px-4 rounded-lg"
          >
            Proceed to Sessions
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsPage;
