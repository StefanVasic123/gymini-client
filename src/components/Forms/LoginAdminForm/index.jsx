import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { forgotAdminPassword } from '../../../features/auth/authSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const StyledButton = styled.p`
  text-decoration: underline;
  font-size: 45%;
  cursor: pointer;
`;

const LoginAdminForm = ({ onSubmit, onChange, adminPassword, user }) => {
  const dispatch = useDispatch();

  const handleResetAdminPassword = () => {
    dispatch(forgotAdminPassword({ email: user.email }))
      .then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message + ': ' + res.payload);
        } else {
          toast.success('Link za promenu admin šifre poslat na email.');
        }
      })
      .catch((err) => {
        toast.error('Greška, pokušajte ponovo!');
      });
  };
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Admin Login
        </h1>
        <p>Login as admin</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='adminPassword'
              name='adminPassword'
              value={adminPassword}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
        <div className='bottom-link'>
          <StyledButton onClick={handleResetAdminPassword}>
            Reset admin password
          </StyledButton>
        </div>
      </section>
    </>
  );
};

export default LoginAdminForm;
