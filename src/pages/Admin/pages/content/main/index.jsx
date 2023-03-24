import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../../../../features/clients/clientSlice';
import ChartActive from './components/charts/ChartActive';
import ChartGender from './components/charts/ChartGender';
import TableRecent from './components/tables/TableRecent';

const Main = () => {
  const { clients } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const activeClients = () =>
    clients?.clients.filter(
      (client) => new Date(client.endDate).getTime() > Date.now()
    );

  const activeClientsNmb = activeClients().length;

  const getUserNmbByMonth = (month) =>
    clients?.clients.filter(
      (client) => new Date(client.startDate).getMonth(month) === month
    );

  const dataSet = [];

  function populateDataSet() {
    for (let i = 0; i < 13; i++) {
      dataSet.push(getUserNmbByMonth(i).length);
    }
  }

  populateDataSet();

  const usersCurrentMonth = getUserNmbByMonth(new Date().getMonth());

  const usersLastMonth = dataSet[new Date().getMonth() - 1];

  const increase = usersCurrentMonth.length - usersLastMonth;

  const percentage = (increase / usersLastMonth) * 100;

  return (
    <div className='main'>
      <div className='main-section one-item'>
        <div className='chart'>
          <ChartActive
            activeClientsNmb={activeClientsNmb}
            dataSet={dataSet}
            percentage={percentage}
          />
        </div>
      </div>
      <div className='main-section two-items'>
        <div className='main-section-subsection nmb-section'>
          <div className='number-active lg-nmb'>35</div>
          <div className='number-active sm-subsection'>
            Currently at the gym
          </div>
        </div>
        <div className='main-section-subsection'>
          <ChartGender />
        </div>
      </div>
      <div className='main-section one-item most-recent'>
        <h4 className='most-recent-title h4-title'>MOST RECENT USERS</h4>
        <TableRecent />
      </div>
    </div>
  );
};

export default Main;
