import { useState, useMemo } from 'react';
import { SESSIONS_DATA } from '@/data/sessions';
import UserDetailsPage from './UserDetailsPage';
import SessionSelectionPage from './SessionSelectionPage';
import SessionDetailsPage from './SessionDetailsPage';
import PaymentPage from './PaymentPage';
import SuccessPage from './SuccessPage';

type PageType = 'details' | 'selection' | 'sessionDetails' | 'payment' | 'success';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const [page, setPage] = useState<PageType>('details');
  const [user, setUser] = useState<UserDetails | null>(null);
  const [sessionId, setSessionId] = useState<number | null>(null);

  const selectedSession = useMemo(() => {
    return SESSIONS_DATA.find((s) => s.id === sessionId);
  }, [sessionId]);

  const handleDetailsSubmit = (userDetails: UserDetails) => {
    setUser(userDetails);
    setPage('selection');
  };

  const handleSessionSelect = (selectedId: number) => {
    setSessionId(selectedId);
    setPage('sessionDetails');
  };

  const handleBookAnother = () => {
    setUser(null);
    setSessionId(null);
    setPage('details');
  };

  const renderContent = () => {
    switch (page) {
      case 'selection':
        return user ? (
          <SessionSelectionPage userName={user.name} onSessionSelect={handleSessionSelect} />
        ) : null;
      case 'sessionDetails':
        return selectedSession ? (
          <SessionDetailsPage
            session={selectedSession}
            onBack={() => setPage('selection')}
            onProceed={() => setPage('payment')}
          />
        ) : null;
      case 'payment':
        return selectedSession ? (
          <PaymentPage
            session={selectedSession}
            onBack={() => setPage('sessionDetails')}
            onPaymentSuccess={() => setPage('success')}
          />
        ) : null;
      case 'success':
        return user ? <SuccessPage user={user} onBookAnother={handleBookAnother} /> : null;
      case 'details':
      default:
        return <UserDetailsPage onDetailsSubmit={handleDetailsSubmit} />;
    }
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <main className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
