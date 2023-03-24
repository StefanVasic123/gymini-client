import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getClientsByDate } from '../../../../../../../../features/clients/clientSlice';
import { setShowReportsModal } from '../../../../../../../../features/modals/modalSlice';
import {
  setDatePackageReport,
  setShowDateReportModal,
} from '../../../../../../../../features/reports/reportSlice';
const user = JSON.parse(localStorage.getItem('user'));

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
  align-items: center;
`;

const TextContent = styled.p`
  font-size: 80%;
`;

const Input = styled.input`
  padding: 5%;
  width: 120%;
`;

const SubmitContainer = styled.div``;

const ShiftsReportsDate = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedDate) {
      dispatch(
        getClientsByDate({
          userId: user,
          startDate: selectedDate,
        })
      ).then((data) =>
        dispatch(
          setDatePackageReport(
            data.payload
              .filter((data) => data.packagePrice)
              .reduce((a, b) => a.packagePrice + b.packagePrice)
          )
        )
      );
      dispatch(setShowDateReportModal(true));
      dispatch(setShowReportsModal(true));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputColumn>
          <TextContent>Odaberite datum:</TextContent>
          <Input type='date' id='date' onChange={handleDateChange} />
        </InputColumn>
        <SubmitContainer>
          <button className='btn' type='submit'>
            Vidi izveštaj
          </button>
        </SubmitContainer>
      </form>
    </div>
  );
};

export default ShiftsReportsDate;
