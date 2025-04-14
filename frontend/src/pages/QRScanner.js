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

          setMessage("Scanning...");

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
            setMessage('Error verifying QR. Try again.');
          }

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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-2">QR Code Scanner</h2>
      <div id="qr-reader" style={{ width: '300px' }}></div>

      {/* 🔽 Colored status message */}
      <p className={`mt-4 font-semibold ${
        message.includes('✅') ? 'text-green-600' :
        message.includes('❌') ? 'text-red-600' :
        message.includes('⚠️') ? 'text-yellow-600' : 'text-gray-700'
      }`}>
        {message}
      </p>
    </div>
  );
};

export default QRScanner;