import React from 'react';
import { RefreshCcw, TrendingUp, Target, Lightbulb } from 'lucide-react';
import { CarbonData } from '../utils/carbonCalculator';
import { UserAnswers } from '../App';
import { generatePersonalizedTips } from '../utils/tipGenerator';
import Chart from './Chart';

interface ResultsProps {
  carbonData: CarbonData;
  answers: UserAnswers;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ carbonData, answers, onReset }) => {
  const tips = generatePersonalizedTips(carbonData, answers);

  const getFootprintLevel = (total: number) => {
    if (total < 500) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (total < 1000) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const footprintLevel = getFootprintLevel(carbonData.total);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Carbon Footprint Analysis</h2>
        <p className="text-lg text-gray-600">AI-powered insights based on your lifestyle</p>
      </div>

      {/* Total Footprint Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            {carbonData.total.toFixed(1)}
          </div>
          <div className="text-2xl text-gray-600 mb-4">kg CO₂ per month</div>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${footprintLevel.bg}`}>
            <TrendingUp className={`h-5 w-5 ${footprintLevel.color}`} />
            <span className={`font-semibold ${footprintLevel.color}`}>
              {footprintLevel.level} Impact
            </span>
          </div>
        </div>
        <p className="text-gray-600">
          Your annual footprint: <span className="font-semibold">{(carbonData.total * 12).toFixed(0)} kg CO₂</span>
        </p>
      </div>

      {/* Breakdown Chart */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Emissions Breakdown</h3>
        <Chart data={carbonData.breakdown} />
      </div>

      {/* Category Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(carbonData.breakdown).map(([category, value]) => (
          <div key={category} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-lg font-semibold text-gray-900 capitalize">{category}</h4>
              <span className="text-2xl font-bold text-emerald-600">{value.toFixed(1)} kg</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full"
                style={{ width: `${(value / carbonData.total) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {((value / carbonData.total) * 100).toFixed(1)}% of total emissions
            </p>
          </div>
        ))}
      </div>

      {/* AI-Generated Tips */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Personalized Recommendations</h3>
        </div>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex-shrink-0">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                  <p className="text-gray-600 mb-3">{tip.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                      Save up to {tip.potentialSaving} kg CO₂/month
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-emerald-600 font-medium">{tip.difficulty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <RefreshCcw className="h-5 w-5" />
          Calculate Again
        </button>
      </div>
    </div>
  );
};

export default Results;