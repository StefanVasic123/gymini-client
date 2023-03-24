import React from 'react';
import styled from 'styled-components';
import ShiftDuration from './components/ShiftDuration';
import ShiftRemover from './components/ShiftRemover';

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div``;

const Head = styled.h1``;

const Shifts = () => {
  return (
    <Main>
      <Header>
        <Head>Smene</Head>
      </Header>
      <ShiftDuration />
      <ShiftRemover />
    </Main>
  );
};

export default Shifts;
