import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setPackagePrices } from '../../../../../../../features/admin/setttings/packages/packageSlice';

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

const PackagePrice = () => {
  const [dailyPackagePrice, setDailyPackagePrice] = useState(null);
  const [monthlyPackagePrice, setMonthlyPackagePrice] = useState(null);
  const [yearlyPackagePrice, setYearlyPackagePrice] = useState(null);

  let { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  let { dailyPrice, monthlyPrice, yearlyPrice } = useSelector(
    (state) => state.packagePrices
  );

  // useSelector((state) => console.log(state));

  const userId = user._id;

  const dispatch = useDispatch();

  function handlePackagePrice(e, pack) {
    switch (pack) {
      case 1:
        setDailyPackagePrice(e.target.value);
        break;
      case 2:
        setMonthlyPackagePrice(e.target.value);
        break;
      case 3:
        setYearlyPackagePrice(e.target.value);
        break;
      default:
        return null;
    }
  }

  let dailyPriceReq = () => {
    if (dailyPackagePrice === '') {
      return null;
    } else if (dailyPackagePrice === null && !dailyPrice) {
      return null;
    } else if (dailyPackagePrice) {
      return dailyPackagePrice;
    } else {
      return dailyPrice;
    }
  };

  let monthlyPriceReq = () => {
    if (monthlyPackagePrice === '') {
      return null;
    } else if (monthlyPackagePrice === null && !monthlyPrice) {
      return null;
    } else if (monthlyPackagePrice) {
      return monthlyPackagePrice;
    } else {
      return monthlyPrice;
    }
  };

  let yearlyPriceReq = () => {
    if (yearlyPackagePrice === '') {
      return null;
    } else if (yearlyPackagePrice === null && !yearlyPrice) {
      return null;
    } else if (yearlyPackagePrice) {
      return yearlyPackagePrice;
    } else {
      return yearlyPrice;
    }
  };

  function priceSubmit() {
    dispatch(
      setPackagePrices({
        userId,
        dailyPrice: dailyPriceReq(),
        monthlyPrice: monthlyPriceReq(),
        yearlyPrice: yearlyPriceReq(),
      })
    )
      .then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message + ': ' + res.payload);
        } else {
          toast.success('Paket uspešno dodat');
        }
      })
      .catch((err) => {
        toast.error('Greška, pokušajte ponovo!');
      });
  }

  return (
    <Main>
      <Header>
        <Head>Paketi</Head>
      </Header>
      <Container>
        <ContainerHeader>
          <ContainerHead>Odredite cenu paketa</ContainerHead>
        </ContainerHeader>
        <InputsContainer>
          <InputColumn>
            <TextContent>Upisite cenu za dnevni paket</TextContent>
            <Input
              type='number'
              placeholder={dailyPrice || 'Cena za dnevni paket'}
              onChange={(e) => handlePackagePrice(e, 1)}
            />
          </InputColumn>
          <InputColumn>
            <TextContent>Upisite cenu za mesecni paket</TextContent>
            <Input
              type='number'
              placeholder={monthlyPrice || 'Cena za mesecni paket'}
              onChange={(e) => handlePackagePrice(e, 2)}
            />
          </InputColumn>
          <InputColumn>
            <TextContent>Upisite cenu za godisnji paket</TextContent>
            <Input
              type='number'
              placeholder={yearlyPrice || 'Cena za godisnji paket'}
              onChange={(e) => handlePackagePrice(e, 3)}
            />
          </InputColumn>
        </InputsContainer>
        <SubmitContainer>
          <button className='btn' onClick={priceSubmit}>
            Zapamti
          </button>
        </SubmitContainer>
      </Container>
    </Main>
  );
};

export default PackagePrice;
