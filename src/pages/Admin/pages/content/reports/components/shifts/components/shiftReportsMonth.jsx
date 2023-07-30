import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getClientsByMonth } from '../../../../../../../../features/clients/clientSlice';
import { setShowReportsModal } from '../../../../../../../../features/modals/modalSlice';
import { setShowMonthReportModal } from '../../../../../../../../features/reports/reportSlice';
import { setMonthPackageReport } from '../../../../../../../../features/reports/reportSlice';

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
  margin-left: 5%;
`;

const ShiftsReportsMonth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const [year, month] = selectedValue.split('-');

    if (selectedValue) {
      dispatch(
        getClientsByMonth({
          userId: user._id,
          month,
          year,
        })
      ).then((data) =>
        dispatch(
          setMonthPackageReport(
            data.payload
              .filter((data) => data.packagePrice)
              .map((obj) => obj.packagePrice)
              .reduce((a, b) => a + b)
          )
        )
      );
      dispatch(setShowMonthReportModal(true));
      dispatch(setShowReportsModal(true));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputColumn>
          <TextContent>Odaberite mesec:</TextContent>
          <Input
            type='month'
            id='month'
            name='month'
            value={selectedValue}
            onChange={handleValueChange}
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

export default ShiftsReportsMonth;
