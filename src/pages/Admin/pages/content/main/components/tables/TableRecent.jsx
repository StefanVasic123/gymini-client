import React from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  > thead tr {
    background-color: #000;
    color: white;
  }
  > tbody td {
    padding: 0.7% 0;
  }
  > tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  > tbody tr:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`;

const TableRecent = () => {
  return (
    <div>
      <StyledTable>
        <thead className='table-head'>
          <th className='th-item'>Ime</th>
          <th className='th-item'>Paket</th>
          <th className='th-item'>Datum unosa</th>
          <th className='th-item'>Datum isteka</th>
        </thead>
        <tbody className='table-body'>
          <tr className='table-body-tr'>
            <td className='table-body-td'>NAME LAST NAME</td>
            <td className='table-body-td'>MESECNI</td>
            <td className='table-body-td'>16.jun</td>
            <td className='table-body-td'>16.jul</td>
          </tr>
          <tr className='table-body-tr'>
            <td className='table-body-td'>NAME LAST NAME</td>
            <td className='table-body-td'>MESECNI</td>
            <td className='table-body-td'>16.jun</td>
            <td className='table-body-td'>16.jul</td>
          </tr>
          <tr className='table-body-tr'>
            <td className='table-body-td'>NAME LAST NAME</td>
            <td className='table-body-td'>MESECNI</td>
            <td className='table-body-td'>16.jun</td>
            <td className='table-body-td'>16.jul</td>
          </tr>
          <tr className='table-body-tr'>
            <td className='table-body-td'>NAME LAST NAME</td>
            <td className='table-body-td'>MESECNI</td>
            <td className='table-body-td'>16.jun</td>
            <td className='table-body-td'>16.jul</td>
          </tr>
        </tbody>
      </StyledTable>
    </div>
  );
};

export default TableRecent;
