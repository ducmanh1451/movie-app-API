// format date from dd/mm/yyyy => mm/dd/yyyy
const formatDate = (date) => {
  const [day, month, year] = date.split("/");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
};

module.exports = {
  formatDate: formatDate,
};
