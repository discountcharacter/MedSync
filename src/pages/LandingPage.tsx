import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Users, Clock, Shield } from 'lucide-react';

const features = [
  {
    icon: <FileText className="h-6 w-6" />,
    title: 'Easy Prescription Upload',
    description: 'Upload and digitize your prescriptions instantly with our smart scanning technology.'
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Family Management',
    description: 'Manage prescriptions for your entire family in one secure place.'
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: 'Medical History',
    description: 'Access your complete medical history and prescriptions anytime, anywhere.'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure Storage',
    description: 'Your medical data is encrypted and stored with bank-level security.'
  }
];

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 p-4"
            src="https://plus.unsplash.com/premium_photo-1658506671316-0b293df7c72b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZG9jdG9yfGVufDB8fDB8fHww"
            alt="Medical professional"
          />
        </div>
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Your Medical Records</span>
                  <span className="block text-blue-600">All in One Place</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Digitize and manage all your medical prescriptions effortlessly. Access your complete medical history anytime, anywhere.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      Get Started
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to manage your prescriptions
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    {feature.icon}
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
