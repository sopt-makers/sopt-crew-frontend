export const addHyphenToPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
