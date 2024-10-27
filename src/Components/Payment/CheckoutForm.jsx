'use client';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const CheckoutForm = ({
  totalToPay,
  paymentMonth,
  paymentTime,
  BusId,
  selectedSeats,
  departureDate,
  Bus,
}) => {
  console.log(BusId, selectedSeats);

  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const today = new Date();
  const currentDate = `${today.getDate().toString().padStart(2, '0')}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;

  // Fetch client secret from backend
  useEffect(() => {
    if (totalToPay > 0) {
      fetch('https://way-go-backend.vercel.app/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price: totalToPay }),
      })
        .then(response => response.json())
        .then(data => {
          setClientSecret(data.clientSecret);
        })
        .catch(error => {
          console.error('Error fetching client secret:', error);
          Swal.fire({
            icon: 'error',
            title: 'Payment Initialization Failed',
            text: 'Unable to proceed with payment. Please try again later.',
          });
        });
    }
  }, [totalToPay]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Payment information not available.');
      return;
    }

    // Create payment method and confirm payment
    const { error: paymentError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

    if (paymentError) {
      setError(paymentError.message);
      return;
    }

    setError(''); // Reset error if payment method creation succeeded

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalToPay,
        transactionId: paymentIntent.id,
        paymentMonth: paymentMonth,
        paymentTime: paymentTime,
        SubmitDate: currentDate,
        departureDate: departureDate,
        BusId: BusId,
        selectedSeats: selectedSeats,
        Bus: Bus,
      };

      // Save payment info to backend
      fetch('https://way-go-backend.vercel.app/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payment),
      })
        .then(response => response.json())
        .then(data => {
          if (data?.result?.insertedId) {
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Payment Successful',
              text: 'Thank you for your payment!',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch(error => {
          console.error('Error saving payment:', error);
          Swal.fire({
            icon: 'error',
            title: 'Payment Processing Failed',
            text: 'We encountered an issue saving your payment details. Please contact support.',
          });
        });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="rounded-2xl">
      <CardElement
        className="w-[450px]"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button
        className="px-5 py-2 flex text-xl items-center justify-center mx-auto bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold rounded-md shadow-md transition-transform duration-200 hover:from-green-400 hover:to-green-600 transform hover:scale-105 active:scale-95 my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
