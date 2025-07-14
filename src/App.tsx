import  { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RenterDashboard from './pages/RenterDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import VehicleBrowser from './pages/VehicleBrowser';
import VehicleDetails from './pages/VehicleDetails';
import BookingFlow from './pages/BookingFlow';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/browse" element={<VehicleBrowser />} />
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
            
            {/* Protected Routes */}
            <Route 
              path="/renter-dashboard" 
              element={
                <ProtectedRoute requiredRole="renter">
                  <RenterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/owner-dashboard" 
              element={
                <ProtectedRoute requiredRole="owner">
                  <OwnerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/book/:id" 
              element={
                <ProtectedRoute>
                  <BookingFlow />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;