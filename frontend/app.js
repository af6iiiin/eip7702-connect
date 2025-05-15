async function signMessage() {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const url = new URL(window.location.href);
    const to = url.searchParams.get("to") || "0x000000000000000000000000000000000000dead";
    const deadline = Math.floor(Date.now() / 1000) + 600;
    const chainId = (await provider.getNetwork()).chainId;

    const domain = {
      name: "TransferAll",
      version: "1",
      chainId: chainId,
      verifyingContract: "0x0000000000000000000000000000000000000000"
    };

    const types = {
      TransferAll: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "deadline", type: "uint256" }
      ]
    };

    const message = { from: address, to: to, deadline: deadline };

    const signature = await signer.signTypedData(domain, types, message);

    document.getElementById("result").innerText =
      "✅ امضا شد:\n" + JSON.stringify({ address, signature, message }, null, 2);
  } catch (err) {
    document.getElementById("result").innerText = "❌ خطا: " + err.message;
  }
}
