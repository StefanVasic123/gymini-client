/*
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

Date.prototype.addMonths = function (months) {
  const date = new Date(this.valueOf());
  date.setMonth(date.getMonth() + months);
  return date;
};

Date.prototype.addYears = function (years) {
  const date = new Date(this.valueOf());
  date.setFullYear(date.getFullYear() + years);
  return date;
};
*/
function addDays(days, custom) {
  const date = custom ? new Date(custom) : new Date();
  date.setDate(date.getDate() + days);
  return date;
}

function addMonths(months, custom) {
  const date = custom ? new Date(custom) : new Date();
  date.setMonth(date.getMonth() + months);
  return date;
}
function addYears(years, custom) {
  const date = custom ? new Date(custom) : new Date();
  date.setFullYear(date.getFullYear() + years);
  return date;
}

module.exports = {
  addDays,
  addMonths,
  addYears,
};
