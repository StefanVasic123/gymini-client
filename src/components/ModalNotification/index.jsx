import React from 'react';
import { useSelector } from 'react-redux';

const ModificationModal = () => {
  let {
    date,
    shiftNumber,
    shiftRange,
    staff,
    addedUsers,
    turnover,
    totalTurnover,
  } = useSelector((store) => store.endShiftNotifications);

  return (
    <div style={{ paddingTop: '3%' }}>
      <p>
        vreme zatvaranja smene: {new Date(date).getDate()}{' '}
        {new Date(date).getMonth() + 1} {new Date(date).getFullYear()}
      </p>
      <p>broj smene: {shiftNumber}</p>
      <p>
        trajanje smene: {shiftRange[0]} - {shiftRange[1]}
      </p>
      <p>zaposleni: {staff}</p>
      <p>
        dodati korisnici:{' '}
        {addedUsers.length
          ? addedUsers.map((user) => {
              return `${user.name} `;
            })
          : 'nema dodatnih korisnika'}
      </p>
      <p>pazar: {turnover}</p>
      <p>ukupan pazar danas: {totalTurnover}</p>
    </div>
  );
};

export default ModificationModal;
