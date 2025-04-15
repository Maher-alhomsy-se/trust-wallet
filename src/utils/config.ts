import { http, createConfig } from 'wagmi';
import { mainnet, base } from 'wagmi/chains';
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';

const projectId = 'ebffcea38f98f1180264ac82e271e2f3';

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
