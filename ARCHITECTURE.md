# Trustify Architecture & Full Documentation

## System Overview
Trustify is a decentralized reputation system bridging web3 smart contracts with a web2-like frontend experience. This ensures accessibility without compromising the immutable and trustless nature of the Stellar blockchain.

## Core Components
1. **Frontend (React + Vite)**
   - Utilizes `useTrustSystem` to interact with the Stellar network.
   - Global network metrics are indexed and summarized on the Metrics Dashboard.
   - User identity is managed exclusively via the Freighter wallet connection (`useWallet`).

2. **Smart Contract (Soroban / Rust)**
   - Deployed on the Stellar Testnet.
   - Handles the core logic: creating tasks and appending trust score endorsements.
   - Emits events used by the frontend for data indexing.

3. **Data Indexing Layer (`src/utils/dataIndexer.ts`)**
   - Monitors Soroban contract events.
   - Aggregates task states and trust scores into a queryable memory index.
   - Supports filtering (e.g., querying highly trusted workers).

4. **Monitoring & Telemetry (`src/utils/monitoring.ts`)**
   - Implements localized stubs for an external telemetry service (like Sentry).
   - Captures runtime exceptions from wallet signature rejections or contract failures.

## Testing Strategy
- Unit tests run via Vitest.
- Component rendering verified using Testing Library.

## Build and Deployment
- Node environment requires `>= 18.0`.
- Deployment is automated via GitHub Actions on Netlify.
