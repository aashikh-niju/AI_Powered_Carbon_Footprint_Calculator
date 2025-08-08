import React, { useState } from 'react';
import { ChevronRight, Car, Train, Plane, Zap, Thermometer, UtensilsCrossed, ShoppingBag, Droplets, Monitor } from 'lucide-react';
import { UserAnswers } from '../App';

interface QuestionFormProps {
  onSubmit: (answers: UserAnswers) => void;
}

const questions = [
  {
    id: 'carKm',
    title: 'Car Travel',
    question: 'How many kilometers do you travel by car per month?',
    icon: Car,
    type: 'number',
    unit: 'km',
    placeholder: '0'
  },
  {
    id: 'publicTransportKm',
    title: 'Public Transport',
    question: 'How many kilometers do you travel by public transport per month?',
    icon: Train,
    type: 'number',
    unit: 'km',
    placeholder: '0'
  },
  {
    id: 'flights',
    title: 'Air Travel',
    question: 'How many flights do you take per month?',
    icon: Plane,
    type: 'number',
    unit: 'flights',
    placeholder: '0'
  },
  {
    id: 'electricity',
    title: 'Electricity Usage',
    question: 'How many kWh of electricity do you use per month?',
    icon: Zap,
    type: 'number',
    unit: 'kWh',
    placeholder: '300'
  },
  {
    id: 'heatingCooling',
    title: 'Climate Control',
    question: 'How many hours per day do you use air conditioning or heating?',
    icon: Thermometer,
    type: 'number',
    unit: 'hours/day',
    placeholder: '4'
  },
  {
    id: 'meatMeals',
    title: 'Diet',
    question: 'How many meat-based meals do you eat per week?',
    icon: UtensilsCrossed,
    type: 'number',
    unit: 'meals/week',
    placeholder: '7'
  },
  {
    id: 'clothingSpend',
    title: 'Shopping',
    question: 'How much do you spend on new clothes per month?',
    icon: ShoppingBag,
    type: 'number',
    unit: '$',
    placeholder: '50'
  },
  {
    id: 'hotWater',
    title: 'Hot Water',
    question: 'How many liters of water do you heat per day?',
    icon: Droplets,
    type: 'number',
    unit: 'liters/day',
    placeholder: '50'
  },
  {
    id: 'electronicsHours',
    title: 'Electronics Usage',
    question: 'How many hours of electronics do you use daily?',
    icon: Monitor,
    type: 'number',
    unit: 'hours/day',
    placeholder: '6'
  },
  {
    id: 'otherActivities',
    title: 'Other Activities',
    question: 'Any other regular activities that could contribute to emissions?',
    icon: ChevronRight,
    type: 'text',
    unit: '',
    placeholder: 'e.g., gardening, hobbies, etc.'
  }
];

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({
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
  });

  const handleInputChange = (field: keyof UserAnswers, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: field === 'otherActivities' ? value : Number(value)
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onSubmit(answers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = questions[currentQuestion];
  const Icon = question.icon;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-emerald-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <Icon className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{question.title}</h3>
        <p className="text-xl text-gray-900 leading-relaxed">{question.question}</p>
      </div>

      {/* Input */}
      <div className="mb-8">
        <div className="relative">
          {question.type === 'number' ? (
            <input
              type="number"
              min="0"
              value={answers[question.id as keyof UserAnswers] || ''}
              onChange={(e) => handleInputChange(question.id as keyof UserAnswers, e.target.value)}
              placeholder={question.placeholder}
              className="w-full text-2xl text-center p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
            />
          ) : (
            <textarea
              value={answers[question.id as keyof UserAnswers] || ''}
              onChange={(e) => handleInputChange(question.id as keyof UserAnswers, e.target.value)}
              placeholder={question.placeholder}
              rows={3}
              className="w-full text-lg p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
            />
          )}
          {question.unit && (
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
              {question.unit}
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 flex items-center gap-2 transition-all transform hover:scale-105"
        >
          {currentQuestion === questions.length - 1 ? 'Calculate' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;