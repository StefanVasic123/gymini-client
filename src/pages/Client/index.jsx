import React from 'react';
import { useSelector } from 'react-redux';
import { QRCodeCanvas } from 'qrcode.react';

const Client = () => {
  let { client, isLoading, isError, message } = useSelector(
    (state) => state.clients
  );
  return (
    <div>
      <h1>CLIENTS HOMEPAGE</h1>
      <p>name: {client.name}</p>
      <p>email: {client.email}</p>
      <div>
        <QRCodeCanvas
          id='qrCode'
          value={[
            client.name,
            client.lastName,
            client.password,
            client.endDate,
          ]}
          size='50'
          bgColor={'#00ff00'}
          level={'H'}
        />
      </div>
    </div>
  );
};

export default Client;
