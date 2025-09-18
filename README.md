# CreatorCoin Predict

A Base Mini App that enables creators to launch token-gated prediction markets for their community within Farcaster frames.

## Features

- **Prediction Market Creation**: Streamlined interface for creators to define prediction outcomes and set probabilities
- **In-Frame Staking**: Simple UI for viewers to stake creator tokens on prediction outcomes
- **Creator Revenue Share**: Automatic fee distribution to creators when markets resolve
- **Audience Analytics**: Basic dashboard showing participation rates and market performance
- **Mobile-First Design**: Optimized for Farcaster frame interactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base Network
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd creatorcoin-predict
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from Coinbase Developer Platform
   - `NEXT_PUBLIC_BASE_URL`: Your deployment URL

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   npm start
   ```

## Core Components

### PredictionCard
Displays prediction markets with creator info, outcomes, and current odds.

### StakingInterface
Modal interface for users to stake tokens on prediction outcomes.

### CreateMarketModal
Form for creators to set up new prediction markets with custom parameters.

### CreatorInfoBar
Dashboard showing creator statistics and revenue metrics.

## Data Models

### Market
- Market ID and creator information
- Prediction prompt and outcomes
- Token configuration and staking details
- Probability calculations and resolution status

### Stake
- User staking records
- Chosen outcomes and amounts
- Timestamps and market associations

### User
- Wallet addresses and Farcaster IDs
- Market creation and participation history

## Frame Integration

The app supports Farcaster frame interactions with:
- Frame metadata in layout
- POST endpoint for button interactions
- Dynamic OG image generation
- Mobile-optimized UI components

## Smart Contract Integration

Ready for integration with:
- ERC-20 token staking mechanisms
- Market resolution and payout distribution
- Creator fee collection
- Automated market maker functionality

## Design System

- **Colors**: Dark theme with blue/purple gradients
- **Typography**: Clean, readable fonts optimized for mobile
- **Components**: Modular, reusable UI elements
- **Animations**: Smooth transitions with proper timing
- **Responsive**: Mobile-first with desktop enhancements

## Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js:

```bash
npm run build
```

Ensure environment variables are configured in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
