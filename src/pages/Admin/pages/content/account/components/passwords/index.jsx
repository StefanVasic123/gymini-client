import React from 'react';
import styled from 'styled-components';
import ChangeUserPassword from './components/ChangeUserPassword';
import ChangeAdminPassword from './components/ChangeAdminPassword';

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div``;

const Head = styled.h1``;

const Passwords = () => {
  return (
    <Main>
      <Header>
        <Head>Autentifikacija</Head>
      </Header>
      <ChangeUserPassword />
      <ChangeAdminPassword />
    </Main>
  );
};

export default Passwords;
