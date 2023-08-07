import React from 'react';
import { FaRedoAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResetPasswordForm = ({
  onSubmit,
  onChange,
  password,
  passwordConfirm,
  admin,
}) => {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaRedoAlt /> Reset {admin && 'Admin'} Password
        </h1>
        <p>Enter and confirm new password</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password-reset'
              name='password'
              value={password}
              placeholder='Enter your new password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password-reset-confirm'
              name='passwordConfirm'
              value={passwordConfirm}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
        {admin ? (
          <div className='bottom-link'>
            <Link to='/'>Back to home page</Link>
          </div>
        ) : (
          <div className='bottom-link'>
            <Link to='/login'>Back to login</Link>
          </div>
        )}
      </section>
    </>
  );
};

export default ResetPasswordForm;
