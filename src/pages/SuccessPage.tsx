import { CheckCircle } from 'lucide-react';

interface SuccessPageProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
  onBookAnother: () => void;
}

const SuccessPage = ({ user, onBookAnother }: SuccessPageProps) => {
  return (
    <div className="page-enter p-12 text-center">
      <div className="flex justify-center items-center mb-4">
        <CheckCircle className="success-pulse w-16 h-16 text-success" />
      </div>
      <h2 className="text-3xl font-bold text-foreground mb-4">Payment Successful!</h2>
      <p className="text-muted-foreground mb-8">
        Thank you for your booking, {user.name}. A confirmation email has been sent to{' '}
        {user.email} and a text message to {user.phone}.
      </p>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="https://wa.me/911234567890?text=Hello!%20I've%20just%20booked%20a%20session."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp w-full sm:w-auto text-white font-bold py-3 px-8 rounded-lg inline-flex items-center justify-center transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.794.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          Contact on WhatsApp
        </a>
        <button
          onClick={onBookAnother}
          className="w-full sm:w-auto btn-primary text-white font-bold py-3 px-8 rounded-lg"
        >
          Book Another Session
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
