import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getClientsByYear } from '../../../../../../../../features/clients/clientSlice';
import { setShowReportsModal } from '../../../../../../../../features/modals/modalSlice';
import { setShowYearReportModal } from '../../../../../../../../features/reports/reportSlice';
import { setYearPackageReport } from '../../../../../../../../features/reports/reportSlice';

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
  width: 110%;
`;

const SubmitContainer = styled.div`
  margin-left: 10%;
`;

const ShiftsReportsYear = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [selectedYear, setSelectedYear] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedYear) {
      dispatch(
        getClientsByYear({
          userId: user._id,
          year: selectedYear,
        })
      ).then((data) =>
        dispatch(
          setYearPackageReport(
            data.payload
              .filter((data) => data.packagePrice)
              .map((obj) => obj.packagePrice)
              .reduce((a, b) => a + b)
          )
        )
      );
      dispatch(setShowYearReportModal(true));
      dispatch(setShowReportsModal(true));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputColumn>
          <TextContent>Odaberite godinu:</TextContent>
          <Input
            type='number'
            id='year'
            name='year'
            value={selectedYear}
            onChange={handleYearChange}
          />
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

export default ShiftsReportsYear;
