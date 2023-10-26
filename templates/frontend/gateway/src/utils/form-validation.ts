export const getEmailId = (email: string) => {
  return email
    .split('@')[0]
    .toLowerCase()
    .replace(/[^a-zA-Z0-9_-]/g, '-');
};

export const emailPattern = /\S+@\S+\.\S+/;
export const accountAddressPattern = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

/**
 * regex for the body of an account not including TLA and not allowing subaccount
 */
export const accountAddressPatternNoSubaccount = /^([a-z\d]+[-_])*[a-z\d]+$/;

export const isValidEmail = (email: string) => {
  return emailPattern.test(email);
};
