import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import AddClientForm from '../../../components/Forms/AddClientForm';
import {
  getClients,
  resetClients,
} from '../../../features/clients/clientSlice';
import { setShowEndShiftModal } from '../../../features/modals/modalSlice';
import { getShiftSettings } from '../../../features/admin/setttings/shiftSettings/shiftSettingsSlice';
import { getPackagePrices } from '../../../features/admin/setttings/packages/packageSlice';
import Spinner from '../../../components/Spinner';
import Table from '../../../components/Table';
import ConfirmationModal from '../../../components/ConfirmationModal';
import * as Pos from '../../../components/ConfirmationModal';
import { logout } from '../../../features/auth/authSlice';
import Sort from '../../../components/Sort';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import Search from '../../../components/Search';
import { filterData } from '../../../services/FilterService';
import EndShiftForm from '../../../components/Forms/EndShiftForm';
import ModificationModal from '../../../components/ModalNotification';
import { BsAlignEnd } from 'react-icons/bs';

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const LeftBox = styled.div``;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

function Dashboard() {
  const [sortVal, setSortVal] = useState('active');
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const client = null;
  const userId = user?._id || null;

  let { clients, isLoading, isError, message } = useSelector(
    (state) => state.clients
  );
  let { showAddClientModal, showEndShiftModal, showEndShiftNotificationModal } =
    useSelector((state) => state.modals);

  // IMPROVEMENT => this logic to be on backend (call only active clients)
  let modifiedClients = [...clients];

  const dataFiltered = filterData(searchQuery, modifiedClients);

  // if active only active if not active all
  dataFiltered.map((client, index) => {
    if (new Date(client.endDate).getTime() + 172800000 > Date.now()) {
      // active
      modifiedClients[index] = {
        ...client,
        active: true,
      };
    } else {
      // not-active
      modifiedClients[index] = {
        ...client,
        not_active: true,
      };
    }
  });

  const menuItems = [
    <MenuItem value={'active'}>Aktivni</MenuItem>,
    <MenuItem value={'not_active'}>Neaktivni</MenuItem>,
  ];

  useEffect(() => {
    dispatch(getClients());
    dispatch(getShiftSettings(userId));
    dispatch(getPackagePrices(userId));

    // do something when component unmount (use return)
    return () => {
      dispatch(resetClients);
    };
  }, [user, navigate, isError, message, dispatch]);

  function hideModal() {
    setShow(false);
  }

  function handleLogout() {
    dispatch(logout());
  }

  function handleSortChange(event) {
    setSortVal(event.target.value);
  }

  function shiftEnd() {
    // vreme
    // kolicina novca
    // baza: user, datum, broj smene, vreme smene, vreme kada se zatvorila smena, ime operatera, broj klijenata u smeni i kolicina novca
    // i onda za report se vuce client id, date, ukupno novca
    // OTVORITI MODAL
    dispatch(setShowEndShiftModal(true));
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className='main-table'>
        {clients.length > 0 ? (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              fullWidth
            >
              <LeftBox>
                <Search
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </LeftBox>
              <RightBox>
                <ButtonContainer onClick={() => shiftEnd()}>
                  <BsAlignEnd /> Kraj Smene
                </ButtonContainer>
                <Sort
                  sx={{
                    width: '150px',
                  }}
                  select
                  labelId='sort-label'
                  id='sort-label'
                  value={sortVal}
                  onChange={handleSortChange}
                  menuItems={menuItems}
                />
              </RightBox>
            </Box>
            <Table clients={modifiedClients} sortVal={sortVal} />
          </>
        ) : user === null && client === null ? (
          <h3>Registruj se ili se prijavi ako već imaš nalog</h3>
        ) : isError ? (
          <>
            <h3>{message}</h3>
            <div>
              <Link
                to='/login'
                onClick={() => handleLogout()}
                style={{ cursor: 'pointer' }}
              >
                Nazad na prijavu
              </Link>
            </div>
          </>
        ) : (
          <h3>Nema klijenata</h3>
        )}
        <ConfirmationModal
          show={showAddClientModal}
          headerText='Dodaj korisnika'
          handleClose={hideModal}
          openPos={Pos.CM_TOP_CENTER}
          containerWidth='50%'
          showButtons={false}
          closeBtn={true}
        >
          <AddClientForm />
        </ConfirmationModal>
        <ConfirmationModal
          show={showEndShiftModal}
          headerText='Smena završena'
          handleClose={hideModal}
          openPos={Pos.CM_TOP_CENTER}
          containerWidth='50%'
          showButtons={false}
          closeBtn={true}
        >
          {showEndShiftNotificationModal ? (
            <ModificationModal />
          ) : (
            <EndShiftForm />
          )}
        </ConfirmationModal>
      </section>
    </>
  );
}

export default Dashboard;
