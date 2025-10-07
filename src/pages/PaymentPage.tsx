import { useState } from 'react';
import { Session } from '@/data/sessions';
import { ArrowLeft } from 'lucide-react';
import LoadingButton from '@/components/LoadingButton';

interface PaymentPageProps {
  session: Session;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const PaymentPage = ({ session, onBack, onPaymentSuccess }: PaymentPageProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="page-enter p-6 sm:p-8 md:p-12">
      <button
        onClick={onBack}
        className="mb-8 flex items-center text-muted-foreground hover:text-foreground transition-colors font-semibold"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Details
      </button>
      <h2 className="text-3xl font-bold text-foreground text-center mb-4">Secure Payment</h2>

      <div className="flex justify-center border-b mb-6">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`px-6 py-2 text-lg font-medium transition-colors ${
            paymentMethod === 'card'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
        >
          Card
        </button>
        <button
          onClick={() => setPaymentMethod('upi')}
          className={`px-6 py-2 text-lg font-medium transition-colors ${
            paymentMethod === 'upi'
              ? 'text-primary border-b-2 border-primary'
              : 'text-muted-foreground'
          }`}
        >
          UPI
        </button>
      </div>

      {paymentMethod === 'card' && (
        <div id="card-payment-section">
          <div className="max-w-md mx-auto bg-secondary/50 p-8 rounded-lg shadow-inner">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground">Amount to pay:</span>
              <span className="text-2xl font-bold text-foreground">${session.price}</span>
            </div>
            <form onSubmit={handlePayment}>
              <div className="space-y-4">
                <input
                  type="text"
                  className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  placeholder="Name on Card"
                />
                <input
                  type="text"
                  className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  placeholder="Card Number"
                />
                <div className="flex space-x-4">
                  <input
                    type="text"
                    className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                    placeholder="Expiry (MM/YY)"
                  />
                  <input
                    type="text"
                    className="input-focus-lift w-full px-4 py-3 bg-white border border-input rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                    placeholder="CVC"
                  />
                </div>
              </div>
              <LoadingButton
                type="submit"
                isProcessing={isProcessing}
                className="mt-8 w-full btn-success text-white font-bold py-3 px-4 rounded-lg"
              >
                Pay Now
              </LoadingButton>
            </form>
          </div>
        </div>
      )}

      {paymentMethod === 'upi' && (
        <div id="upi-payment-section">
          <div className="max-w-md mx-auto bg-secondary/50 p-8 rounded-lg shadow-inner text-center">
            <div className="flex justify-between items-center mb-6">
              <span className="text-muted-foreground">Amount to pay:</span>
              <span className="text-2xl font-bold text-foreground">${session.price}</span>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Pay with any UPI App</h3>
            <p className="text-muted-foreground mb-6">Scan the QR code below.</p>
            <div className="flex justify-center mb-4 p-2 border-2 border-primary/30 rounded-lg shadow-lg">
              <svg
                className="w-48 h-48 bg-white p-2 rounded-lg"
                viewBox="0 0 37 37"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0h7v7H0zm8 0h7v7H8zm8 0h7v7h-7zm8 0h7v7h-7zM0 8h7v7H0zm8 8h7v7H8zm8 8h7v7h-7zM8 24h7v7H8zm-8 8h7v7H0zM0 24h7v7H0zm8-8h7v7H8zm16-8h7v7h-7zm8 0h7v7h-7zm-8 8h7v7h-7zm-16 8h7v7H8zm8 0h7v7h-7zm8-8h7v7h-7zm0 8h7v7h-7zm8-8h7v7h-7zm0 8h7v7h-7zm-24-8h7v7H0z"
                  fillRule="evenodd"
                  fill="#000"
                />
              </svg>
            </div>
            <p className="font-mono text-foreground bg-secondary py-2 px-4 rounded inline-block">
              lovableai@okhdfcbank
            </p>
            <LoadingButton
              isProcessing={isProcessing}
              onClick={handlePayment}
              className="mt-8 btn-primary w-full text-white font-bold py-3 px-4 rounded-lg"
            >
              Confirm Payment
            </LoadingButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
