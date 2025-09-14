import React from 'react';
import { Link } from 'react-router-dom';
import { Car, DollarSign, Shield, CreditCard, Smartphone, Play, CheckCircle, Users, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import AnimatedCounter from '../components/AnimatedCounter';


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <img
              src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Cars in Monrovia"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/80"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeInLeft">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Need a ride or wan' list your car?
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                We got you covered! Rent a car easy-easy or make money from ya own ride right here in Liberia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="/browse"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl"
                >
                  Find a Car Now
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-all duration-300 shadow-lg border-2 border-white transform hover:scale-105 hover:shadow-xl"
                >
                  List Your Car
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center animate-pulse">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="text-sm">1000+ Happy Customers</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-400 animate-bounce" />
                  <span className="text-sm">4.8 Rating</span>
                </div>
              </div>
            </AnimatedSection>

            {/* Hero Image/Video */}
            <AnimatedSection animation="fadeInRight" delay={200}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  <img
                    src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Modern car in Liberia"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Play Button Overlay for Video Feel */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm p-6 rounded-full hover:bg-white/30 transition-all duration-300 transform hover:scale-110 animate-pulse">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </button>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-bounce">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Car className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <AnimatedCounter end={500} suffix="+" className="text-2xl font-bold text-gray-900" />
                      <div className="text-sm text-gray-600">Cars Available</div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Features Section with Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose RideShare LR?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We make car rental simple and safe for everyone in Liberia. From Monrovia to Gbarnga, we got the perfect ride for you.
            </p>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <AnimatedSection animation="fadeInUp" delay={100} className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Rent a vehicle in Liberia"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                    <Car className="h-8 w-8 text-white mx-auto mb-2 animate-bounce" />
                    <h3 className="text-xl font-semibold text-white">Rent a Vehicle</h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                Choose from plenty cars - Toyota, Nissan, Honda, and more. All clean and ready to go from Monrovia to anywhere in Liberia!
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200} className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Make money with your car"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                    <DollarSign className="h-8 w-8 text-white mx-auto mb-2 animate-pulse" />
                    <h3 className="text-xl font-semibold text-white">Make Money</h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                List your car and earn money while you not using it. Easy way to make extra cash in these hard times!
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={300} className="text-center group">
              <div className="relative mb-8 overflow-hidden rounded-2xl">
                <img
                  src="https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Safe and secure transactions"
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
                    <Shield className="h-8 w-8 text-white mx-auto mb-2 animate-spin" style={{ animationDuration: '3s' }} />
                    <h3 className="text-xl font-semibold text-white">Safe & Secure</h3>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-lg">
                All payments safe, all cars checked, and customer support ready to help 24/7. Your safety is our priority.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works Section with Process Images */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to get you on the road or start earning
            </p>
          </AnimatedSection>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* For Renters */}
            <AnimatedSection animation="fadeInLeft" className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src="https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Renting process"
                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full animate-bounce">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mt-4">
                  For People Who Want Rent
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0 animate-pulse">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Create Your Account</h4>
                    <p className="text-gray-600">Sign up free and verify your details. Takes less than 2 minutes!</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Search for Cars</h4>
                    <p className="text-gray-600">Find the perfect car for your needs in your area</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-blue-100 p-3 rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '1s' }}>
                    <span className="text-blue-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Book & Pay</h4>
                    <p className="text-gray-600">Choose your dates, pay safely, and enjoy your ride!</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* For Owners */}
            <AnimatedSection animation="fadeInRight" className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Car listing process"
                    className="w-32 h-32 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-600 p-2 rounded-full animate-bounce">
                    <Car className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mt-4">
                  For People Who Want List Car
                </h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0 animate-pulse">
                    <span className="text-green-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Register Your Car</h4>
                    <p className="text-gray-600">Add photos and details about your vehicle</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '0.5s' }}>
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Set Your Price</h4>
                    <p className="text-gray-600">Choose how much you want charge per day</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 transform hover:translate-x-2 transition-transform duration-300">
                  <div className="bg-green-100 p-3 rounded-full flex-shrink-0 animate-pulse" style={{ animationDelay: '1s' }}>
                    <span className="text-green-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Accept Bookings & Get Paid</h4>
                    <p className="text-gray-600">Approve rentals and receive money directly</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Payment Section with Visual Elements */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Easy Payment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All payments are safe an' easy. Once you pay, your booking confirm right away. We support all the payment methods Liberians love to use.
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="scaleIn" delay={100} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative mb-6">
                <img
                  src="https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Credit card payment"
                  className="w-20 h-20 object-cover rounded-full mx-auto shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute -bottom-2 -right-8 bg-blue-600 p-2 rounded-full animate-bounce">
                  <CreditCard className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Credit/Debit Card</h3>
              <p className="text-gray-600">
                Use your Visa, Mastercard, or any bank card. All transactions secured with international standards.
              </p>
            </AnimatedSection>

            <AnimatedSection animation="scaleIn" delay={200} className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mx-auto shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Smartphone className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="absolute -bottom-2 -right-8 bg-indigo-600 p-2 rounded-full animate-bounce">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Apple Pay / Google Pay</h3>
              <p className="text-gray-600">Use supported wallets for a fast, secure checkout.</p>
            </AnimatedSection>

            <AnimatedSection animation="scaleIn" delay={300} className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative mb-6">
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mx-auto shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="absolute -bottom-2 -right-8 bg-yellow-600 p-2 rounded-full animate-bounce">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">Stripe Secure Checkout</h3>
              <p className="text-gray-600">Industry-standard security powered by Stripe for peace of mind.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real Liberians using RideShare LR
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection animation="fadeInUp" delay={100} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Customer testimonial"
                  className="w-12 h-12 object-cover rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h4 className="font-semibold">Mary Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "RideShare LR made it so easy for me to rent a car for my family trip to Gbarnga. The process was smooth and the car was clean!"
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={200} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Customer testimonial"
                  className="w-12 h-12 object-cover rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h4 className="font-semibold">James Kollie</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I'm making good money listing my Toyota on RideShare LR. The platform is reliable and payments come on time every time."
              </p>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={300} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Customer testimonial"
                  className="w-12 h-12 object-cover rounded-full mr-4 transition-transform duration-300 hover:scale-110"
                />
                <div>
                  <h4 className="font-semibold">Sarah Williams</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Best car rental service in Liberia! Checkout was quick and secure. Highly recommended!"
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action with Background Image */}
      <section className="relative py-20 bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Liberian roads"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-blue-600/80"></div>
        </div>
        
        <AnimatedSection className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Join thousands of Liberians who trust RideShare LR for their transportation needs. Whether you wan' rent or list, we got you covered!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 hover:shadow-xl"
            >
              Create Free Account Now
            </Link>
            <Link
              to="/browse"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-400 transition-all duration-300 shadow-lg border-2 border-white transform hover:scale-105 hover:shadow-xl"
            >
              Start Browsing Cars
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default HomePage;
