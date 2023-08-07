import React from 'react';
import { FaQuestion } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPasswordForm = ({ onSubmit, email, onChange }) => {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaQuestion /> Forgot Password?
        </h1>
        <p>Enter your email</p>
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
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
        <div className='bottom-link'>
          <Link to='/login'>Back to login</Link>
        </div>
      </section>
    </>
  );
};

export default ForgotPasswordForm;
