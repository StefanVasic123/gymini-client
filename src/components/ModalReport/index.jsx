import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px 10%;
`;

const ModalReport = ({ data }) => {
  return <Container>Ukupno novca u kasi: {data}rsd</Container>;
};

export default ModalReport;
