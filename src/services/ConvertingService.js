function monthsConverter(month) {
  switch (month) {
    case 0:
      return 'Januar';
    case 1:
      return 'Februar';
    case 2:
      return 'Mart';
    case 3:
      return 'April';
    case 4:
      return 'Maj';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Avgust';
    case 8:
      return 'Septembar';
    case 9:
      return 'Oktobar';
    case 10:
      return 'Novembar';
    case 11:
      return 'Decembar';
    default:
      return false;
  }
}

export const ConvertingService = {
  monthsConverter,
};
