import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  deleteShift,
  getShiftsByDate,
} from '../../../../../../../../features/shifts/shiftSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20%;
  border: 1px solid grey;
  border-radius: 10px;
  align-items: center;
  padding: 5% 0;
`;

const ContainerHeader = styled.div``;

const ContainerHead = styled.h3``;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
`;

const ShiftsList = styled.div`
  margin-bottom: 5%;
`;

const Input = styled.input`
  margin: 0 2%;
`;

const SubmitContainer = styled.div``;

const TextContent = styled.p`
  font-size: 80%;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
  font-size: 10px;
  border: 1px solid black;
  cursor: ${(props) => props.closeColumn && 'pointer'};
`;

const Tr = styled.tr`
  border-bottom: 1px solid black;
`;

const Th = styled.th`
  border: 1px solid black;
  font-size: 12px;
  padding: 0 5px;
`;

const user = JSON.parse(localStorage.getItem('user'));

const ShiftRemover = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [shiftsList, setShiftsList] = useState([]);

  const dispatch = useDispatch();

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
    dispatch(
      getShiftsByDate({ userId: user._id, startDate: event.target.value })
    ).then((res) => setShiftsList(res.payload));
  }

  function handleRemoveClosedShift(shift) {
    dispatch(deleteShift(shift._id));
    setShiftsList([]);
    setSelectedDate(null);
  }

  return (
    <Container>
      <ContainerHeader>
        <ContainerHead>Obriši zapis o zatvorenoj smeni</ContainerHead>
      </ContainerHeader>
      <InputsContainer>
        <TextContent>Odaberite datum:</TextContent>
        <Input
          key={selectedDate}
          type='date'
          id='date'
          onChange={handleDateChange}
          value={selectedDate}
        />
      </InputsContainer>
      {typeof shiftsList !== 'string' && shiftsList.length ? (
        <ShiftsList>
          <thead>
            <Tr>
              <Th>zaposleni</Th>
              <Th>smena</Th>
              <Th>trajanje</Th>
              <Th>zatvorena</Th>
              <Th>pazar</Th>
              <Th>obriši</Th>
            </Tr>
          </thead>
          <Tbody>
            {shiftsList.map((shift) => {
              return (
                <Tr>
                  <Td>{shift.staffName}</Td>
                  <Td>{shift.shiftNumber}</Td>
                  <Td>
                    {shift.shiftDuration[0]}-{shift.shiftDuration[1]}
                  </Td>
                  <Td>
                    {new Date(shift.createdAt).getHours()}:
                    {new Date(shift.createdAt).getMinutes()}
                  </Td>
                  <Td>{shift.turnover}</Td>
                  <Td
                    closeColumn={true}
                    onClick={() => handleRemoveClosedShift(shift)}
                  >
                    x
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </ShiftsList>
      ) : null}
      <SubmitContainer>
        <button className='btn'>Zapamti</button>
      </SubmitContainer>
    </Container>
  );
};

export default ShiftRemover;
