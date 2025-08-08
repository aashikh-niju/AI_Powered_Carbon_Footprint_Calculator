import { CarbonData } from './carbonCalculator';
import { UserAnswers } from '../App';

export interface Tip {
  title: string;
  description: string;
  potentialSaving: number;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  category: string;
}

export const generatePersonalizedTips = (carbonData: CarbonData, answers: UserAnswers): Tip[] => {
  const tips: Tip[] = [];
  const breakdown = carbonData.breakdown;
  
  // Sort categories by highest emissions
  const sortedCategories = Object.entries(breakdown)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3); // Top 3 categories

  // Transport tips
  if (breakdown.transport > 0) {
    if (answers.carKm > 500) {
      tips.push({
        title: 'Optimize Your Driving Habits',
        description: 'Consider carpooling, combining trips, or switching to public transport for 2-3 trips per week. Maintain proper tire pressure and avoid aggressive driving to improve fuel efficiency.',
        potentialSaving: Math.round(answers.carKm * 0.3 * 0.21),
        difficulty: 'Easy',
        category: 'transport'
      });
    }
    
    if (answers.flights > 0) {
      tips.push({
        title: 'Reduce Air Travel Impact',
        description: 'Consider video conferencing for business meetings when possible, or choose direct flights and economy class. Consider purchasing carbon offsets for unavoidable flights.',
        potentialSaving: Math.round(answers.flights * 500 * 0.255),
        difficulty: 'Moderate',
        category: 'transport'
      });
    }
  }

  // Energy tips
  if (breakdown.energy > 0) {
    if (answers.electricity > 400) {
      tips.push({
        title: 'Improve Home Energy Efficiency',
        description: 'Switch to LED bulbs, unplug electronics when not in use, and set your thermostat 2°C lower in winter and 2°C higher in summer. Consider upgrading to energy-efficient appliances.',
        potentialSaving: Math.round(answers.electricity * 0.2 * 0.5),
        difficulty: 'Easy',
        category: 'energy'
      });
    }
    
    if (answers.heatingCooling > 6) {
      tips.push({
        title: 'Smart Climate Control',
        description: 'Use programmable thermostats, improve insulation, and dress appropriately for the season. Use fans to circulate air and reduce reliance on heating/cooling systems.',
        potentialSaving: Math.round(answers.heatingCooling * 2 * 30 * 2.3),
        difficulty: 'Moderate',
        category: 'energy'
      });
    }
  }

  // Food tips
  if (breakdown.food > 0 && answers.meatMeals > 7) {
    tips.push({
      title: 'Adopt More Plant-Based Meals',
      description: 'Try "Meatless Monday" or replace 2-3 meat meals per week with plant-based alternatives. Focus on local, seasonal produce and reduce food waste by meal planning.',
      potentialSaving: Math.round(3 * 4.33 * 3.3),
      difficulty: 'Moderate',
      category: 'food'
    });
  }

  // Shopping tips
  if (breakdown.shopping > 0 && answers.clothingSpend > 100) {
    tips.push({
      title: 'Sustainable Shopping Habits',
      description: 'Buy quality items that last longer, shop second-hand when possible, and repair items instead of replacing them. Choose brands with sustainable practices.',
      potentialSaving: Math.round(answers.clothingSpend * 0.5 * 0.024),
      difficulty: 'Easy',
      category: 'shopping'
    });
  }

  // General high-impact tips
  if (carbonData.total > 800) {
    tips.push({
      title: 'Consider Renewable Energy',
      description: 'Look into solar panels for your home or switch to a green energy provider. This can significantly reduce your energy-related emissions.',
      potentialSaving: Math.round(breakdown.energy * 0.8),
      difficulty: 'Challenging',
      category: 'energy'
    });
  }

  // Return top 3 most relevant tips
  return tips
    .sort((a, b) => b.potentialSaving - a.potentialSaving)
    .slice(0, 3);
};