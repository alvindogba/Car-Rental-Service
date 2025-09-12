import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Calendar, DollarSign, ArrowLeft, CreditCard, Smartphone, CheckCircle } from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';

interface BookingFormData {
  startDate: string;
  endDate: string;
  paymentMethod: 'card' | 'orange' | 'lonestar';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  phoneNumber?: string;
}

// Mock vehicle data
const mockVehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2020,
  pricePerDay: 45,
  image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
  location: 'Monrovia, Liberia'
};

const BookingFlow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [step, setStep] = useState<'dates' | 'payment' | 'confirmation'>('dates');
  const [bookingData, setBookingData] = useState<Partial<BookingFormData>>({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<BookingFormData>();

  const watchedStartDate = watch('startDate');
  const watchedEndDate = watch('endDate');
  const watchedPaymentMethod = watch('paymentMethod');

  const calculateTotalDays = () => {
    if (watchedStartDate && watchedEndDate) {
      const start = new Date(watchedStartDate);
      const end = new Date(watchedEndDate);
      return differenceInDays(end, start) + 1;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days * mockVehicle.pricePerDay;
  };

  const onSubmitDates = (data: BookingFormData) => {
    setBookingData({ ...bookingData, ...data });
    setStep('payment');
  };

  const onSubmitPayment = async (data: BookingFormData) => {
    setLoading(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBookingData({ ...bookingData, ...data });
      setStep('confirmation');
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const minDate = format(new Date(), 'yyyy-MM-dd');
  const maxDate = format(addDays(new Date(), 90), 'yyyy-MM-dd');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to={`/vehicle/${id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Vehicle
        </Link>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step === 'dates' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 'dates' || step === 'payment' || step === 'confirmation'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Select Dates</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 'payment' || step === 'confirmation'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center ${step === 'confirmation' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step === 'confirmation'
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300'
                }`}>
                  3
                </div>
                <span className="ml-2 font-medium">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'dates' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  When you wan' use the car?
                </h2>
                <form onSubmit={handleSubmit(onSubmitDates)}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        {...register('startDate', { required: 'Start date is required' })}
                        type="date"
                        min={minDate}
                        max={maxDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.startDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        {...register('endDate', { 
                          required: 'End date is required',
                          validate: (value) => {
                            if (watchedStartDate && value && new Date(value) <= new Date(watchedStartDate)) {
                              return 'End date must be after start date';
                            }
                            return true;
                          }
                        })}
                        type="date"
                        min={watchedStartDate || minDate}
                        max={maxDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.endDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  How you wan' pay?
                </h2>
                <form onSubmit={handleSubmit(onSubmitPayment)}>
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Choose Payment Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="cursor-pointer">
                        <input
                          {...register('paymentMethod', { required: 'Payment method is required' })}
                          type="radio"
                          value="card"
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg transition-colors ${
                          watchedPaymentMethod === 'card'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <div className="text-center">
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-sm text-gray-500">Visa, Mastercard</div>
                          </div>
                        </div>
                      </label>
                      
                      <label className="cursor-pointer">
                        <input
                          {...register('paymentMethod', { required: 'Payment method is required' })}
                          type="radio"
                          value="orange"
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg transition-colors ${
                          watchedPaymentMethod === 'orange'
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                          <div className="text-center">
                            <div className="font-medium">Orange Money</div>
                            <div className="text-sm text-gray-500">Mobile payment</div>
                          </div>
                        </div>
                      </label>
                      
                      <label className="cursor-pointer">
                        <input
                          {...register('paymentMethod', { required: 'Payment method is required' })}
                          type="radio"
                          value="lonestar"
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg transition-colors ${
                          watchedPaymentMethod === 'lonestar'
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}>
                          <Smartphone className="h-8 w-8 mx-auto mb-2 text-red-600" />
                          <div className="text-center">
                            <div className="font-medium">Lonestar Mobile Money</div>
                            <div className="text-sm text-gray-500">Mobile payment</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Payment Details */}
                  {watchedPaymentMethod === 'card' && (
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          {...register('cardNumber', { required: 'Card number is required' })}
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          {...register('expiryDate', { required: 'Expiry date is required' })}
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          {...register('cvv', { required: 'CVV is required' })}
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {(watchedPaymentMethod === 'orange' || watchedPaymentMethod === 'lonestar') && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        {...register('phoneNumber', { required: 'Phone number is required' })}
                        type="tel"
                        placeholder="+231 77 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
                  >
                    {loading ? 'Processing Payment...' : `Pay $${calculateTotalPrice()}`}
                  </button>
                </form>
              </div>
            )}

            {step === 'confirmation' && (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your booking has been confirmed. You will receive a confirmation email shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/renter-dashboard"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View My Bookings
                  </Link>
                  <Link
                    to="/browse"
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Browse More Cars
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Booking Summary
              </h3>
              
              <div className="flex items-center mb-4">
                <img
                  src={mockVehicle.image}
                  alt={`${mockVehicle.make} ${mockVehicle.model}`}
                  className="w-16 h-16 object-cover rounded-lg mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {mockVehicle.make} {mockVehicle.model}
                  </h4>
                  <p className="text-sm text-gray-600">{mockVehicle.year}</p>
                  <p className="text-sm text-gray-600">{mockVehicle.location}</p>
                </div>
              </div>

              {(watchedStartDate && watchedEndDate) && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Dates</span>
                    <span className="text-sm text-gray-900">
                      {format(new Date(watchedStartDate), 'MMM d')} - {format(new Date(watchedEndDate), 'MMM d')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Days</span>
                    <span className="text-sm text-gray-900">{calculateTotalDays()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Price per day</span>
                    <span className="text-sm text-gray-900">${mockVehicle.pricePerDay}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">${calculateTotalPrice()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;