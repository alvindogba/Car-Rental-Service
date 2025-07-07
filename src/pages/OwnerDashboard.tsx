import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Car, DollarSign, Calendar, Edit, Trash2, Eye } from 'lucide-react';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  image: string;
  status: 'available' | 'rented' | 'maintenance';
  totalEarnings: number;
  totalBookings: number;
  rating: number;
}

interface Booking {
  id: string;
  vehicleId: string;
  renterName: string;
  renterEmail: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed';
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    pricePerDay: 45,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'available',
    totalEarnings: 1350,
    totalBookings: 15,
    rating: 4.8
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    pricePerDay: 35,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'rented',
    totalEarnings: 980,
    totalBookings: 12,
    rating: 4.6
  }
];

const mockBookings: Booking[] = [
  {
    id: '1',
    vehicleId: '1',
    renterName: 'John Doe',
    renterEmail: 'john@example.com',
    startDate: '2024-01-15',
    endDate: '2024-01-18',
    totalPrice: 135,
    status: 'pending'
  },
  {
    id: '2',
    vehicleId: '2',
    renterName: 'Jane Smith',
    renterEmail: 'jane@example.com',
    startDate: '2024-01-10',
    endDate: '2024-01-12',
    totalPrice: 70,
    status: 'confirmed'
  }
];

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'bookings'>('vehicles');
  
  const totalEarnings = mockVehicles.reduce((sum, vehicle) => sum + vehicle.totalEarnings, 0);
  const totalBookings = mockVehicles.reduce((sum, vehicle) => sum + vehicle.totalBookings, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAcceptBooking = (bookingId: string) => {
    console.log('Accepting booking:', bookingId);
  };

  const handleDeclineBooking = (bookingId: string) => {
    console.log('Declining booking:', bookingId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Car Business Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your vehicles and track your earnings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
                <p className="text-2xl font-bold text-green-600">${totalEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">My Vehicles</h3>
                <p className="text-2xl font-bold text-blue-600">{mockVehicles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Bookings</h3>
                <p className="text-2xl font-bold text-purple-600">{totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
                <p className="text-2xl font-bold text-yellow-600">
                  {mockBookings.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex space-x-6 mb-4 sm:mb-0">
                <button
                  onClick={() => setActiveTab('vehicles')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'vehicles'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Vehicles ({mockVehicles.length})
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`pb-2 border-b-2 font-medium transition-colors ${
                    activeTab === 'bookings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bookings ({mockBookings.length})
                </button>
              </div>
              
              {activeTab === 'vehicles' && (
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Vehicle
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'vehicles' ? (
              <div className="space-y-4">
                {mockVehicles.map(vehicle => (
                  <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={vehicle.image}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">Price per day</p>
                            <p className="font-semibold text-gray-900">${vehicle.pricePerDay}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total earnings</p>
                            <p className="font-semibold text-green-600">${vehicle.totalEarnings}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total bookings</p>
                            <p className="font-semibold text-blue-600">{vehicle.totalBookings}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Rating</p>
                            <p className="font-semibold text-yellow-600">{vehicle.rating} ⭐</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </button>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {mockBookings.map(booking => {
                  const vehicle = mockVehicles.find(v => v.id === booking.vehicleId);
                  return (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {vehicle?.make} {vehicle?.model} - {booking.renterName}
                          </h3>
                          <p className="text-sm text-gray-600">{booking.renterEmail}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Rental period</p>
                          <p className="font-semibold text-gray-900">{booking.startDate} - {booking.endDate}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total price</p>
                          <p className="font-semibold text-green-600">${booking.totalPrice}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Days</p>
                          <p className="font-semibold text-gray-900">
                            {Math.ceil((new Date(booking.endDate).getTime() - new Date(booking.startDate).getTime()) / (1000 * 60 * 60 * 24))}
                          </p>
                        </div>
                      </div>
                      
                      {booking.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAcceptBooking(booking.id)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineBooking(booking.id)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;