import React, { useState } from 'react';
import { Leaf, Calculator, TrendingDown } from 'lucide-react';
import QuestionForm from './components/QuestionForm';
import Results from './components/Results';
import { calculateCarbonFootprint, CarbonData } from './utils/carbonCalculator';

export interface UserAnswers {
  carKm: number;
  publicTransportKm: number;
  flights: number;
  electricity: number;
  heatingCooling: number;
  meatMeals: number;
  clothingSpend: number;
  hotWater: number;
  electronicsHours: number;
  otherActivities: string;
}

const initialAnswers: UserAnswers = {
  carKm: 0,
  publicTransportKm: 0,
  flights: 0,
  electricity: 0,
  heatingCooling: 0,
  meatMeals: 0,
  clothingSpend: 0,
  hotWater: 0,
  electronicsHours: 0,
  otherActivities: ''
};

function App() {
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  const [showResults, setShowResults] = useState(false);
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null);

  const handleSubmit = (userAnswers: UserAnswers) => {
    setAnswers(userAnswers);
    const data = calculateCarbonFootprint(userAnswers);
    setCarbonData(data);
    setShowResults(true);
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setCarbonData(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Carbon Footprint Calculator
              </h1>
              <p className="text-sm text-gray-600">AI-powered sustainability insights</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {!showResults ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-4 mb-6">
                <div className="p-3 bg-white rounded-full shadow-lg">
                  <Calculator className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="p-3 bg-white rounded-full shadow-lg">
                  <TrendingDown className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Discover Your Environmental Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Answer a few questions about your lifestyle, and our AI will calculate your carbon footprint 
                and provide personalized recommendations to reduce your environmental impact.
              </p>
            </div>

            <QuestionForm onSubmit={handleSubmit} />
          </div>
        ) : (
          carbonData && (
            <Results 
              carbonData={carbonData} 
              answers={answers} 
              onReset={handleReset} 
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-emerald-100 mt-16">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-gray-600">
            Calculate responsibly. Act sustainably. 🌱
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;