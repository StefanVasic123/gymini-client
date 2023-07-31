import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setShiftSettings } from '../../../../../../../../features/admin/setttings/shiftSettings/shiftSettingsSlice';
import { useEffect } from 'react';

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

const InputRow = styled.div`
  display: flex;
  margin-bottom: 2%;
`;

const NumberContainer = styled.div`
  width: 20px;
`;

const Number = styled.p``;

const Input = styled.input`
  margin: 0 2%;
`;

const SubmitContainer = styled.div``;

const ShiftDuration = () => {
  const [firstStart, setFirstStart] = useState(null);
  const [firstEnd, setFirstEnd] = useState(null);
  const [secondStart, setSecondStart] = useState(null);
  const [secondEnd, setSecondEnd] = useState(null);
  const [thirdStart, setThirdStart] = useState(null);
  const [thirdEnd, setThirdEnd] = useState(null);

  let { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  let { firstShift, secondShift, thirdShift } = useSelector(
    (state) => state.shiftSettings
  );

  useEffect(() => {
    // set state values from redux store (db) on initial load
    if (
      Boolean(firstShift || firstShift !== undefined ? firstShift[1][0] : null)
    ) {
      setFirstStart(firstShift[1][0]);
    }
    if (
      Boolean(
        secondShift || secondShift !== undefined ? secondShift[2][0] : null
      )
    ) {
      setSecondStart(secondShift[2][0]);
    }
    if (
      Boolean(thirdShift || thirdShift !== undefined ? thirdShift[3][0] : null)
    ) {
      setThirdStart(thirdShift[3][0]);
    }
    if (Boolean(firstShift ? firstShift[1][1] : null)) {
      setFirstEnd(firstShift[1][1]);
    }
    if (Boolean(secondShift ? secondShift[2][1] : null)) {
      setSecondEnd(secondShift[2][1]);
    }
    if (Boolean(thirdShift ? thirdShift[3][1] : null)) {
      setThirdEnd(thirdShift[3][1]);
    }
  }, []);

  const userId = user._id;

  const dispatch = useDispatch();

  function handleFirstStart(e) {
    if (e.target.value > 24) {
      toast.error('Ne možete uneti broj veći od 24.');
    } else {
      setFirstStart(e.target.value);
    }
  }

  function handleFirstEnd(e) {
    if (e.target.value > 24) {
      toast.error('Ne možete uneti broj veći od 24.');
    } else {
      setFirstEnd(e.target.value);
    }
  }

  function handleSecondStart(e) {
    if (e.target.value > 24) {
      toast.error('Ne možete uneti broj veći od 24.');
    } else {
      setSecondStart(e.target.value);
    }
  }

  function handleSecondEnd(e) {
    if (e.target.value > 24) {
      toast.error('Ne možete uneti broj veći od 24.');
    } else {
      setSecondEnd(e.target.value);
    }
  }

  function handleThirdStart(e) {
    if (e.target.value > 24) {
      toast.error('Ne možete uneti broj veći od 24.');
    } else {
      setThirdStart(e.target.value);
    }
  }

  function handleThirdEnd(e) {
    if (e.target.value > 24) {
      toast.error('Ne možete uneti broj veći od 24.');
    } else {
      setThirdEnd(e.target.value);
    }
  }

  function shiftSubmit() {
    if (
      +firstEnd < +firstStart ||
      +secondEnd < +secondStart ||
      +thirdEnd < +thirdStart ||
      ((+firstStart === null || +firstEnd === null) && +secondStart) ||
      ((+secondStart === null || +secondEnd === null) && +thirdStart) ||
      (+secondStart < +firstEnd && +secondStart !== 0) ||
      (+thirdStart < +secondEnd && +thirdStart !== 0)
    ) {
      toast.error('Greška! Neispravne informacije.');
      return;
    }

    // cannot set second value if there is no first
    const shiftComparation =
      (Boolean(
        +firstStart <
          (+firstEnd || (Boolean(firstShift) ? +firstShift[1][1] : 0))
      ) === true &&
        Boolean(
          +secondStart <
            (+secondEnd || (Boolean(secondShift) ? +secondShift[2][1] : 0))
        ) === true &&
        Boolean(
          +thirdStart <
            (+thirdEnd || (Boolean(thirdShift) ? +thirdShift[3][1] : 0))
        ) === true) ||
      Boolean(+secondStart) ||
      +thirdEnd === 0;

    // if 2nd cannot erase 1st, if 3rd cannot erase 2st
    const shiftEntaglement = () => {
      if (
        (+firstStart === 0 || +firstEnd === 0) &&
        (secondShift || secondStart || secondEnd)
      ) {
        return false;
      }
      if (
        (+secondStart === 0 || +secondEnd === 0) &&
        (thirdShift || thirdStart || thirdEnd)
      ) {
        return false;
      }
      return true;
    };

    // set valid values in fields ! TODO: functionality refactor; set variable with wrong values etc.
    // prettier-ignore
    if (
      (((Boolean(+firstEnd) === true || Boolean(+firstEnd) === 0 || Boolean(+firstShift[1][1]) === true) &&
        Boolean(+firstStart) === true) ||
      ((Boolean(+secondEnd) === true || Boolean(+secondEnd) === 0 || Boolean(+secondShift[2][1]) === true) &&
        Boolean(+secondStart) === true) ||
      ((Boolean(+thirdEnd) === true || Boolean(+thirdEnd) === 0 || Boolean(+thirdShift[3][1]) === true) &&
        Boolean(+thirdStart) === true)) &&
        Boolean(shiftComparation) === true &&
        shiftEntaglement()
    ) {
      dispatch(
        setShiftSettings({
          userId,
          firstShift: +firstStart ? {
            1: [firstStart || firstShift[1][0], firstEnd || firstShift[1][1]],
          } : null,
          secondShift: +secondStart ? {
            2: [
              secondStart || secondShift[2][0],
              secondEnd || secondShift[2][1],
            ],
          } : null,
          thirdShift: +thirdStart ? {
            3: [thirdStart || thirdShift[3][0], thirdEnd || thirdShift[3][1]],
          } : null,
        })
      )
        .then((res) => {
          if (res.error?.message) {
            toast.error(res.error.message + ': ' + res.payload);
          } else {
            toast.success('Smena uspešno dodata!');
            window.location.reload();
          }
        })
        .catch((err) => {
          toast.error('Greška, pokušajte ponovo!');
        });
    } else {
      toast.error('Neispravan unos.');
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <ContainerHead>Odredite duzinu trajanja smena</ContainerHead>
      </ContainerHeader>
      <InputsContainer>
        <InputRow>
          <NumberContainer>
            <Number>1</Number>
          </NumberContainer>
          <Input
            type='number'
            min='1'
            max='24'
            placeholder={`${Boolean(firstStart) ? firstStart : '1 - 24'}`}
            value={`${Boolean(firstStart) ? firstStart : ''}`}
            onChange={(e) => handleFirstStart(e)}
          />
          <Input
            type='number'
            min='1'
            max='24'
            placeholder={`${Boolean(firstEnd) ? firstEnd : '1 - 24'}`}
            value={`${Boolean(firstEnd) ? firstEnd : ''}`}
            onChange={(e) => handleFirstEnd(e)}
          />
        </InputRow>
        <InputRow>
          <NumberContainer>
            <Number>2</Number>
          </NumberContainer>
          <Input
            type='number'
            min='1'
            max='24'
            placeholder={`${Boolean(secondStart) ? secondStart : '1 - 24'}`}
            value={`${Boolean(secondStart) ? secondStart : ''}`}
            onChange={(e) => handleSecondStart(e)}
          />
          <Input
            type='number'
            min='1'
            max='24'
            placeholder={`${Boolean(secondEnd) ? secondEnd : '1 - 24'}`}
            value={`${Boolean(secondEnd) ? secondEnd : ''}`}
            onChange={(e) => handleSecondEnd(e)}
          />
        </InputRow>
        <InputRow>
          <NumberContainer>
            <Number>3</Number>
          </NumberContainer>
          <Input
            type='number'
            min='1'
            max='24'
            placeholder={`${Boolean(thirdStart) ? thirdStart : '1 - 24'}`}
            value={`${Boolean(thirdStart) ? thirdStart : ''}`}
            onChange={(e) => handleThirdStart(e)}
          />
          <Input
            type='number'
            min='1'
            max='24'
            placeholder={`${Boolean(thirdEnd) ? thirdEnd : '1 - 24'}`}
            value={`${Boolean(thirdEnd) ? thirdEnd : ''}`}
            onChange={(e) => handleThirdEnd(e)}
          />
        </InputRow>
      </InputsContainer>
      <SubmitContainer>
        <button className='btn' onClick={shiftSubmit}>
          Zapamti
        </button>
      </SubmitContainer>
    </Container>
  );
};

export default ShiftDuration;
