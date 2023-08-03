import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeAdminPassword } from '../../../../../../../../features/auth/authSlice';

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div``;

const Head = styled.h1``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20%;
  border: 1px solid grey;
  border-radius: 10px;
  align-items: center;
  padding: 5% 0;
`;

const ContainerHeader = styled.div``;

const ContainerHead = styled.h3``;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5% 0;
`;

const InputColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5%;
`;

const TextContent = styled.p`
  font-size: 80%;
`;
const Input = styled.input`
  padding: 5%;
`;

const SubmitContainer = styled.div``;

const ChangeAdminPassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  let { user, admin, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  const email = user.email;

  const dispatch = useDispatch();

  function handleOldPassword(e) {
    e.preventDefault();

    setOldPassword(e.target.value);
  }

  function handleNewPassword(e) {
    e.preventDefault();

    setNewPassword(e.target.value);
  }

  function handleAdminPasswordChange() {
    const data = { oldPassword, newPassword, email };
    dispatch(changeAdminPassword(data))
      .then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message + ': ' + res.payload);
        } else {
          toast.success('Šifra admina uspešno promenjena.');
        }
      })
      .catch((err) => {
        toast.error('Greška, pokušajte ponovo!');
      });
  }

  return (
    <Main>
      <Container>
        <ContainerHeader>
          <ContainerHead>Izmeni šifru za ulazak u admin panel</ContainerHead>
        </ContainerHeader>
        <InputsContainer>
          <InputColumn>
            <TextContent>Upišite staru šifru za administratora</TextContent>
            <Input
              type='text'
              placeholder={'Stara šifra za administratora'}
              onChange={(e) => handleOldPassword(e)}
            />
          </InputColumn>
          <InputColumn>
            <TextContent>Upišite novu šifru za administratora</TextContent>
            <Input
              type='text'
              placeholder={'Nova šifra za administratora'}
              onChange={(e) => handleNewPassword(e)}
            />
          </InputColumn>
        </InputsContainer>
        <SubmitContainer>
          <button className='btn' onClick={handleAdminPasswordChange}>
            Zapamti
          </button>
        </SubmitContainer>
      </Container>
    </Main>
  );
};

export default ChangeAdminPassword;
