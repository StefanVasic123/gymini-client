import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export const QRCode = (userData) => {
  const [userVal, setUserVal] = useState('');

  const generateQRCode = (e) => {
    setUserVal(e.target.value);
  };

  const qrCode = (
    <QRCodeCanvas
      id='qrCode'
      value={userData}
      size='300'
      bgColor={'#00ff00'}
      level={'H'}
    />
  );

  return qrCode;
};
