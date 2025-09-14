import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Fuel, Calendar, DollarSign, Shield, ArrowLeft, Heart, Share2, MessageCircle } from 'lucide-react';
import { useGetVehicleQuery } from '../../Store/Vehicle/vehicleApi';

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: vehicle, isLoading, isError } = useGetVehicleQuery(id!);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }
  if (isError || !vehicle) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Vehicle not found</div>;
  }

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/browse" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  </button>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                  <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-4 flex space-x-2 bg-white">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {vehicle.make} {vehicle.model} ({vehicle.year})
                  </h1>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600 font-medium">{vehicle.rating ?? 4.8}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {vehicle.location}
                    </div>
                  </div>
                </div>

                {vehicle.available && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Available</span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Seats</div>
                  <div className="text-xl font-bold text-gray-900">{vehicle.seats ?? '-'}</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <Fuel className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Fuel</div>
                  <div className="text-xl font-bold text-gray-900">{vehicle.fuel ?? '-'}</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className="text-xl font-bold text-gray-900">{vehicle.type ?? '-'}</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl text-center">
                  <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Transmission</div>
                  <div className="text-xl font-bold text-gray-900">Automatic</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">About This Car</h3>
                <p className="text-gray-600 leading-relaxed text-lg">Clean and reliable vehicle.</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Air Conditioning", "Bluetooth", "USB Charging"].map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <span className="text-3xl font-bold text-gray-900">{vehicle.pricePerDay}</span>
                  <span className="text-gray-600 ml-1">/day</span>
                </div>
                {vehicle.available && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">Available</span>
                )}
              </div>

              {/* Remove the book button if the vehicle is not availble */}
              {vehicle.available && (
                <Link
                  to={`/book/${vehicle.id}`}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-center block text-lg mb-4"
                >
                Book This Car Now
              </Link>
              )}  
              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Message Owner
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Protected by RideShare LR
                </div>
                <div className="text-sm text-gray-500">
                  All bookings are covered by our protection plan and 24/7 support.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;

