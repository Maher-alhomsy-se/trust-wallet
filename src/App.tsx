import './App.css';

import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi';
import { parseEther } from 'viem';

import { useSendTransaction } from 'wagmi';
import { useSwitchChain } from 'wagmi';

function App() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const { connectors, connect } = useConnect();

  const { chains, switchChain } = useSwitchChain();

  const { data: hash, sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      sendTransaction({
        to: '0x7562D34B4Cb64ff4A100d4e54f500b3d73C321Ce',
        value: parseEther('0.001'),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="">
        {connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        ))}
      </div>

      <div className="">
        {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
        {address && <div>{ensName ? `${ensName} (${address})` : address}</div>}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>

      <form onSubmit={submit}>
        <button type="submit">Send</button>
        {hash && <div>Transaction Hash: {hash}</div>}
      </form>

      <div>
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
          >
            {chain.name}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
