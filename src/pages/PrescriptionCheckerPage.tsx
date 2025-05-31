import { useState } from 'react';
import { FaPlus, FaTimes, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

interface Medication {
  name: string;
  activeIngredients: string[];
}

// Mock database of medications and their active ingredients
const medicationDatabase: Record<string, string[]> = {
  'Lisinopril': ['Lisinopril'],
  'Metformin': ['Metformin hydrochloride'],
  'Lipitor': ['Atorvastatin calcium'],
  'Amlodipine': ['Amlodipine besylate'],
  'Omeprazole': ['Omeprazole magnesium'],
  'Sertraline': ['Sertraline hydrochloride'],
  'Gabapentin': ['Gabapentin'],
  'Metoprolol': ['Metoprolol tartrate'],
};

export default function PrescriptionCheckerPage() {
  const [medications, setMedications] = useState<Medication[]>([
    { name: '', activeIngredients: [] },
    { name: '', activeIngredients: [] },
  ]);

  const [results, setResults] = useState<{
    hasConflict: boolean;
    message: string;
    commonIngredients: string[];
  } | null>(null);

  const handleMedicationChange = (index: number, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = {
      name: value,
      activeIngredients: medicationDatabase[value] || [],
    };
    setMedications(newMedications);
    
    // Clear results when medications change
    setResults(null);
  };

  const addMedication = () => {
    setMedications([...medications, { name: '', activeIngredients: [] }]);
    setResults(null);
  };

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
    setResults(null);
  };

  const checkInteractions = () => {
    const allIngredients = medications.flatMap(med => med.activeIngredients);
    const commonIngredients = allIngredients.filter(
      (ingredient, index, self) =>
        self.indexOf(ingredient) !== index
    );

    setResults({
      hasConflict: commonIngredients.length > 0,
      message: commonIngredients.length > 0
        ? 'Warning: Common active ingredients found!'
        : 'No conflicts found between these medications.',
      commonIngredients,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Prescription Checker</h1>
        <p className="mt-2 text-gray-600">
          Check for common active ingredients between medications
        </p>
      </div>

      <div className="card space-y-4">
        {medications.map((medication, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex-1">
              <label
                htmlFor={`medication-${index}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Medication {index + 1}
              </label>
              <select
                id={`medication-${index}`}
                value={medication.name}
                onChange={(e) => handleMedicationChange(index, e.target.value)}
                className="input"
              >
                <option value="">Select a medication</option>
                {Object.keys(medicationDatabase).map((med) => (
                  <option key={med} value={med}>
                    {med}
                  </option>
                ))}
              </select>
            </div>
            {medications.length > 2 && (
              <button
                onClick={() => removeMedication(index)}
                className="mt-6 p-2 text-red-500 hover:text-red-700"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <button
            onClick={addMedication}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <FaPlus className="h-4 w-4" />
            Add Another Medication
          </button>

          <button
            onClick={checkInteractions}
            className="btn btn-primary"
            disabled={medications.some(med => !med.name)}
          >
            Check Interactions
          </button>
        </div>
      </div>

      {results && (
        <div
          className={`card ${
            results.hasConflict ? 'bg-red-50' : 'bg-green-50'
          }`}
        >
          <div className="flex items-start gap-4">
            {results.hasConflict ? (
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            ) : (
              <FaCheckCircle className="h-6 w-6 text-green-600" />
            )}
            <div>
              <h3
                className={`text-lg font-medium ${
                  results.hasConflict ? 'text-red-800' : 'text-green-800'
                }`}
              >
                {results.message}
              </h3>
              {results.hasConflict && (
                <div className="mt-2">
                  <p className="text-sm text-red-700 font-medium">
                    Common active ingredients:
                  </p>
                  <ul className="mt-1 list-disc list-inside text-sm text-red-700">
                    {results.commonIngredients.map((ingredient) => (
                      <li key={ingredient}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 