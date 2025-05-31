import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaUserCircle, FaTimes } from 'react-icons/fa';

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  contact: string;
  lastVisit: string;
  generalInfo: {
    bloodType: string;
    height: string;
    weight: string;
  };
  illnesses: string[];
  currentMedication: string[];
  allergies: string[];
  pastMedication: string[];
}

const patients: Patient[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 35,
    gender: 'Female',
    contact: '+1 234-567-8901',
    lastVisit: '2024-02-15',
    generalInfo: {
      bloodType: 'A+',
      height: '5\'6"',
      weight: '140 lbs',
    },
    illnesses: ['Hypertension', 'Asthma'],
    currentMedication: ['Lisinopril 10mg', 'Albuterol inhaler'],
    allergies: ['Penicillin', 'Peanuts'],
    pastMedication: ['Metformin', 'Ventolin'],
  },
  {
    id: 2,
    name: 'Michael Brown',
    age: 45,
    gender: 'Male',
    contact: '+1 234-567-8902',
    lastVisit: '2024-02-20',
    generalInfo: {
      bloodType: 'O+',
      height: '5\'10"',
      weight: '180 lbs',
    },
    illnesses: ['Type 2 Diabetes', 'High Cholesterol'],
    currentMedication: ['Metformin 1000mg', 'Lipitor 20mg'],
    allergies: ['Sulfa drugs'],
    pastMedication: ['Glipizide', 'Crestor'],
  },
];

export default function PatientsPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Patients List</h1>
        <p className="mt-2 text-gray-600">Manage and view patient information</p>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Age
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gender
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FaUserCircle className="h-8 w-8 text-gray-400" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.contact}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="btn btn-primary"
                    >
                      View Data
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Data Modal */}
      <Dialog
        open={selectedPatient !== null}
        onClose={() => setSelectedPatient(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="relative bg-white rounded-lg max-w-2xl w-full p-6">
            {selectedPatient && (
              <>
                <div className="flex justify-between items-start">
                  <Dialog.Title className="text-2xl font-bold text-gray-900">
                    Patient Information
                  </Dialog.Title>
                  <button
                    onClick={() => setSelectedPatient(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {/* General Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">General Information</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Blood Type</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedPatient.generalInfo.bloodType}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Height</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedPatient.generalInfo.height}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weight</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedPatient.generalInfo.weight}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Illnesses */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Illnesses</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPatient.illnesses.map((illness) => (
                        <span
                          key={illness}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                        >
                          {illness}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Current Medication */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Current Medication</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPatient.currentMedication.map((med) => (
                        <span
                          key={med}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Allergies */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPatient.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Past Medication */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Past Medication</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedPatient.pastMedication.map((med) => (
                        <span
                          key={med}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
} 