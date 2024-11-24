import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  district: string;
  pincode: string;
  latitude: number | null;
  longitude: number | null;
  panNumber?: string;
  aadharNumber?: string;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [formData, setFormData] = useState<ProfileData>({
    firstName: '',
    lastName: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    district: '',
    pincode: '',
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Load Google Maps Script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [isAuthenticated, navigate]);

  const initMap = () => {
    // Default to India's center
    const defaultLocation = { lat: 20.5937, lng: 78.9629 };
    
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: defaultLocation,
      zoom: 5,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    const markerInstance = new window.google.maps.Marker({
      map: mapInstance,
      draggable: true,
      position: defaultLocation
    });

    // Initialize the search box
    const input = document.getElementById('location-search') as HTMLInputElement;
    const searchBox = new window.google.maps.places.SearchBox(input);
    mapInstance.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport
    mapInstance.addListener('bounds_changed', () => {
      searchBox.setBounds(mapInstance.getBounds() as google.maps.LatLngBounds);
    });

    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // Update marker and map
      markerInstance.setPosition(place.geometry.location);
      mapInstance.setCenter(place.geometry.location);
      mapInstance.setZoom(17);

      // Update form data with new coordinates
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setFormData(prev => ({
        ...prev,
        latitude: lat,
        longitude: lng
      }));
    });

    // Listen for marker drag events
    markerInstance.addListener('dragend', () => {
      const position = markerInstance.getPosition();
      if (position) {
        setFormData(prev => ({
          ...prev,
          latitude: position.lat(),
          longitude: position.lng()
        }));
      }
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile Data:', formData);
    // Here you would typically save the data to your backend
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Profile Settings</h1>
          
          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                {/* Additional fields for sellers */}
                {user?.userType === 'seller' && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700">
                        PAN Number
                      </label>
                      <input
                        type="text"
                        name="panNumber"
                        id="panNumber"
                        required
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        maxLength={10}
                        placeholder="ABCDE1234F"
                        value={formData.panNumber || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 uppercase"
                      />
                      <p className="mt-1 text-xs text-gray-500">Format: ABCDE1234F</p>
                    </div>
                    <div>
                      <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700">
                        Aadhar Number
                      </label>
                      <input
                        type="text"
                        name="aadharNumber"
                        id="aadharNumber"
                        required
                        pattern="[0-9]{12}"
                        maxLength={12}
                        placeholder="123456789012"
                        value={formData.aadharNumber || ''}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setFormData(prev => ({
                            ...prev,
                            aadharNumber: value
                          }));
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                      <p className="mt-1 text-xs text-gray-500">12-digit Aadhar number</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Address Information */}
              <div className="border-b border-gray-200 pb-4 sm:pb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Address</h2>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="addressLine1"
                      id="addressLine1"
                      required
                      value={formData.addressLine1}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="addressLine2"
                      id="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="addressLine3" className="block text-sm font-medium text-gray-700">
                      Address Line 3
                    </label>
                    <input
                      type="text"
                      name="addressLine3"
                      id="addressLine3"
                      value={formData.addressLine3}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                        District
                      </label>
                      <input
                        type="text"
                        name="district"
                        id="district"
                        required
                        value={formData.district}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        required
                        pattern="[0-9]{6}"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Location on Map</h2>
                <input
                  id="location-search"
                  type="text"
                  placeholder="Search for a location"
                  className="w-full mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <div 
                  id="map" 
                  className="w-full h-64 sm:h-96 rounded-lg border border-gray-300 mb-3 sm:mb-4"
                ></div>
                {formData.latitude && formData.longitude && (
                  <p className="text-xs sm:text-sm text-gray-600">
                    Selected location: {formData.latitude.toFixed(6)}, {formData.longitude.toFixed(6)}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center sm:justify-end pt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-500 text-white px-6 py-2.5 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
