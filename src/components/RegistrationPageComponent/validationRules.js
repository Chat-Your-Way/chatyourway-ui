const validateName = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'must not contain whitespaces';
  }
  const allowedSymbols = /^[a-zA-ZА-Яа-я0-9!@#*+=$%^&_-~?]+$/;
  if (!allowedSymbols.test(value)) {
    return 'invalid characters or symbols';
  }
  return true;
};

const validateEmail = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'must not contain whitespaces';
  }
  //eslint-disable-next-line
  const allowedSymbols = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!allowedSymbols.test(value)) {
    return 'invalid email';
  }
};

const validatePassword = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'must not contain whitespaces';
  }
  const isContainsSymbol = /[!@#$%^&-*_+=?]+/;
  if (!isContainsSymbol.test(value)) {
    return 'must have at least one symbol';
  }
  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return 'must have at least one uppercase';
  }
  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return 'must have at least one digit';
  }
  return true;
};

const validateAgreement = (value) => {
  const isValid = value === true;
  return isValid || 'agreement is required';
};

export const validationRules = {
  nickname: {
    required: 'Name is required',
    minLength: {
      value: 4,
      message: 'At least 4 characters long',
    },
    maxLength: {
      value: 20,
      message: 'Maximum 20 characters long',
    },
    validate: { validateName },
  },
  email: {
    required: 'Email is required',
    minLength: {
      value: 6,
      message: 'At least 6 characters long',
    },
    maxLength: {
      value: 320,
      message: 'Maximum 320 characters long',
    },
    validate: { validateEmail },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 4,
      message: 'At least 4 characters long',
    },
    maxLength: {
      value: 12,
      message: 'Maximum 12 characters long',
    },
    validate: { validatePassword },
  },
  avatar: {
    required: true,
  },
  agreement: {
    validate: { validateAgreement },
  },
};
