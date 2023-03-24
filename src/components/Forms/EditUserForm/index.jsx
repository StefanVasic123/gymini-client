import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateClient } from '../../../features/clients/clientSlice';
import { setShowUpdateClientModal } from '../../../features/modals/modalSlice';
import { ConvertingService } from '../../../services/ConvertingService';
import {
  updateFormData,
  resetUpdateUserForm,
} from '../../../features/forms/updateUserSlice';
import Dropdown from '../../Dropdown';
import { addDays, addMonths, addYears } from '../../../services/DateService';

const FormGroup = styled.div`
  font-size: 0.5em;
  width: 100%;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
`;

const Column = styled.div`
  width: 100%;
`;

const EditUserForm = ({ client }) => {
  const [program, setProgram] = useState('dnevna');

  const stateSelector = useSelector((state) => state.updateUserFormData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('mounted');
    //  setName({ value: '', edited: false });
  });

  let {
    name: clientName,
    lastName: clientLastName,
    email: clientEmail,
    phone: clientPhone,
    startDate: clientStartDate,
    endDate: clientEndDate,
    _id: clientId,
  } = client;

  let {
    name: nameState,
    lastName: lastNameState,
    email: emailState,
    phone: phoneState,
    startDate: startDateState,
    endDate: endDateState,
  } = stateSelector;

  const formattedStartDate = `${new Date(
    clientStartDate
  ).getDate()} ${ConvertingService.monthsConverter(
    new Date(clientStartDate).getMonth()
  )}`;

  const formattedEndDate = `${new Date(
    clientEndDate
  ).getDate()} ${ConvertingService.monthsConverter(
    new Date(clientEndDate).getMonth()
  )}`;

  const options = [
    { label: 'dnevna', value: 'dnevna' },
    { label: 'mesečna', value: 'mesečna' },
    { label: 'godišnja', value: 'godišnja' },
  ];

  function packageConverter(select) {
    switch (select.target.value) {
      case 'dnevna':
        dispatch(
          updateFormData({
            type: 'endDate',
            value: addDays(1, clientEndDate),
            edited: true,
          })
        );
        setProgram('dnevna');
        break;
      case 'mesečna':
        dispatch(
          updateFormData({
            type: 'endDate',
            value: addMonths(1, clientEndDate),
            edited: true,
          })
        );
        setProgram('mesečna');
        break;
      case 'godišnja':
        dispatch(
          updateFormData({
            type: 'endDate',
            value: addYears(1, clientEndDate),
            edited: true,
          })
        );
        setProgram('godišnja');
        break;
      default:
        return;
    }
  }

  function handleChange(e) {
    switch (e.target.name) {
      case 'name':
        dispatch(
          updateFormData({
            type: 'name',
            value: e.target.value,
            edited: true,
          })
        );
        break;
      case 'lastName':
        dispatch(
          updateFormData({
            type: 'lastName',
            value: e.target.value,
            edited: true,
          })
        );
        break;
      case 'email':
        dispatch(
          updateFormData({
            type: 'email',
            value: e.target.value,
            edited: true,
          })
        );
        break;
      case 'phone':
        dispatch(
          updateFormData({
            type: 'phone',
            value: e.target.value,
            edited: true,
          })
        );
        break;
      default:
        return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateClient({
        id: clientId,
        name: nameState?.edited ? nameState.value : clientName,
        lastName: lastNameState?.edited ? lastNameState.value : clientLastName,
        email: emailState?.edited ? emailState.value : clientEmail,
        phone: phoneState?.edited ? phoneState.value : clientPhone,
        startDate: startDateState?.edited
          ? startDateState.value
          : clientStartDate,
        endDate: endDateState?.edited ? endDateState.value : clientEndDate,
      })
    )
      .then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message + ': ' + res.payload);
        } else {
          toast.success('Podaci klijenta uspešno izmenjeni!');
          dispatch(setShowUpdateClientModal(false));
          dispatch(resetUpdateUserForm());
        }
      })
      .catch((err) => console.log(err));
  };

  function handleClose() {
    // close modal
    dispatch(setShowUpdateClientModal(false));
    // reset state
    dispatch(resetUpdateUserForm());
  }

  return (
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <RowWrapper>
          <Column>
            <FormGroup className='form-group'>
              <label htmlFor='name'>Ime</label>
              <input
                type='text'
                name='name'
                id='name'
                value={nameState?.edited ? nameState.value : clientName}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                value={emailState?.edited ? emailState.value : clientEmail}
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
                value={
                  lastNameState?.edited ? lastNameState.value : clientLastName
                }
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup className='form-group'>
              <label htmlFor='phone'>Telefon</label>
              <input
                type='number'
                name='phone'
                id='phone'
                value={phoneState?.edited ? phoneState.value : clientPhone}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
          </Column>
        </RowWrapper>
        <RowWrapper>
          <FormGroup className='form-group'>
            <label htmlFor='phone'>Početak</label>
            <input
              type='text'
              name='startDate'
              id='startDate'
              value={formattedStartDate}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
          <FormGroup className='form-group'>
            <label htmlFor='phone'>Datum isteka članarine</label>
            <input
              type='text'
              name='endDate'
              id='endDate'
              value={formattedEndDate}
              onChange={(e) => handleChange(e)}
            />
          </FormGroup>
        </RowWrapper>
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
        {/* render first if program value is false */}
        <FormGroup className='form-group'>
          <Dropdown
            label='Produži članarinu'
            value={program}
            options={options}
            onChange={packageConverter}
          />
        </FormGroup>
        <FormGroup className='form-group'>
          <button className='btn btn-block' type='submit'>
            Sačuvaj izmene
          </button>
        </FormGroup>
      </form>
      <FormGroup className='form-group'>
        <button className='btn btn-block' onClick={handleClose}>
          Zatvori
        </button>
      </FormGroup>
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
};

export default EditUserForm;
