const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { ethers } = require('ethers');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// تأیید امضا دریافتی از کاربر
app.post('/verify-signature', async (req, res) => {
  const { address, signature, message } = req.body;

  const domain = {
    name: 'TransferAll',
    version: '1',
    chainId: parseInt(process.env.CHAIN_ID),
    verifyingContract: '0x0000000000000000000000000000000000000000', // فعلاً فرضی
  };

  const types = {
    TransferAll: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
  };

  const digest = ethers.TypedDataEncoder.hash(domain, types, message);
  const recovered = ethers.verifyTypedData(domain, types, message, signature);

  if (recovered.toLowerCase() === address.toLowerCase()) {
    return res.json({ success: true, msg: '✅ امضا معتبر است' });
  } else {
    return res.status(400).json({ success: false, msg: '❌ امضا نامعتبر است' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});