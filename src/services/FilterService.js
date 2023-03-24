const filterData = (query, data) => {
  if (!query) {
    return data;
  } else {
    return data.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.lastName.toLowerCase().includes(query)
    );
  }
};

module.exports = {
  filterData,
};
