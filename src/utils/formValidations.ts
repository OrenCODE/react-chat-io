export const validationRules = {
  email: [
    {test: (value: string) => /\S+@\S+\.\S+/.test(value), message: 'Invalid email format'},
  ],
  firstName: [
    {
      test: (value: string) => /^[A-Za-z]{2,}$/.test(value),
      message: 'First name must contain at least 2 letters and no numbers.'
    },
  ],
  lastName: [
    {
      test: (value: string) => /^[A-Za-z]{2,}$/.test(value),
      message: 'Last name must contain at least 2 letters and no numbers.'
    },
  ],
  password: [
    {test: (value: string) => value.length >= 6, message: 'Password must be at least 6 characters.'},
  ],
};
