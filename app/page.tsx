'use client';

import { useState, useEffect } from 'react';
import { PredictionCard } from '../components/PredictionCard';
import { CreateMarketModal } from '../components/CreateMarketModal';
import { CreatorInfoBar } from '../components/CreatorInfoBar';
import { StakingInterface } from '../components/StakingInterface';
import { Plus, TrendingUp, Users, DollarSign } from 'lucide-react';
import type { Market } from '../lib/types';

export default function HomePage() {
  // Mock user data for now - in a real Mini App, this would come from MiniKit context
  const user = {
    address: '0x1234567890123456789012345678901234567890',
    displayName: 'DemoUser'
  };
  const [markets, setMarkets] = useState<Market[]>([]);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockMarkets: Market[] = [
      {
        marketId: '1',
        creatorAddress: '0x1234...5678',
        prompt: 'Will make top 10 streamers on content about all creators by next year?',
        outcomeA: 'Yes',
        outcomeB: 'No',
        probabilityA: 65,
        probabilityB: 35,
        stakedTokenAddress: '0xabcd...efgh',
        totalStaked: 2500,
        isActive: true,
        resolvedOutcome: null,
        createdAt: new Date(),
        resolvedAt: null,
        creatorFeePercentage: 3,
        creatorName: 'StreamerPro',
        creatorAvatar: '🎮',
        tokenSymbol: 'STREAM'
      },
      {
        marketId: '2',
        creatorAddress: '0x5678...9012',
        prompt: 'Will the new game release break 1M players in first week?',
        outcomeA: 'Yes',
        outcomeB: 'No',
        probabilityA: 45,
        probabilityB: 55,
        stakedTokenAddress: '0xefgh...ijkl',
        totalStaked: 1800,
        isActive: true,
        resolvedOutcome: null,
        createdAt: new Date(),
        resolvedAt: null,
        creatorFeePercentage: 2,
        creatorName: 'GameDev',
        creatorAvatar: '🎯',
        tokenSymbol: 'GAME'
      }
    ];

    setTimeout(() => {
      setMarkets(mockMarkets);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCreateMarket = (marketData: Partial<Market>) => {
    const newMarket: Market = {
      marketId: Date.now().toString(),
      creatorAddress: user?.address || '0x0000...0000',
      prompt: marketData.prompt || '',
      outcomeA: marketData.outcomeA || 'Yes',
      outcomeB: marketData.outcomeB || 'No',
      probabilityA: 50,
      probabilityB: 50,
      stakedTokenAddress: marketData.stakedTokenAddress || '',
      totalStaked: 0,
      isActive: true,
      resolvedOutcome: null,
      createdAt: new Date(),
      resolvedAt: null,
      creatorFeePercentage: marketData.creatorFeePercentage || 3,
      creatorName: user?.displayName || 'Creator',
      creatorAvatar: '👤',
      tokenSymbol: marketData.tokenSymbol || 'TOKEN'
    };

    setMarkets(prev => [newMarket, ...prev]);
    setShowCreateModal(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading prediction markets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            CreatorCoin Predict
          </h1>
          <p className="text-text-secondary text-lg">
            Build instant prediction markets with your community's token
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-primary">
              {markets.length}
            </div>
            <div className="text-text-secondary">Active Markets</div>
          </div>
          <div className="glass-card rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-primary">
              {markets.reduce((acc, market) => acc + market.totalStaked, 0)}
            </div>
            <div className="text-text-secondary">Total Participants</div>
          </div>
          <div className="glass-card rounded-lg p-4 text-center">
            <DollarSign className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-text-primary">
              ${markets.reduce((acc, market) => acc + market.totalStaked * 0.1, 0).toFixed(0)}
            </div>
            <div className="text-text-secondary">Total Volume</div>
          </div>
        </div>

        {/* Create Market Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowCreateModal(true)}
            className="stake-button flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Prediction Market
          </button>
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {markets.map((market) => (
            <PredictionCard
              key={market.marketId}
              market={market}
              onClick={() => setSelectedMarket(market)}
            />
          ))}
        </div>

        {/* Empty State */}
        {markets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              No prediction markets yet
            </h3>
            <p className="text-text-secondary mb-6">
              Be the first to create a prediction market for your community!
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="stake-button"
            >
              Create Your First Market
            </button>
          </div>
        )}

        {/* Creator Info Bar */}
        {user && (
          <CreatorInfoBar
            creatorAddress={user.address || ''}
            creatorName={user.displayName || 'Creator'}
            totalMarkets={markets.filter(m => m.creatorAddress === user.address).length}
            totalRevenue={markets
              .filter(m => m.creatorAddress === user.address)
              .reduce((acc, m) => acc + (m.totalStaked * m.creatorFeePercentage / 100), 0)
            }
          />
        )}

        {/* Modals */}
        {showCreateModal && (
          <CreateMarketModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateMarket}
          />
        )}

        {selectedMarket && (
          <StakingInterface
            market={selectedMarket}
            onClose={() => setSelectedMarket(null)}
            onStake={(outcome, amount) => {
              console.log('Staking:', outcome, amount);
              // Handle staking logic here
              setSelectedMarket(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
