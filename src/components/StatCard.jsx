import React from 'react';

const StatCard = ({ icon: Icon, value, label, color }) => {
  const colorClasses = {
    primary: 'bg-blue-500',
    warning: 'bg-orange-500',
    danger: 'bg-red-500',
    success: 'bg-green-500',
    info: 'bg-blue-400'
  };

  const bgColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className="stat-card relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-1 h-full ${bgColor}`}></div>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 ${bgColor}`}>
        <Icon className="w-7 h-7" />
      </div>
      <div className="text-4xl font-extrabold font-mono text-slate-800 mb-2">
        {value}
      </div>
      <div className="text-slate-500 text-sm font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default StatCard;
