export const formatPhoneNumber = (phoneNumber: string) => {
  // if +90 (553) 977 6001 => 5539776001
  const phone = phoneNumber.replace(/\D/g, "").trim();

  const match = phone.match(/^(\d{4})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }

  return phoneNumber;
};
