'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { Market } from '../lib/types';

interface CreateMarketModalProps {
  onClose: () => void;
  onSubmit: (marketData: Partial<Market>) => void;
}

export function CreateMarketModal({ onClose, onSubmit }: CreateMarketModalProps) {
  const [formData, setFormData] = useState({
    prompt: '',
    outcomeA: 'Yes',
    outcomeB: 'No',
    stakedTokenAddress: '',
    tokenSymbol: '',
    creatorFeePercentage: 3
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.prompt.trim() || !formData.stakedTokenAddress.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Market creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-text-primary">Create Prediction Market</h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Market Question */}
          <div className="p-6 border-b border-gray-700">
            <label className="block text-text-primary font-medium mb-3">
              Prediction Question
            </label>
            <textarea
              value={formData.prompt}
              onChange={(e) => handleInputChange('prompt', e.target.value)}
              placeholder="e.g., Will [Creator Name] reach 10K followers by end of month?"
              className="w-full p-4 bg-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none resize-none"
              rows={3}
              required
            />
            <p className="text-xs text-text-secondary mt-2">
              Make it specific and time-bound for better engagement
            </p>
          </div>

          {/* Outcomes */}
          <div className="p-6 border-b border-gray-700">
            <label className="block text-text-primary font-medium mb-3">
              Prediction Outcomes
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Outcome A (Positive)
                </label>
                <input
                  type="text"
                  value={formData.outcomeA}
                  onChange={(e) => handleInputChange('outcomeA', e.target.value)}
                  className="w-full p-3 bg-bg border border-gray-600 rounded-lg text-text-primary focus:border-green-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Outcome B (Negative)
                </label>
                <input
                  type="text"
                  value={formData.outcomeB}
                  onChange={(e) => handleInputChange('outcomeB', e.target.value)}
                  className="w-full p-3 bg-bg border border-gray-600 rounded-lg text-text-primary focus:border-red-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Token Configuration */}
          <div className="p-6 border-b border-gray-700">
            <label className="block text-text-primary font-medium mb-3">
              Staking Token
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Token Contract Address
                </label>
                <input
                  type="text"
                  value={formData.stakedTokenAddress}
                  onChange={(e) => handleInputChange('stakedTokenAddress', e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Token Symbol
                </label>
                <input
                  type="text"
                  value={formData.tokenSymbol}
                  onChange={(e) => handleInputChange('tokenSymbol', e.target.value.toUpperCase())}
                  placeholder="e.g., CREATOR"
                  className="w-full p-3 bg-bg border border-gray-600 rounded-lg text-text-primary placeholder-text-secondary focus:border-accent focus:outline-none"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>

          {/* Creator Fee */}
          <div className="p-6 border-b border-gray-700">
            <label className="block text-text-primary font-medium mb-3">
              Creator Fee Percentage
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                value={formData.creatorFeePercentage}
                onChange={(e) => handleInputChange('creatorFeePercentage', parseInt(e.target.value))}
                className="flex-1"
              />
              <div className="bg-accent/20 text-accent px-3 py-2 rounded-lg font-bold min-w-[60px] text-center">
                {formData.creatorFeePercentage}%
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              Fee taken from total staked amount when market resolves
            </p>
          </div>

          {/* Preview */}
          <div className="p-6 border-b border-gray-700">
            <h4 className="text-text-primary font-medium mb-3">Preview</h4>
            <div className="bg-bg rounded-lg p-4 border border-gray-600">
              <div className="text-text-primary font-medium mb-3">
                {formData.prompt || 'Your prediction question will appear here...'}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/20 rounded">
                  <span className="text-text-primary">{formData.outcomeA}</span>
                  <span className="text-green-400">50%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-500/10 border border-red-500/20 rounded">
                  <span className="text-text-primary">{formData.outcomeB}</span>
                  <span className="text-red-400">50%</span>
                </div>
              </div>
              <div className="text-xs text-text-secondary mt-2">
                Token: {formData.tokenSymbol || 'TOKEN'} • Fee: {formData.creatorFeePercentage}%
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6">
            <button
              type="submit"
              disabled={!formData.prompt.trim() || !formData.stakedTokenAddress.trim() || isSubmitting}
              className="stake-button w-full mb-3"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Market...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Prediction Market
                </div>
              )}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
