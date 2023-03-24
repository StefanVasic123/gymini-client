import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClient } from '../../../features/clients/clientSlice';
import { setShowAddClientModal } from '../../../features/modals/modalSlice';
import {
  setFormData,
  resetAddUserForm,
} from '../../../features/forms/addUserSlice';
import Dropdown from '../../Dropdown';
import { addDays, addMonths, addYears } from '../../../services/DateService';

const FormGroup = styled.div`
  font-size: 0.5em;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  width: 100%;
`;

function AddClientForm() {
  //  let [endDate, setEndDate] = useState(new Date().addDays(1));
  let [program, setProgram] = useState('daily');
  let [dbProgram, setDbProgram] = useState('daily');

  const stateSelector = useSelector((state) => state.addUserFormData);
  const { dailyPrice, monthlyPrice, yearlyPrice } = useSelector(
    (state) => state.packagePrices
  );

  const dispatch = useDispatch();

  const { name, lastName, email, phone, startDate, endDate } = stateSelector;

  const packagePrice = () => {
    switch (dbProgram) {
      case 'daily':
        return dailyPrice;
      case 'monthly':
        return monthlyPrice;
      case 'yearly':
        return yearlyPrice;
      default:
        return dailyPrice;
    }
  };
  /* 
    REFACTOR
    Admin add custom packages
    label: daily, value: daily, duration: addDays(custom); addMonths(custom); addYears(custom)

    WORKFLOW
    admin enter label: 'half month' (automatically daily); duration days => on click => ______ (custom value); months etc.
  */
  const options = [
    { label: 'dnevna', value: 'dnevna' },
    { label: 'mesečna', value: 'mesečna' },
    { label: 'godišnja', value: 'godišnja' },
  ];

  function packageConverter(select) {
    //  setEndDate(select.target.value);
    switch (select.target.value) {
      case 'dnevna':
        setProgram('dnevna');
        setDbProgram('daily');
        dispatch(setFormData({ endDate: addDays(1) }));
        break;
      case 'mesečna':
        setProgram('mesečna');
        setDbProgram('monthly');
        dispatch(setFormData({ endDate: addMonths(1) }));
        break;
      case 'godišnja':
        setProgram('godišnja');
        setDbProgram('yearly');
        dispatch(setFormData({ endDate: addYears(1) }));
        break;
      default:
        return;
    }
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'name':
        dispatch(setFormData({ name: e.target.value }));
        break;
      case 'lastName':
        dispatch(setFormData({ lastName: e.target.value }));
        break;
      case 'email':
        dispatch(setFormData({ email: e.target.value }));
        break;
      case 'phone':
        dispatch(setFormData({ phone: e.target.value }));
        break;
      default:
        return;
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createClient({
        name,
        lastName,
        email,
        phone,
        startDate,
        endDate,
        dbProgram,
        packagePrice: packagePrice(),
      })
    )
      .then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message + ': ' + res.payload);
        } else {
          toast.success('Klijent uspešno dodat!');
          dispatch(setShowAddClientModal(false));
          dispatch(resetAddUserForm());
        }
      })
      .catch((err) => {
        toast.error('Pogrešni podaci!');
      });
  };
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <ColumnWrapper>
          <Column>
            <FormGroup className='form-group'>
              <label htmlFor='name'>Ime</label>
              <input
                type='text'
                name='name'
                id='name'
                value={name}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
          </Column>
          <Column>
            <FormGroup className='form-group'>
              <label htmlFor='lastName'>Prezime</label>
              <input
                type='text'
                name='lastName'
                id='lastName'
                value={lastName}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup className='form-group'>
              <label htmlFor='phone'>Telefon</label>
              <input
                type='number'
                name='phone'
                id='phone'
                value={phone}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
          </Column>
        </ColumnWrapper>
        {/* 
        -- Fix on GYMAPP-9 --
        <FormGroup className='form-group'>
          <label htmlFor='startDate'>Početak</label>
          <input
            type='date'
            name='startDate'
            id='startDate'
            value={startDate}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup> 
        */}
        {/* render first if package value is false */}
        <FormGroup className='form-group'>
          <Dropdown
            label='Clanarina'
            value={program}
            options={options}
            onChange={packageConverter}
          />
        </FormGroup>
        <FormGroup className='form-group'>
          <button className='btn btn-block' type='submit'>
            Add (submit) Client
          </button>
        </FormGroup>
      </form>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </section>
  );
}

export default AddClientForm;
