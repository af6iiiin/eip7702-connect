document.getElementById("connect").onclick = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("لطفاً MetaMask را نصب کنید.");
    return;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];

    const message = "با تایید این پیام شما به قرارداد xyz اجازه امضا می‌دهید";
    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, address],
    });

    alert("امضا دریافت شد:\n" + signature);
  } catch (err) {
    console.error("خطا:", err);
    alert("خطایی رخ داد. لطفاً کنسول را چک کن.");
  }
};