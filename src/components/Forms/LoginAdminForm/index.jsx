import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const LoginAdminForm = ({ onSubmit, onChange, adminPassword }) => {
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
      </section>
    </>
  );
};

export default LoginAdminForm;
