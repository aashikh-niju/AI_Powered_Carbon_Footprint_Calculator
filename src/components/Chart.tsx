import React from 'react';

interface ChartProps {
  data: Record<string, number>;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const total = Object.values(data).reduce((sum, value) => sum + value, 0);
  const colors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-emerald-400 to-emerald-600',
    'from-amber-400 to-amber-600'
  ];

  const chartData = Object.entries(data).map(([category, value], index) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    value,
    percentage: (value / total) * 100,
    color: colors[index % colors.length]
  }));

  // Calculate donut chart segments
  let cumulativePercentage = 0;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Donut Chart */}
      <div className="relative flex justify-center">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
          />
          {chartData.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercentage * (circumference / 100);
            cumulativePercentage += item.percentage;
            
            return (
              <circle
                key={item.category}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={`url(#gradient-${index})`}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                style={{ animationDelay: `${index * 200}ms` }}
              />
            );
          })}
          <defs>
            {chartData.map((item, index) => (
              <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={item.color.includes('red') ? '#f87171' : 
                  item.color.includes('blue') ? '#60a5fa' :
                  item.color.includes('emerald') ? '#34d399' : '#fbbf24'} />
                <stop offset="100%" stopColor={item.color.includes('red') ? '#dc2626' : 
                  item.color.includes('blue') ? '#2563eb' :
                  item.color.includes('emerald') ? '#059669' : '#d97706'} />
              </linearGradient>
            ))}
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{total.toFixed(1)}</div>
            <div className="text-sm text-gray-600">kg CO₂</div>
          </div>
        </div>
      </div>

      {/* Legend and Bar Chart */}
      <div className="space-y-4">
        {chartData
          .sort((a, b) => b.value - a.value)
          .map((item, index) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">{item.category}</span>
                <span className="text-lg font-bold text-gray-900">{item.value.toFixed(1)} kg</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: `${item.percentage}%`,
                    animationDelay: `${index * 150}ms`
                  }}
                />
              </div>
              <div className="text-right text-sm text-gray-600">
                {item.percentage.toFixed(1)}%
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Chart;