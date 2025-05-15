const projectId = "450851819c4009f3503181729123df01"; // از cloud.walletconnect.com بگیر

const metadata = {
  name: "EIP-7702 App",
  description: "دسترسی ولت با امضا",
  url: "https://eip7702-connect.onrender.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"]
};

const modal = new window.WalletConnectWeb3Modal.default({
  projectId,
  metadata,
  enableAnalytics: false,
  themeMode: "light",
});

document.getElementById("connect").onclick = async () => {
  try {
    const provider = await modal.connect();
    const accounts = await provider.request({ method: 'eth_accounts' });
    const address = accounts[0];

    const message = "با تایید این پیام، شما به قرارداد xyz اجازه امضا می‌دهید";
    const signature = await provider.request({
      method: "personal_sign",
      params: [message, address],
    });

    alert(`✅ امضا دریافت شد:\n\n${signature}`);
  } catch (err) {
    console.error("❌ خطا:", err);
    alert("خطا در اتصال یا امضا");
  }
};