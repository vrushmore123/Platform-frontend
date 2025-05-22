import React from 'react';

const FeatureCard = ({ title, features }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-4 text-blue-700">{title}</h3>
      <ul className="list-disc list-inside space-y-1 text-gray-700">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
};

export default FeatureCard;
