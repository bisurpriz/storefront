export const formatPhoneNumber = (phoneNumber: string) => {
  if(!phoneNumber) return null;
  let number = phoneNumber.replace(/\D/g, "");

  if (number.startsWith("90")) {
    number = number.slice(2);
  }

  if (number.startsWith("+90")) {
    number = number.slice(3);
  }

  if (number.startsWith("0")) {
    number = number.slice(1);
  }

  return number;
};
