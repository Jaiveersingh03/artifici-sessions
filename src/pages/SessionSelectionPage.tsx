import SessionCard from '@/components/SessionCard';

interface Session {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  instructor: string;
  date: string;
  time: string;
  price: number;
}

interface SessionSelectionPageProps {
  userName: string;
  onSessionSelect: (sessionId: number) => void;
  sessions: Session[];
}

const SessionSelectionPage = ({ userName, onSessionSelect, sessions }: SessionSelectionPageProps) => {
  return (
    <div className="page-enter p-6 sm:p-8 md:p-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
          Welcome, {userName}!
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Choose a session to begin your journey.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((session, index) => (
          <SessionCard
            key={session.id}
            title={session.title}
            description={session.shortDescription}
            onClick={() => onSessionSelect(session.id)}
            delay={index * 100}
          />
        ))}
      </div>
      {sessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default SessionSelectionPage;
