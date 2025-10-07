import { Session } from '@/data/sessions';
import { ArrowLeft } from 'lucide-react';

interface SessionDetailsPageProps {
  session: Session;
  onBack: () => void;
  onProceed: () => void;
}

const SessionDetailsPage = ({ session, onBack, onProceed }: SessionDetailsPageProps) => {
  return (
    <div className="page-enter p-6 sm:p-8 md:p-12">
      <button
        onClick={onBack}
        className="mb-8 flex items-center text-muted-foreground hover:text-foreground transition-colors font-semibold"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Sessions
      </button>
      <div>
        <h2 className="text-4xl font-bold text-foreground mb-4">{session.title}</h2>
        <div className="flex items-center text-muted-foreground mb-6">
          <span>By {session.instructor}</span>
          <span className="mx-2">|</span>
          <span>{session.date} at {session.time}</span>
        </div>
        <p className="text-lg text-foreground leading-relaxed mb-6">
          {session.fullDescription}
        </p>
        <div className="text-right">
          <span className="text-3xl font-bold text-gradient">${session.price}</span>
        </div>
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={onProceed}
          className="btn-primary w-full sm:w-auto text-white font-bold py-3 px-12 rounded-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default SessionDetailsPage;
