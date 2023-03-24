import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Dropdown from '../../Dropdown';
import { setShowEndShiftNotificationModal } from '../../../features/modals/modalSlice';
import { setEndShiftNotificationModal } from '../../../features/notifications/endShiftNotificationSlice';

import {
  closeShift,
  getLastShift,
  resetShift,
} from '../../../features/shifts/shiftSlice';

const Title = styled.div`
  text-align: center;
  font-size: 50%;
  padding: 5% 0;
  margin-bottom: -2%;
`;

const Content = styled.div`
  margin: 0 20%;
  font-size: 70%;
  margin-bottom: 3%;
`;

const Row = styled.div`
  text-align: center;
`;

const Input = styled.input``;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 50%;
`;

const EndShiftForm = () => {
  const [shiftNumber, setShiftNumber] = useState('1');
  const [staffName, setStaffName] = useState('');
  const [shiftDuration, setShiftDuration] = useState([]);

  let { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  let { firstShift, secondShift, thirdShift } = useSelector(
    (state) => state.shiftSettings
  );

  // let { dailyPrice, monthlyPrice, yearlyPrice } = useSelector(
  //   (state) => state.packagePrices
  // );

  let lastShiftNumber = useSelector((state) => state.lastShift.shiftNumber);

  function handleClients() {
    return clients.filter(
      (client) =>
        new Date(client.startDate).getFullYear() === new Date().getFullYear() &&
        new Date(client.startDate).getMonth() === new Date().getMonth() &&
        new Date(client.startDate).getDate() === new Date().getDate()
    );
  }

  function handleInitialShift() {
    if (
      shiftDuration !== [] &&
      shiftDuration !== (firstShift ? firstShift[1] : false) &&
      shiftDuration !== (secondShift ? secondShift[2] : false) &&
      shiftDuration !== (thirdShift ? thirdShift[3] : false)
    ) {
      setShiftDuration(firstShift[1]);
    }
  }

  useEffect(() => {
    handleInitialShift();
    handleClients();
    if (shiftDuration === []) {
      setShiftDuration(firstShift[1]);
    }
  }, [handleInitialShift, handleClients]);

  let { clients } = useSelector((state) => state.clients);

  const dispatch = useDispatch();

  const userId = user?._id || null;

  const endShift = Date.now();

  let handleClientsVar = handleClients();

  const validUsers = () => {
    let currentShift = shiftDuration;

    if (handleClientsVar && currentShift) {
      return handleClientsVar.filter(
        (client) =>
          new Date(client.createdAt).getHours() >= currentShift[0] &&
          new Date(client.createdAt).getHours() < currentShift[1]
      );
    } else {
      return [];
    }
  };

  let validUsersArr = validUsers();

  const handleTurnover = () => {
    let clientsArr = [];

    if (handleClientsVar.length) {
      for (let x = 0; x < validUsersArr.length; x++) {
        /*  switch (validUsersArr[x].package) {
          case 'daily':
            clientsArr.push(dailyPrice);
            break;
          case 'monthly':
            clientsArr.push(monthlyPrice);
            break;
          case 'yearly':
            clientsArr.push(yearlyPrice);
            break;
          default:
            clientsArr.push(0);
        }
      */
        clientsArr.push(validUsersArr[x].packagePrice);
      }
    }

    return clientsArr.length ? clientsArr.reduce((a, b) => a + b) : 0;
    // basket (TODO) + shop(TODO)
  };

  const handleTotalTurnover = () => {
    const clientsTotalArr = [];

    if (handleClientsVar.length) {
      for (let y = 0; y < handleClientsVar.length; y++) {
        clientsTotalArr.push(handleClientsVar[y].packagePrice);
      }
    }

    return clientsTotalArr.length ? clientsTotalArr.reduce((a, b) => a + b) : 0;
  };

  const options = [
    { label: 'prva smena', value: 1 },
    { label: 'druga smena', value: 2 },
    { label: 'treca smena', value: 3 },
  ];

  const handleShiftNumber = (nmb) => {
    handleShiftDuration(nmb);
    return setShiftNumber(nmb);
  };
  const handleShiftDuration = (nmb) => {
    if (Number(nmb) === 1) {
      return setShiftDuration(firstShift ? firstShift[1] : null);
    }
    if (Number(nmb) === 2) {
      return setShiftDuration(secondShift ? secondShift[2] : null);
    }
    if (Number(nmb) === 3) {
      return setShiftDuration(thirdShift ? thirdShift[3] : null);
    }
  };
  const handleStaffName = (name) => {
    // TODO sa sistemom za osoblje
    return setStaffName(name);
  };

  function submitEndShiftData() {
    dispatch(getLastShift(userId));

    const shiftIsClosed = lastShiftNumber < +shiftNumber;

    if (!shiftIsClosed) {
      return toast.error(
        `Neispravan unos. Smena (${lastShiftNumber}) je već zatvorena.`
      );
    }

    console.log('handleTotalTurnover: ', handleTotalTurnover());

    dispatch(
      setEndShiftNotificationModal({
        date: new Date(),
        shiftNumber,
        shiftRange: shiftDuration,
        staff: staffName,
        addedUsers: validUsers(),
        turnover: handleTurnover(),
        totalTurnover: handleTotalTurnover(),
      })
    );
    dispatch(
      closeShift({
        userId,
        endShift,
        shiftNumber,
        shiftDuration,
        staffName,
        turnover: handleTurnover(),
        totalTurnover: handleTotalTurnover(),
      })
    ).then((res) => {
      if (res.error?.message) {
        toast.error(res.error.message + ': ' + res.payload);
      } else {
        toast.success('Smena uspešno završena');
        // zatvori modal > dispatch()
        // posalji parametar da su podaci poslati i da se otvori notification modal
        dispatch(resetShift());
        dispatch(setShowEndShiftNotificationModal(true));
      }
    });
  }
  return (
    <div>
      <Title>
        <h2>
          Ukoliko želiš da prijaviš završetak svoje smene klikni na dugme{' '}
          <b>Završi Smenu</b>.
          <br />U suprotnom, klikni na <b>Zatvori</b>
        </h2>
      </Title>
      <Content>
        <Row>
          <p>Ime zadužene osobe: </p>
          <div className='form-group'>
            <Input
              placeholder='Upišite Vaše ime ovde'
              onChange={(e) => handleStaffName(e.target.value)}
            />
          </div>
        </Row>
        <Row>
          <p>Odaberite broj smene iz liste koja se završila:</p>
          <div className='form-group'>
            <Dropdown
              value={shiftNumber}
              options={options}
              onChange={(e) => handleShiftNumber(e.target.value)}
            />
          </div>
        </Row>
      </Content>
      <ButtonsContainer>
        <Button onClick={() => submitEndShiftData()} className='btn btn-block'>
          Završi Smenu
        </Button>
        <Button className='btn btn-block'>Zatvori</Button>
      </ButtonsContainer>
    </div>
  );
};

export default EndShiftForm;
