import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  CM_CENTER_CENTER,
  CM_TOP_CENTER,
  CM_TOP_LEFT,
  CM_TOP_RIGHT,
} from './index';
import {
  setShowAddClientModal,
  setShowUpdateClientModal,
  setShowDeleteClientModal,
  setShowEndShiftModal,
  setShowEndShiftNotificationModal,
  setShowReportsModal,
} from '../../features/modals/modalSlice';
import { resetUpdateUserForm } from '../../features/forms/updateUserSlice';
import { resetAddUserForm } from '../../features/forms/addUserSlice';
import closebutton from '../../img/closebutton.png';
import {
  setShowDateReportModal,
  setShowMonthReportModal,
  setShowYearReportModal,
  setDatePackageReport,
  setMonthPackageReport,
  setYearPackageReport,
} from '../../features/reports/reportSlice';

// Modal background layer - visible or invisible, but always floating above client's elements
const Model = styled.div`
  z-index: 100;
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 150vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  padding-top: 2%;
`;

// Rendered popup - a positional demo confirmation box
const Container = styled.div`
  position: fixed;
  background: white;
  width: ${({ containerWidth }) => (containerWidth ? containerWidth : '33%')};
  height: auto;
  padding-top: 2%;
  padding-bottom: 2%;

  top: ${({ openPos }) =>
    ({
      [CM_CENTER_CENTER]: '50%',
      [CM_TOP_LEFT]: '10%',
      [CM_TOP_CENTER]: '10%',
      [CM_TOP_RIGHT]: '10%',
    }[openPos])};

  left: ${({ openPos }) =>
    ({
      [CM_CENTER_CENTER]: '50%',
      [CM_TOP_LEFT]: '5%',
      [CM_TOP_CENTER]: '50%',
      [CM_TOP_RIGHT]: '95%',
    }[openPos])};

  transform: ${({ openPos }) =>
    ({
      [CM_CENTER_CENTER]: 'translate(-50%,-50%)',
      [CM_TOP_LEFT]: 'translate(0,0)',
      [CM_TOP_CENTER]: 'translate(-50%,0)',
      [CM_TOP_RIGHT]: 'translate(-100%,0)',
    }[openPos])};
  border-radius: 10px;
  color: black;
`;

const Button = styled.button`
  background-color: ${({ primary }) => (primary ? 'black' : 'red')};
  color: ${({ primary }) => (primary ? 'white' : 'white')};
  border: solid 2px #9f7500;
  border-radius: 8px;
  width: 5rem;
  padding: 0.2rem;
  margin: 0.2rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Header = styled.div`
  font-size: 1.4rem;
  color: black;
`;

const HBar = styled.div`
  width: 100%;
  height: 1px;
  border: solid 1px black;
  background-color: rgba(80, 80, 150, 0.4);
`;

const ButtonBar = styled.div`
  display: ${({ showButtons }) => (showButtons ? 'flex' : 'none')};
  flex-direction: row;
  flex: 1 0 auto;
  justify-content: flex-end;
`;

const Slot = styled.div`
  font-size: 1.6rem;
  color: inherit;
`;

const CloseButton = styled.div`
  text-align: right;
  padding-right: 5%;
`;

export default function ConfirmationModalImpl(props) {
  const {
    handleClose, // renderProp fn returns true or false
    show, // boolean - visible/invisible
    headerText, // text
    detailText, // html / inner text
    openPos, // symbol for placement
    containerWidth,
    showButtons,
    closeBtn,
    modalName,
    confirmationFunc,
  } = { ...props };

  const dispatch = useDispatch();

  /* 
  For now we will use confirmationFunc send as props when using two default buttons 
  const sendYes = () => {
    handleClose(true);
  };
  */

  const sendNo = () => handleClose(false);

  const handleCloseModal = () => {
    dispatch(setShowAddClientModal(false));
    dispatch(setShowUpdateClientModal(false));
    dispatch(setShowDeleteClientModal(false));
    dispatch(setShowEndShiftModal(false));
    dispatch(resetUpdateUserForm());
    dispatch(resetAddUserForm());
    dispatch(setShowEndShiftNotificationModal(false));
    dispatch(setShowReportsModal(false));
    dispatch(setShowDateReportModal(false));
    dispatch(setShowMonthReportModal(false));
    dispatch(setShowYearReportModal(false));
    dispatch(setDatePackageReport(null));
    dispatch(setMonthPackageReport(null));
    dispatch(setYearPackageReport(null));
  };

  return (
    <Model show={show}>
      <Container openPos={openPos} containerWidth={containerWidth}>
        {closeBtn && (
          <CloseButton>
            <img
              style={{ cursor: 'pointer' }}
              onClick={modalName !== 'endShift' && handleCloseModal}
              src={closebutton}
              width={'5%'}
              height={'5%'}
              alt='Close Button'
            />
          </CloseButton>
        )}
        <Header>{headerText}</Header>
        <HBar />
        <Slot>{detailText}</Slot>
        <ButtonBar showButtons={showButtons}>
          <Button onClick={confirmationFunc} primary={true}>
            Zapamti
          </Button>
          <Button onClick={sendNo} primary={false}>
            Izadji
          </Button>
        </ButtonBar>
      </Container>
    </Model>
  );
}
ConfirmationModalImpl.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  headerText: PropTypes.string.isRequired,
  detailText: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
    .isRequired,
  openPos: PropTypes.symbol.isRequired,
  showButtons: PropTypes.bool.isRequired,
};
