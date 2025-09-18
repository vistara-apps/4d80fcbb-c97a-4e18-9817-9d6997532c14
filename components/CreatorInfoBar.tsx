'use client';

import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';
import type { CreatorInfoBarProps } from '../lib/types';

export function CreatorInfoBar({ 
  creatorAddress, 
  creatorName, 
  totalMarkets, 
  totalRevenue,
  variant = 'default' 
}: CreatorInfoBarProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatRevenue = (revenue: number) => {
    if (revenue >= 1000) {
      return `$${(revenue / 1000).toFixed(1)}K`;
    }
    return `$${revenue.toFixed(2)}`;
  };

  return (
    <div className={`glass-card rounded-lg p-6 ${
      variant === 'default' ? '' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              Creator Dashboard
            </h3>
            <p className="text-text-secondary text-sm">
              {creatorName} • {formatAddress(creatorAddress)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-surface/50 rounded-lg">
          <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            {totalMarkets}
          </div>
          <div className="text-text-secondary text-sm">
            Markets Created
          </div>
        </div>

        <div className="text-center p-4 bg-surface/50 rounded-lg">
          <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            {formatRevenue(totalRevenue)}
          </div>
          <div className="text-text-secondary text-sm">
            Total Revenue
          </div>
        </div>

        <div className="text-center p-4 bg-surface/50 rounded-lg">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            {Math.floor(totalRevenue * 10)}
          </div>
          <div className="text-text-secondary text-sm">
            Total Participants
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">
            Average fee per market:
          </span>
          <span className="text-accent font-medium">
            {totalMarkets > 0 ? ((totalRevenue / totalMarkets) * 100).toFixed(1) : '0'}%
          </span>
        </div>
      </div>
    </div>
  );
}
