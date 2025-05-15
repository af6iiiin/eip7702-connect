const { EthereumClient, w3mConnectors, w3mProvider } = window.WalletConnectModal;
const { configureChains, createConfig, WagmiConfig } = window.WalletConnectModal.wagmi;
const { mainnet } = window.WalletConnectModal.chains;

const projectId = "450851819c4009f3503181729123df01";

const chains = [mainnet];
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const modal = new window.WalletConnectModal.Web3Modal({
  projectId,
  themeMode: "light",
  ethereumClient,
});

document.getElementById("connect").onclick = async () => {
  try {
    await modal.openModal();
  } catch (err) {
    console.error("❌ خطا:", err);
    alert("خطا در اتصال یا امضا");
  }
};
