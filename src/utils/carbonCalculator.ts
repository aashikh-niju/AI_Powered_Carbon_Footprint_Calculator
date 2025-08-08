import { UserAnswers } from '../App';

export interface CarbonData {
  total: number;
  breakdown: {
    transport: number;
    food: number;
    energy: number;
    shopping: number;
  };
}

// Emission factors (kg CO₂ per unit)
const EMISSION_FACTORS = {
  // Transport (kg CO₂ per km)
  car: 0.21, // Average passenger car
  publicTransport: 0.089, // Bus/train average
  flight: 0.255, // Average flight per km (assuming 1000km average flight)
  
  // Energy (kg CO₂ per kWh)
  electricity: 0.5, // Global average grid electricity
  heating: 2.3, // kg CO₂ per hour of heating/cooling
  hotWater: 0.0024, // kg CO₂ per liter of heated water
  electronics: 0.45, // kg CO₂ per hour of electronics use
  
  // Food (kg CO₂ per meal)
  meatMeal: 3.3, // Average meat-based meal
  
  // Shopping (kg CO₂ per dollar spent)
  clothing: 0.024, // Fast fashion impact per dollar
};

export const calculateCarbonFootprint = (answers: UserAnswers): CarbonData => {
  // Transport calculations
  const carEmissions = answers.carKm * EMISSION_FACTORS.car;
  const publicTransportEmissions = answers.publicTransportKm * EMISSION_FACTORS.publicTransport;
  const flightEmissions = answers.flights * 1000 * EMISSION_FACTORS.flight; // Assuming 1000km average flight
  const transportTotal = carEmissions + publicTransportEmissions + flightEmissions;

  // Food calculations
  const meatEmissions = (answers.meatMeals * 4.33) * EMISSION_FACTORS.meatMeal; // weeks to month conversion
  const foodTotal = meatEmissions;

  // Energy calculations
  const electricityEmissions = answers.electricity * EMISSION_FACTORS.electricity;
  const heatingEmissions = answers.heatingCooling * 30 * EMISSION_FACTORS.heating; // daily to monthly
  const hotWaterEmissions = answers.hotWater * 30 * EMISSION_FACTORS.hotWater; // daily to monthly
  const electronicsEmissions = answers.electronicsHours * 30 * EMISSION_FACTORS.electronics; // daily to monthly
  const energyTotal = electricityEmissions + heatingEmissions + hotWaterEmissions + electronicsEmissions;

  // Shopping calculations
  const clothingEmissions = answers.clothingSpend * EMISSION_FACTORS.clothing;
  const shoppingTotal = clothingEmissions;

  // Additional emissions from other activities (estimate 5% of total calculated emissions)
  const baseTotal = transportTotal + foodTotal + energyTotal + shoppingTotal;
  const otherEmissions = answers.otherActivities ? baseTotal * 0.05 : 0;

  const total = baseTotal + otherEmissions;

  return {
    total,
    breakdown: {
      transport: transportTotal,
      food: foodTotal,
      energy: energyTotal,
      shopping: shoppingTotal
    }
  };
};