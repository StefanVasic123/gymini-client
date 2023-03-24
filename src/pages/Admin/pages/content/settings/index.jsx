import React from 'react';
import styled from 'styled-components';
import PackagePrice from './components/packages/PackagePrice';
import Shifts from './components/shifts';

const Section = styled.div`
  margin-bottom: 5%;
`;

const Settings = () => {
  return (
    <div>
      <div>SETTINGS</div>
      <Section>
        <Shifts />
      </Section>
      <Section>
        <PackagePrice />
      </Section>
    </div>
  );
};

export default Settings;
