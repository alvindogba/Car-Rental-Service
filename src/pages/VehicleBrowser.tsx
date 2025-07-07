import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, DollarSign, Users, Fuel, MapPin, Heart } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  rating: number;
  image: string;
  type: string;
  seats: number;
  fuel: string;
  location: string;
  available: boolean;
  featured?: boolean;
}

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    pricePerDay: 45,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Sedan',
    seats: 5,
    fuel: 'Gasoline',
    location: 'Monrovia',
    available: true,
    featured: true
  },
  {
    id: '2',
    make: 'Nissan',
    model: 'Pathfinder',
    year: 2019,
    pricePerDay: 60,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'SUV',
    seats: 7,
    fuel: 'Gasoline',
    location: 'Paynesville',
    available: true
  },
  {
    id: '3',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    pricePerDay: 35,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Compact',
    seats: 5,
    fuel: 'Gasoline',
    location: 'Sinkor',
    available: true
  },
  {
    id: '4',
    make: 'Toyota',
    model: 'Highlander',
    year: 2018,
    pricePerDay: 55,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'SUV',
    seats: 8,
    fuel: 'Gasoline',
    location: 'Congo Town',
    available: true,
    featured: true
  },
  {
    id: '5',
    make: 'Ford',
    model: 'Explorer',
    year: 2020,
    pricePerDay: 50,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'SUV',
    seats: 7,
    fuel: 'Gasoline',
    location: 'New Kru Town',
    available: true
  },
  {
    id: '6',
    make: 'Hyundai',
    model: 'Elantra',
    year: 2021,
    pricePerDay: 30,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=600',
    type: 'Sedan',
    seats: 5,
    fuel: 'Gasoline',
    location: 'Monrovia',
    available: true
  }
];

const VehicleBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const vehicleTypes = ['All', 'Sedan', 'SUV', 'Compact', 'Hatchback'];
  const priceRanges = ['All', '$20-40', '$40-60', '$60+'];

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || vehicle.type === selectedType;
    const matchesPrice = priceRange === 'All' || 
                        (priceRange === '$20-40' && vehicle.pricePerDay >= 20 && vehicle.pricePerDay <= 40) ||
                        (priceRange === '$40-60' && vehicle.pricePerDay >= 40 && vehicle.pricePerDay <= 60) ||
                        (priceRange === '$60+' && vehicle.pricePerDay >= 60);
    
    return matchesSearch && matchesType && matchesPrice;
  });

  const toggleFavorite = (vehicleId: string) => {
    setFavorites(prev => 
      prev.includes(vehicleId) 
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Cars in Liberia"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90"></div>
        </div>
        
        <AnimatedSection className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Ride
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Choose from our wide selection of clean, reliable vehicles across Liberia
          </p>
          
          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <AnimatedCounter end={500} suffix="+" className="text-3xl font-bold" />
              <div className="text-blue-200 text-sm">Cars Available</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <AnimatedCounter end={15} suffix="+" className="text-3xl font-bold" />
              <div className="text-blue-200 text-sm">Locations</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold">4.8</div>
              <div className="text-blue-200 text-sm">Average Rating</div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <AnimatedSection className="bg-white p-6 rounded-2xl shadow-lg mb-8 -mt-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search by make or model..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {vehicleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {priceRanges.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            showFilters 
              ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-gray-200' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  {vehicleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Results Count */}
        <AnimatedSection className="mb-6">
          <p className="text-gray-600 text-lg">
            Found <span className="font-semibold text-blue-600">{filteredVehicles.length}</span> vehicle{filteredVehicles.length !== 1 ? 's' : ''} available
          </p>
        </AnimatedSection>

        {/* Vehicle Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVehicles.map((vehicle, index) => (
            <AnimatedSection 
              key={vehicle.id} 
              animation="fadeInUp" 
              delay={index * 100}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {vehicle.featured && (
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                      Featured
                    </span>
                  )}
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Available
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(vehicle.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 transform hover:scale-110"
                >
                  <Heart 
                    className={`h-5 w-5 transition-all duration-300 ${
                      favorites.includes(vehicle.id) 
                        ? 'text-red-500 fill-current scale-110' 
                        : 'text-gray-600 hover:text-red-500'
                    }`} 
                  />
                </button>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {vehicle.make} {vehicle.model}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                    {vehicle.year}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1 font-medium">{vehicle.rating}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {vehicle.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {vehicle.seats} seats
                    </div>
                    <div className="flex items-center">
                      <Fuel className="h-4 w-4 mr-1" />
                      {vehicle.fuel}
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium">
                    {vehicle.type}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">{vehicle.pricePerDay}</span>
                    <span className="text-sm text-gray-500 ml-1">/day</span>
                  </div>
                  <Link
                    to={`/vehicle/${vehicle.id}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold transform hover:scale-105 hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* No Results */}
        {filteredVehicles.length === 0 && (
          <AnimatedSection className="text-center py-16">
            <img
              src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="No vehicles found"
              className="w-32 h-32 object-cover rounded-full mx-auto mb-6 opacity-50"
            />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No vehicles found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters to find more options</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('All');
                setPriceRange('All');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Clear Filters
            </button>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
};

export default VehicleBrowser;