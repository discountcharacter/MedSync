import React, { useState, useEffect } from 'react';
import { Upload, File, Plus } from 'lucide-react';
import axios from 'axios';

interface Prescription {
  id: string;
  date: string;
  doctorName: string;
  patientName: string;
  medicines: string;
  notes: string;
}

const Dashboard = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch prescriptions from the backend on component mount
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
        const response = await axios.get('https://medsync-6iom.onrender.com/api/prescriptions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPrescriptions(response.data);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  // Handle file upload and send to backend for OCR processing
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('prescription', file);

    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      const response = await axios.post('https://medsync-6iom.onrender.com/api/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Add the new prescription to the list
      setPrescriptions([...prescriptions, response.data]);
    } catch (error) {
      console.error('Error uploading prescription:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Prescriptions
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <label className="relative cursor-pointer bg-blue-600 rounded-md font-medium text-white hover:bg-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
            <span className="px-4 py-2 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Prescription
            </span>
            <input
              type="file"
              className="sr-only"
              onChange={handleFileUpload}
              accept="image/*,.pdf"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {isUploading && (
        <div className="mt-8 text-center p-4 bg-blue-50 rounded-md">
          <p className="text-blue-600">Processing prescription...</p>
        </div>
      )}

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center">
                <File className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Prescription - {prescription.date}
                  </h3>
                  <p className="text-sm text-gray-500">{prescription.doctorName}</p>
                </div>
              </div>
              <div className="mt-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Patient Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{prescription.patientName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Medicines</dt>
                    <dd className="mt-1 text-sm text-gray-900">{prescription.medicines}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Doctor's Notes</dt>
                    <dd className="mt-1 text-sm text-gray-900">{prescription.notes}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}

        {prescriptions.length === 0 && !isUploading && (
          <div className="col-span-full">
            <div className="text-center p-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <Plus className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No prescriptions</h3>
              <p className="mt-1 text-sm text-gray-500">Upload your first prescription to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
