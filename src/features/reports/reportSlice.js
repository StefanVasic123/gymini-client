import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showDateReportModal: false,
  showMonthReportModal: false,
  showYearReportModal: false,
  datePackageReport: null,
  monthPackageReport: null,
  yearPackageReport: null,
};

// show/hide modal
export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setShowDateReportModal(state, action) {
      state.showDateReportModal = action.payload;
    },
    setShowMonthReportModal(state, action) {
      state.showMonthReportModal = action.payload;
    },
    setShowYearReportModal(state, action) {
      state.showYearReportModal = action.payload;
    },
    setDatePackageReport(state, action) {
      state.datePackageReport = action.payload;
    },
    setMonthPackageReport(state, action) {
      state.monthPackageReport = action.payload;
    },
    setYearPackageReport(state, action) {
      state.yearPackageReport = action.payload;
    },
  },
});

export const {
  setShowDateReportModal,
  setShowMonthReportModal,
  setShowYearReportModal,
  setDatePackageReport,
  setMonthPackageReport,
  setYearPackageReport,
} = reportSlice.actions;
export default reportSlice.reducer;
