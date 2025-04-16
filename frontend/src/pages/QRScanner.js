// ✅ Updated QRScanner.js with live scan + image upload + clean decoding
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

const QRScanner = () => {
  const scannerRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    let isRunning = false;
    const config = { fps: 10, qrbox: 250 };

    scanner
      .start(
        { facingMode: "environment" },
        config,
        async (decodedText) => {
          if (isRunning) {
            isRunning = false;
            scanner.stop().catch(() => {});
          }

          await verifyQr(decodedText);

          setTimeout(() => {
            scanner
              .start({ facingMode: "environment" }, config, () => {}, () => {})
              .then(() => {
                isRunning = true;
              })
              .catch((err) => console.warn("Restart failed", err));
          }, 3000);
        },
        (err) => console.warn("Scanner error", err)
      )
      .then(() => {
        isRunning = true;
      })
      .catch((err) => console.error("Initial start failed", err));

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current && isRunning) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const verifyQr = async (decodedText) => {
    setMessage("Verifying QR...");

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post(
        'http://127.0.0.1:8000/api/scan/',
        { qr_data: decodedText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === 'valid') {
        setMessage(`✅ Welcome: ${response.data.message}`);
      } else if (response.data.status === 'already_used') {
        setMessage('⚠️ Ticket has already been used!');
      } else {
        setMessage('❌ Invalid ticket');
      }
    } catch (error) {
      setMessage('❌ Error verifying QR. Try again.');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const html5Qr = new Html5Qrcode("_upload_reader");

    html5Qr
      .scanFile(file, true)
      .then((decodedText) => {
        verifyQr(decodedText);
      })
      .catch((err) => {
        console.error("Scan error:", err);
        setMessage('❌ Could not decode QR from image.');
      });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
      <div id="qr-reader" style={{ width: '300px' }}></div>

      <div className="mt-4">
        <label className="block font-semibold mb-1">Or Upload QR Screenshot:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-1"
        />
      </div>

      <div id="_upload_reader" style={{ display: 'none' }}></div>

      <p className={`mt-4 font-semibold ${
        message.includes('Welcome') ? 'text-green-600' :
        message.includes('Invalid') ? 'text-red-600' :
        message.includes('used') ? 'text-yellow-600' : 'text-gray-700'
      }`}>
        {message}
      </p>
    </div>
  );
};

export default QRScanner;
