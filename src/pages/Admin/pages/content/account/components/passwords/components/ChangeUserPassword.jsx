import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changeUserPassword } from '../../../../../../../../features/auth/authSlice';

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

const ChangeUserPassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPasssword] = useState();
  let { user, isLoading, isError, message } = useSelector(
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
    setNewPasssword(e.target.value);
  }

  function handleUserPasswordChange() {
    const userData = { oldPassword, newPassword, email };
    dispatch(changeUserPassword(userData))
      .then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message + ': ' + res.payload);
        } else {
          toast.success('Šifra korisnika uspešno promenjena.');
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
          <ContainerHead>Izmeni šifru za ulazak u aplikaciju</ContainerHead>
        </ContainerHeader>
        <InputsContainer>
          <InputColumn>
            <TextContent>Upišite staru šifru</TextContent>
            <Input
              type='text'
              placeholder={'Stara šifra'}
              onChange={(e) => handleOldPassword(e)}
            />
          </InputColumn>
          <InputColumn>
            <TextContent>Upišite novu šifru</TextContent>
            <Input
              type='text'
              placeholder={'Nova šifra'}
              onChange={(e) => handleNewPassword(e)}
            />
          </InputColumn>
        </InputsContainer>
        <SubmitContainer>
          <button className='btn' onClick={handleUserPasswordChange}>
            Zapamti
          </button>
        </SubmitContainer>
      </Container>
    </Main>
  );
};

export default ChangeUserPassword;
