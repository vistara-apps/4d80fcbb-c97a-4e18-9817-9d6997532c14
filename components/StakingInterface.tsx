'use client';

import { useState } from 'react';
import { X, TrendingUp, Users, DollarSign } from 'lucide-react';
import type { Market } from '../lib/types';

interface StakingInterfaceProps {
  market: Market;
  onClose: () => void;
  onStake: (outcome: string, amount: number) => void;
}

export function StakingInterface({ market, onClose, onStake }: StakingInterfaceProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');
  const [stakeAmount, setStakeAmount] = useState<string>('');
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    if (!selectedOutcome || !stakeAmount || parseFloat(stakeAmount) <= 0) return;

    setIsStaking(true);
    try {
      await onStake(selectedOutcome, parseFloat(stakeAmount));
    } catch (error) {
      console.error('Staking error:', error);
    } finally {
      setIsStaking(false);
    }
  };

  const potentialPayout = selectedOutcome && stakeAmount 
    ? parseFloat(stakeAmount) * (selectedOutcome === market.outcomeA 
        ? (100 / market.probabilityA) 
        : (100 / market.probabilityB))
    : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-text-primary">Stake Tokens</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Market Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center text-xl">
              {market.creatorAvatar || '👤'}
            </div>
            <div>
              <div className="font-semibold text-text-primary">
                {market.creatorName}
              </div>
              <div className="text-sm text-text-secondary">
                {market.tokenSymbol} Market
              </div>
            </div>
          </div>
          
          <h3 className="text-text-primary font-medium mb-4">
            {market.prompt}
          </h3>

          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-text-primary">
                {market.totalStaked}
              </div>
              <div className="text-xs text-text-secondary">Total Staked</div>
            </div>
            <div>
              <div className="text-lg font-bold text-text-primary">
                {market.creatorFeePercentage}%
              </div>
              <div className="text-xs text-text-secondary">Creator Fee</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                Live
              </div>
              <div className="text-xs text-text-secondary">Status</div>
            </div>
          </div>
        </div>

        {/* Outcome Selection */}
        <div className="p-6 border-b border-gray-700">
          <h4 className="text-text-primary font-medium mb-4">Choose Outcome</h4>
          
          <div className="space-y-3">
            <button
              onClick={() => setSelectedOutcome(market.outcomeA)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedOutcome === market.outcomeA
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 hover:border-green-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-text-primary font-medium">
                    {market.outcomeA}
                  </span>
                </div>
                <div className="text-green-400 font-bold">
                  {market.probabilityA}%
                </div>
              </div>
            </button>

            <button
              onClick={() => setSelectedOutcome(market.outcomeB)}
              className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedOutcome === market.outcomeB
                  ? 'border-red-500 bg-red-500/10'
                  : 'border-gray-600 hover:border-red-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-text-primary font-medium">
                    {market.outcomeB}
                  </span>
                </div>
                <div className="text-red-400 font-bold">
                  {market.probabilityB}%
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Stake Amount */}
        <div className="p-6 border-b border-gray-700">
          <h4 className="text-text-primary font-medium mb-4">Stake Amount</h4>
          
          <div className="relative">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-4 bg-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
              min="0"
              step="0.01"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
              {market.tokenSymbol}
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-2 mt-3">
            {[10, 25, 50, 100].map((amount) => (
              <button
                key={amount}
                onClick={() => setStakeAmount(amount.toString())}
                className="flex-1 py-2 px-3 bg-bg border border-gray-600 rounded text-text-secondary hover:border-accent hover:text-accent transition-colors duration-200"
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Payout Calculation */}
        {selectedOutcome && stakeAmount && (
          <div className="p-6 border-b border-gray-700">
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-text-secondary">Potential Payout:</span>
                <span className="text-accent font-bold">
                  {potentialPayout.toFixed(2)} {market.tokenSymbol}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">Potential Profit:</span>
                <span className="text-green-400 font-medium">
                  +{(potentialPayout - parseFloat(stakeAmount)).toFixed(2)} {market.tokenSymbol}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-6">
          <button
            onClick={handleStake}
            disabled={!selectedOutcome || !stakeAmount || parseFloat(stakeAmount) <= 0 || isStaking}
            className="stake-button w-full mb-3"
          >
            {isStaking ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Staking...
              </div>
            ) : (
              `Stake ${stakeAmount || '0'} ${market.tokenSymbol}`
            )}
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
