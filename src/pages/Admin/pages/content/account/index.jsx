import React from 'react';
import styled from 'styled-components';
import Passwords from './components/passwords';

const AccountWrapper = styled.div`
  padding-bottom: 30px;
`;

const Account = () => {
  return (
    <AccountWrapper>
      <div>ACCOUNT</div>
      <Passwords />
    </AccountWrapper>
  );
};

export default Account;
