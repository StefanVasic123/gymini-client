import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ConfirmationModal from '../../../../../../../components/ConfirmationModal';
import ModalReport from '../../../../../../../components/ModalReport';
import ShiftsReportsDate from './components/shiftReportsDate';
import ShiftsReportsMonth from './components/shiftReportsMonth';
import ShiftsReportsYear from './components/shiftReportsYear';
import * as Pos from '../../../../../../../components/ConfirmationModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20%;
  border: 1px solid grey;
  border-radius: 10px;
  align-items: center;
  padding: 5% 0;
`;

const Title = styled.h2`
  text-align: center;
`;

const InputBox = styled.div`
  margin: 5px 0;
`;

const ShiftsReports = () => {
  let { showReportsModal } = useSelector((state) => state.modals);
  // trebam da stavim u redux state koji report mi se trigerovao i na osnovu toga da saljem podatke u modal kroz props
  let {
    showDateReportModal,
    showMonthReportModal,
    showYearReportModal,
    datePackageReport,
    monthPackageReport,
    yearPackageReport,
  } = useSelector((state) => state.reports);

  let reportData = () => {
    if (showDateReportModal) {
      return datePackageReport;
    }
    if (showMonthReportModal) {
      return monthPackageReport;
    }
    if (showYearReportModal) {
      return yearPackageReport;
    }
    return 'Nema podataka za odabrani parametar.';
  };

  return (
    <Container>
      <Title>Novčani izveštaji</Title>
      <InputBox>
        <ShiftsReportsDate />
      </InputBox>
      <InputBox>
        <ShiftsReportsMonth />
      </InputBox>
      <InputBox>
        <ShiftsReportsYear />
      </InputBox>
      <ConfirmationModal
        show={showReportsModal}
        headerText='Izveštaj'
        openPos={Pos.CM_TOP_CENTER}
        containerWidth='50%'
        showButtons={false}
        closeBtn={true}
      >
        {showReportsModal && <ModalReport data={reportData()} />}
      </ConfirmationModal>
    </Container>
  );
};

export default ShiftsReports;
