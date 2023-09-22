import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteClient } from '../../features/clients/clientSlice';
import { ConvertingService } from '../../services/ConvertingService';
import EditUserForm from '../Forms/EditUserForm';

import ConfirmationModal from '../ConfirmationModal';
import * as Pos from '../ConfirmationModal';
import {
  setShowDeleteClientModal,
  setShowUpdateClientModal,
} from '../../features/modals/modalSlice';
import { resetUpdateUserForm } from '../../features/forms/updateUserSlice';
import { toast } from 'react-toastify';
import { TablePagination } from '@mui/material';

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

const Table = ({
  activeClients,
  inactiveClients,
  sortVal,
  handleSetPage,
  page,
}) => {
  const [client, setClient] = useState({});
  const [clientId, setClientId] = useState('');
  const [searchAll, setSearchAll] = useState(false);
  const [deleteName, setDeleteName] = useState('');
  const [deleteLastName, setDeleteLastName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();
  let { showUpdateClientModal, showDeleteClientModal } = useSelector(
    (state) => state.modals
  );

  const clients = sortVal === 'active' ? activeClients : inactiveClients;

  function handleClick(clientData, e) {
    if (e.target.innerHTML !== 'x') {
      dispatch(setShowUpdateClientModal(true));
      setClient(clientData);
    }
    if (e.target.innerHTML === 'x') {
      setClientId(clientData._id);
    }
  }

  function hideModal() {
    //  setShow(false);
    dispatch(setShowUpdateClientModal(false));
  }

  function handleDeleteModal(open) {
    open
      ? dispatch(setShowDeleteClientModal(true))
      : dispatch(setShowDeleteClientModal(false));
  }

  function handleDelete() {
    dispatch(deleteClient(clientId))
      .then(() => {
        toast.success('Klijent uspešno obrisan!');
      })
      .catch(() => {
        toast.error(
          'Nešto nije u redu, klijent nije izbrisan! Proverite internet konekciju ili pokušajte kasnije'
        );
      });
    dispatch(setShowDeleteClientModal(false));
  }

  function handleCloseModal() {
    dispatch(resetUpdateUserForm());
  }

  function handleChangePage(event, newPage) {
    handleSetPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>br</th>
            <th>Ime</th>
            <th>Prezime</th>
            {searchAll && <th>Status</th>}
            <th>dana ostalo</th>
            <th>Kraj</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, key) => {
            let day = new Date(client.endDate).getDate();
            let month = ConvertingService.monthsConverter(
              new Date(client.endDate).getMonth()
            );
            let endMilliseconds = new Date(client.endDate).getTime();
            let daysLeft = ((endMilliseconds - Date.now()) / 86400000).toFixed(
              0
            );
            const daysLeftRound = daysLeft === '-0' ? '0' : daysLeft;

            function colorChange() {
              if (Number(daysLeftRound) <= 0) {
                return 'red';
              } else if (Number(daysLeftRound) === 1) {
                return 'orange';
              } else if (Number(daysLeftRound) === 2) {
                return 'yellow';
              }
            }

            return (
              <tr
                onClick={(e) => handleClick(client, e)}
                style={{
                  backgroundColor: colorChange(),
                }}
              >
                <td>{key}</td>
                <td>{client.name}</td>
                <td>{client.lastName}</td>
                {searchAll && (
                  <td>{client.active ? 'AKTIVAN' : 'NIJE AKTIVAN'}</td>
                )}
                <td>{daysLeftRound}</td>
                <td>
                  {day} {month}
                </td>
                <td
                  onClick={() => {
                    handleDeleteModal(true);
                    setDeleteName(client.name);
                    setDeleteLastName(client.lastName);
                  }}
                >
                  x
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <TablePagination
        component='div'
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ConfirmationModal
        show={showUpdateClientModal}
        headerText='Podaci korisnika'
        handleClose={hideModal}
        openPos={Pos.CM_TOP_CENTER}
        containerWidth='50%'
        showButtons={false}
        closeBtn={true}
        handleCloseModal={handleCloseModal}
      >
        <EditUserForm client={client} />
      </ConfirmationModal>
      <ConfirmationModal
        show={showDeleteClientModal}
        headerText={'Brisanje korisnika'}
        handleClose={() => handleDeleteModal(false)}
        containerWidth='30%'
        showButtons={true}
        closeBtn={true}
        handleCloseModal={() => handleDeleteModal(false)}
        modalName={'deleteClient'}
        confirmationFunc={handleDelete}
      >
        <h5>
          Da li ste sigurni da želite da obrišete korisnika {deleteName}{' '}
          {deleteLastName}?
        </h5>
      </ConfirmationModal>
    </div>
  );
};

export default Table;
