'use client';

import { Clock, Users, TrendingUp } from 'lucide-react';
import type { PredictionCardProps } from '../lib/types';

export function PredictionCard({ 
  market, 
  onClick, 
  variant = 'default' 
}: PredictionCardProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div 
      className={`prediction-card cursor-pointer ${
        variant === 'active' ? 'ring-2 ring-accent' : ''
      }`}
      onClick={onClick}
    >
      {/* Creator Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-lg">
          {market.creatorAvatar || '👤'}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-text-primary">
            {market.creatorName || 'Creator'}
          </div>
          <div className="text-sm text-text-secondary flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTimeAgo(market.createdAt)}
          </div>
        </div>
        <div className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
          {market.tokenSymbol}
        </div>
      </div>

      {/* Market Question */}
      <div className="mb-4">
        <h3 className="text-text-primary font-medium leading-tight">
          {market.prompt}
        </h3>
      </div>

      {/* Outcomes */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-text-primary font-medium">{market.outcomeA}</span>
          </div>
          <div className="text-green-400 font-bold">
            {market.probabilityA}%
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-md">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-text-primary font-medium">{market.outcomeB}</span>
          </div>
          <div className="text-red-400 font-bold">
            {market.probabilityB}%
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span>{market.totalStaked} staked</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <span>{market.creatorFeePercentage}% fee</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-3 pt-3 border-t border-surface">
        <div className="flex items-center justify-between">
          <div className={`text-xs px-2 py-1 rounded-full ${
            market.isActive 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-gray-500/20 text-gray-400'
          }`}>
            {market.isActive ? 'Active' : 'Resolved'}
          </div>
          <button className="text-accent hover:text-accent/80 text-sm font-medium transition-colors duration-200">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}
