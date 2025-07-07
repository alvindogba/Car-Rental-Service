import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Users, Fuel, Calendar, DollarSign, Shield, ArrowLeft, Heart, Share2, MessageCircle } from 'lucide-react';

// Mock data - in a real app, this would come from an API
const mockVehicle = {
  id: '1',
  make: 'Toyota',
  model: 'Camry',
  year: 2020,
  pricePerDay: 45,
  rating: 4.8,
  reviewCount: 24,
  images: [
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800'
  ],
  type: 'Sedan',
  seats: 5,
  fuel: 'Gasoline',
  transmission: 'Automatic',
  location: 'Monrovia, Liberia',
  description: 'Clean and reliable Toyota Camry perfect for city driving and short trips around Monrovia and beyond. The car is well-maintained and comes with air conditioning, comfortable seating, and good fuel efficiency. Perfect for business trips, family outings, or exploring beautiful Liberia.',
  features: [
    'Air Conditioning',
    'Bluetooth',
    'USB Charging',
    'Backup Camera',
    'Automatic Transmission',
    'Power Windows',
    'GPS Navigation',
    'Premium Sound System'
  ],
  owner: {
    name: 'James Kollie',
    rating: 4.9,
    joinDate: '2023',
    responseTime: '2 hours',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    totalCars: 3,
    totalTrips: 156
  },
  available: true,
  instantBook: true
};

const mockReviews = [
  {
    id: '1',
    userName: 'Mary Johnson',
    userAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    date: '2024-01-10',
    comment: 'Excellent car! James was very professional and the car was exactly as described. Clean, comfortable, and perfect for my trip to Gbarnga.'
  },
  {
    id: '2',
    userName: 'David Wilson',
    userAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    date: '2024-01-05',
    comment: 'Great experience! The car was in perfect condition and James was very responsive. Highly recommend for anyone needing a reliable ride in Monrovia.'
  }
];

const VehicleDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/browse"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Images Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={mockVehicle.images[currentImageIndex]}
                  alt={`${mockVehicle.make} ${mockVehicle.model}`}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Navigation */}
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? mockVehicle.images.length - 1 : prev - 1
                    )}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === mockVehicle.images.length - 1 ? 0 : prev + 1
                    )}
                    className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                  </button>
                </div>

                {/* Action Buttons */}
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

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {mockVehicle.images.length}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex space-x-2 overflow-x-auto">
                  {mockVehicle.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {mockVehicle.make} {mockVehicle.model} ({mockVehicle.year})
                  </h1>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600 font-medium">
                        {mockVehicle.rating} ({mockVehicle.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mockVehicle.location}
                    </div>
                  </div>
                </div>

                {mockVehicle.instantBook && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Instant Book
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Seats</div>
                  <div className="text-xl font-bold text-gray-900">{mockVehicle.seats}</div>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <Fuel className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Fuel</div>
                  <div className="text-xl font-bold text-gray-900">{mockVehicle.fuel}</div>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Type</div>
                  <div className="text-xl font-bold text-gray-900">{mockVehicle.type}</div>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl text-center">
                  <Shield className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-sm text-gray-600 mb-1">Transmission</div>
                  <div className="text-xl font-bold text-gray-900">{mockVehicle.transmission}</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">About This Car</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{mockVehicle.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mockVehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <h3 className="text-xl font-bold mb-6">Recent Reviews</h3>
                <div className="space-y-6">
                  {mockReviews.map(review => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-12 h-12 object-cover rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <span className="text-3xl font-bold text-gray-900">{mockVehicle.pricePerDay}</span>
                  <span className="text-gray-600 ml-1">/day</span>
                </div>
                {mockVehicle.available && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Available
                  </span>
                )}
              </div>

              <Link
                to={`/book/${mockVehicle.id}`}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-center block text-lg mb-4"
              >
                Book This Car Now
              </Link>

              <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors font-semibold flex items-center justify-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Message Owner
              </button>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold mb-4">Meet Your Host</h3>
                <div className="flex items-center mb-4">
                  <img
                    src={mockVehicle.owner.avatar}
                    alt={mockVehicle.owner.name}
                    className="w-16 h-16 object-cover rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{mockVehicle.owner.name}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {mockVehicle.owner.rating} rating
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center bg-gray-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{mockVehicle.owner.totalCars}</div>
                    <div className="text-sm text-gray-600">Cars Listed</div>
                  </div>
                  <div className="text-center bg-gray-50 p-3 rounded-lg">
                    <div className="text-xl font-bold text-gray-900">{mockVehicle.owner.totalTrips}</div>
                    <div className="text-sm text-gray-600">Trips Completed</div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Joined in {mockVehicle.owner.joinDate}</div>
                  <div>Response time: {mockVehicle.owner.responseTime}</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Protected by RideShare LR
                </div>
                <div className="text-sm text-gray-500">
                  All bookings are covered by our comprehensive protection plan and 24/7 support.
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