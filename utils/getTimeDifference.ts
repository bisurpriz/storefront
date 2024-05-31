export function getTimeDifference(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

  const yearsDifference = currentDate.getFullYear() - inputDate.getFullYear();

  let monthsDifference =
    currentDate.getMonth() - inputDate.getMonth() + yearsDifference * 12;

  if (currentDate.getDate() < inputDate.getDate()) {
    monthsDifference--;
  }

  if (yearsDifference === 0 && monthsDifference === 0) {
    return `1 ay`;
  }

  if (yearsDifference >= 1) {
    return `${yearsDifference} yıl`;
  }

  if (monthsDifference < 1) {
    return `1 ay`;
  } else {
    return `${monthsDifference} ay`;
  }
}
