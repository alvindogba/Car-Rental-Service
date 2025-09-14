import React, { useMemo, useState } from 'react';
import { Plus, Car, DollarSign, Calendar, Edit, Trash2, Eye, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { useCreateVehicleMutation, useListOwnerVehiclesQuery } from '../../Store/Vehicle/vehicleApi';
import { useGetOwnerBookingsQuery, useUpdateBookingStatusMutation } from '../../Store/Booking/bookingApi';

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'bookings'>('vehicles');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    make: '',
    model: '',
    year: '' as string | number,
    pricePerDay: '' as string | number,
    type: '',
    seats: '' as string | number,
    fuel: '',
    location: '',
    images: '' as string, // comma-separated URLs
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: vehicles = [], isLoading: loadingVehicles } = useListOwnerVehiclesQuery();
  const { data: bookings = [], isLoading: loadingBookings } = useGetOwnerBookingsQuery();
  const [updateStatus, { isLoading: updating }] = useUpdateBookingStatusMutation();
  const [createVehicle, { isLoading: creating }] = useCreateVehicleMutation();

  const totalEarnings = useMemo(() => (bookings as any[]).reduce((sum, b) => sum + Number(b.totalPrice), 0), [bookings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {user.name}! Owner Dashboard</h1>
          <p className="text-gray-600">Manage your vehicles and track your earnings</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full"><DollarSign className="h-6 w-6 text-green-600" /></div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
                <p className="text-2xl font-bold text-green-600">${totalEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full"><Car className="h-6 w-6 text-blue-600" /></div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">My Vehicles</h3>
                <p className="text-2xl font-bold text-blue-600">{(vehicles as any[]).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-purple-600" /></div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Bookings</h3>
                <p className="text-2xl font-bold text-purple-600">{(bookings as any[]).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full"><Calendar className="h-6 w-6 text-yellow-600" /></div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Pending Requests</h3>
                <p className="text-2xl font-bold text-yellow-600">{(bookings as any[]).filter(b => b.status === 'pending').length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex space-x-6 mb-4 sm:mb-0">
                <button onClick={() => setActiveTab('vehicles')} className={`pb-2 border-b-2 font-medium transition-colors ${activeTab === 'vehicles' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  My Vehicles ({(vehicles as any[]).length})
                </button>
                <button onClick={() => setActiveTab('bookings')} className={`pb-2 border-b-2 font-medium transition-colors ${activeTab === 'bookings' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  Bookings ({(bookings as any[]).length})
                </button>
              </div>
              {activeTab === 'vehicles' && (
                <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Vehicle
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'vehicles' ? (
              loadingVehicles ? (
                <div>Loading vehicles...</div>
              ) : (
                <div className="space-y-4">
                  {(vehicles as any[]).map((vehicle) => (
                    <div key={vehicle.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <img src={vehicle.images?.[0] || 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'} alt={`${vehicle.make} ${vehicle.model}`} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{vehicle.make} {vehicle.model} ({vehicle.year})</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${vehicle.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{vehicle.available ? 'Available' : 'Unavailable'}</span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-gray-600">Price per day</p>
                              <p className="font-semibold text-gray-900">${vehicle.pricePerDay}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Location</p>
                              <p className="font-semibold text-blue-600">{vehicle.location || '-'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Type</p>
                              <p className="font-semibold text-gray-900">{vehicle.type || '-'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Seats</p>
                              <p className="font-semibold text-gray-900">{vehicle.seats || '-'}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"><Eye className="h-4 w-4 mr-1" />View</button>
                            <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center"><Edit className="h-4 w-4 mr-1" />Edit</button>
                            <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"><Trash2 className="h-4 w-4 mr-1" />Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : loadingBookings ? (
              <div>Loading bookings...</div>
            ) : (
              <div className="space-y-4">
                {(bookings as any[]).map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{booking.vehicle?.make} {booking.vehicle?.model}</h3>
                        <p className="text-sm text-gray-600">Renter: {booking.renter?.name} ({booking.renter?.email})</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>{String(booking.status).charAt(0).toUpperCase() + String(booking.status).slice(1)}</span>
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
                        <p className="text-sm text-gray-600">Vehicle location</p>
                        <p className="font-semibold text-gray-900">{booking.vehicle?.location || '-'}</p>
                      </div>
                    </div>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          disabled={updating}
                          onClick={() => updateStatus({ id: booking.id, status: 'confirmed' })}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm disabled:opacity-50"
                        >
                          Accept
                        </button>
                        <button
                          disabled={updating}
                          onClick={() => updateStatus({ id: booking.id, status: 'cancelled' })}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm disabled:opacity-50"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddModal(false)} />
            <div className="relative bg-white w-full max-w-lg mx-4 rounded-xl shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Add New Vehicle</h2>
                <button onClick={() => setShowAddModal(false)} className="p-1 rounded hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form
                className="p-4 space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const newErrors: { [k: string]: string } = {};
                  if (!form.make.trim()) newErrors.make = 'Make is required';
                  if (!form.model.trim()) newErrors.model = 'Model is required';
                  if (!String(form.year).trim()) newErrors.year = 'Year is required';
                  if (!String(form.pricePerDay).trim()) newErrors.pricePerDay = 'Price per day is required';
                  setErrors(newErrors);
                  if (Object.keys(newErrors).length) return;

                  const payload = {
                    make: form.make.trim(),
                    model: form.model.trim(),
                    year: Number(form.year),
                    pricePerDay: Number(form.pricePerDay),
                    type: form.type.trim() || undefined,
                    seats: String(form.seats).trim() ? Number(form.seats) : undefined,
                    fuel: form.fuel.trim() || undefined,
                    location: form.location.trim() || undefined,
                    images: form.images
                      .split(',')
                      .map((s) => s.trim())
                      .filter(Boolean),
                  };

                  try {
                    await createVehicle(payload).unwrap();
                    setShowAddModal(false);
                    setForm({ make: '', model: '', year: '', pricePerDay: '', type: '', seats: '', fuel: '', location: '', images: '' });
                    setErrors({});
                  } catch (err: any) {
                    // simple surface error
                    setErrors({ submit: err?.data?.message || 'Failed to create vehicle' });
                  }
                }}
              >
                {errors.submit && (
                  <div className="text-red-600 text-sm">{errors.submit}</div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Make</label>
                    <input
                      type="text"
                      value={form.make}
                      onChange={(e) => setForm((f) => ({ ...f, make: e.target.value }))}
                      className={`mt-1 w-full rounded-md border ${errors.make ? 'border-red-500' : 'border-gray-300'} p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Toyota"
                    />
                    {errors.make && <p className="text-xs text-red-600 mt-1">{errors.make}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Model</label>
                    <input
                      type="text"
                      value={form.model}
                      onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                      className={`mt-1 w-full rounded-md border ${errors.model ? 'border-red-500' : 'border-gray-300'} p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="Corolla"
                    />
                    {errors.model && <p className="text-xs text-red-600 mt-1">{errors.model}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="number"
                      min={1980}
                      max={2100}
                      value={form.year}
                      onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                      className={`mt-1 w-full rounded-md border ${errors.year ? 'border-red-500' : 'border-gray-300'} p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="2020"
                    />
                    {errors.year && <p className="text-xs text-red-600 mt-1">{errors.year}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price Per Day (USD)</label>
                    <input
                      type="number"
                      min={1}
                      step="0.01"
                      value={form.pricePerDay}
                      onChange={(e) => setForm((f) => ({ ...f, pricePerDay: e.target.value }))}
                      className={`mt-1 w-full rounded-md border ${errors.pricePerDay ? 'border-red-500' : 'border-gray-300'} p-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="50"
                    />
                    {errors.pricePerDay && <p className="text-xs text-red-600 mt-1">{errors.pricePerDay}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      value={form.type}
                      onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Sedan, SUV, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.seats}
                      onChange={(e) => setForm((f) => ({ ...f, seats: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fuel</label>
                    <input
                      type="text"
                      value={form.fuel}
                      onChange={(e) => setForm((f) => ({ ...f, fuel: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Petrol, Diesel, Hybrid"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Monrovia"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Image URLs</label>
                    <input
                      type="text"
                      value={form.images}
                      onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
                      className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://..., https://..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate multiple URLs with commas</p>
                  </div>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {creating ? 'Saving...' : 'Save Vehicle'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
