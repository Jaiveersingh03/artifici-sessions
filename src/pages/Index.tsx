import { useState, useMemo, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
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
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Transform database courses to match the expected Session format
      const transformedSessions = data.map((course, index) => ({
        id: index + 1, // Use index for now since we're using number IDs in the flow
        title: course.title,
        shortDescription: course.short_description,
        fullDescription: course.full_description,
        instructor: course.instructor,
        date: course.date,
        time: course.time,
        price: parseFloat(course.price.toString()),
        dbId: course.id // Keep the original UUID for reference
      }));
      setSessions(transformedSessions);
    }
    setIsLoading(false);
  };

  const selectedSession = useMemo(() => {
    return sessions.find((s) => s.id === sessionId);
  }, [sessionId, sessions]);

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
    if (isLoading) {
      return (
        <div className="p-12 text-center">
          <div className="spinner mx-auto" />
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      );
    }

    switch (page) {
      case 'selection':
        return user ? (
          <SessionSelectionPage userName={user.name} onSessionSelect={handleSessionSelect} sessions={sessions} />
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
