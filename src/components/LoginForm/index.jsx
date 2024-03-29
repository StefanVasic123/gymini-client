import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, email, onChange, password }) => {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start. . .</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
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
          <Link to='/forgot-password'>Forgot password?</Link>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
