export interface Market {
  marketId: string;
  creatorAddress: string;
  prompt: string;
  outcomeA: string;
  outcomeB: string;
  probabilityA: number;
  probabilityB: number;
  stakedTokenAddress: string;
  totalStaked: number;
  isActive: boolean;
  resolvedOutcome: string | null;
  createdAt: Date;
  resolvedAt: Date | null;
  creatorFeePercentage: number;
  creatorName?: string;
  creatorAvatar?: string;
  tokenSymbol?: string;
}

export interface Stake {
  stakeId: string;
  marketId: string;
  userAddress: string;
  stakedAmount: number;
  chosenOutcome: string;
  createdAt: Date;
}

export interface User {
  userAddress: string;
  farcasterId?: string;
  createdAt: Date;
  displayName?: string;
  avatar?: string;
}

export interface MarketStats {
  totalMarkets: number;
  totalVolume: number;
  totalParticipants: number;
  activeMarkets: number;
}

export interface StakeButtonProps {
  outcome: string;
  probability: number;
  onStake: (outcome: string) => void;
  disabled?: boolean;
  variant?: 'stakeA' | 'stakeB';
}

export interface PredictionCardProps {
  market: Market;
  onClick?: () => void;
  variant?: 'default' | 'active';
}

export interface OutcomeDisplayProps {
  outcome: string;
  probability: number;
  totalStaked: number;
  variant?: 'prospective' | 'resolved';
}

export interface CreatorInfoBarProps {
  creatorAddress: string;
  creatorName: string;
  totalMarkets: number;
  totalRevenue: number;
  variant?: 'default';
}
