import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Star, Search,  } from 'lucide-react';

interface Booking {
  id: string;
  vehicleId: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleImage: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  location: string;
  rating?: number;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    vehicleId: '1',
    vehicleMake: 'Toyota',
    vehicleModel: 'Camry',
    vehicleImage: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    totalPrice: 135,
    status: 'upcoming',
    location: 'Monrovia'
  },
  {
    id: '2',
    vehicleId: '2',
    vehicleMake: 'Nissan',
    vehicleModel: 'Pathfinder',
    vehicleImage: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=400',
    startDate: '2024-01-01',
    endDate: '2024-01-05',
    totalPrice: 240,
    status: 'completed',
    location: 'Paynesville',
    rating: 5
  },
  {
    id: '3',
    vehicleId: '3',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic',
    vehicleImage: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
    startDate: '2023-12-20',
    endDate: '2023-12-23',
    totalPrice: 105,
    status: 'completed',
    location: 'Sinkor',
    rating: 4
  }
];

const RenterDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = mockBookings.filter(booking => {
    const matchesTab = activeTab === 'upcoming' 
      ? booking.status === 'upcoming' || booking.status === 'active'
      : booking.status === 'completed';
    
    const matchesSearch = booking.vehicleMake.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back! Ready for your next ride?
          </h1>
          <p className="text-gray-600">
            Manage your bookings and find new cars to rent
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/browse"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Browse Cars</h3>
                <p className="text-sm text-gray-600">Find your next ride</p>
              </div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                <p className="text-2xl font-bold text-green-600">$480</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Trips Taken</h3>
                <p className="text-2xl font-bold text-purple-600">{mockBookings.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
                My Bookings
              </h2>
              
              {/* Search */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 mt-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Upcoming ({mockBookings.filter(b => b.status === 'upcoming' || b.status === 'active').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`pb-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed ({mockBookings.filter(b => b.status === 'completed').length})
              </button>
            </div>
          </div>

          {/* Bookings List */}
          <div className="p-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} bookings
                </h3>
                <p className="text-gray-600 mb-4">
                  {activeTab === 'upcoming' 
                    ? "You don't have any upcoming trips. Ready to book your next ride?"
                    : "You haven't completed any trips yet."
                  }
                </p>
                {activeTab === 'upcoming' && (
                  <Link
                    to="/browse"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Browse Cars
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map(booking => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={booking.vehicleImage}
                        alt={`${booking.vehicleMake} ${booking.vehicleModel}`}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.vehicleMake} {booking.vehicleModel}
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.startDate} - {booking.endDate}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-1" />
                            ${booking.totalPrice}
                          </div>
                        </div>
                        
                        {booking.rating && (
                          <div className="flex items-center mb-2">
                            <span className="text-sm text-gray-600 mr-2">Your rating:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < booking.rating!
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Link
                            to={`/vehicle/${booking.vehicleId}`}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details
                          </Link>
                          {booking.status === 'upcoming' && (
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                              Cancel Booking
                            </button>
                          )}
                          {booking.status === 'completed' && !booking.rating && (
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                              Rate Trip
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenterDashboard;