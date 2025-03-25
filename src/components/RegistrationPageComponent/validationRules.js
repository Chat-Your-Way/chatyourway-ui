const validateName = (value) => {
  if (/\s/.test(value)) {
    return 'Не повинно мати пробілів';
  }
  const allowedSymbols = /^[\p{L}0-9!@#*+=$%^&_\-~?]+$/u;
  if (!allowedSymbols.test(value)) {
    return 'Містить недозволені символи';
  }
  return true;
};

const validateEmail = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'Не повинна мати пробілів';
  }
  //eslint-disable-next-line
  const allowedSymbols = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!allowedSymbols.test(value)) {
    return 'Невірний формат пошти';
  }
};

const validatePassword = (value) => {
  const isNonWhiteSpace = /^\S*$/;
  if (!isNonWhiteSpace.test(value)) {
    return 'Не повинен мати пробілів';
  }
  const isContainsSymbol = /[-!@#$%^&*_+=?]+/;
  if (!isContainsSymbol.test(value)) {
    return 'Повинен мати хоча б 1 символ';
  }
  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(value)) {
    return 'Повинен мати хоча б 1 велику літеру';
  }
  const isContainsNumber = /^(?=.*[0-9]).*$/;
  if (!isContainsNumber.test(value)) {
    return 'Повинен мати хоча б 1 цифру';
  }
  return true;
};

const validateAgreement = (value) => {
  const isValid = value === true;
  return isValid || 'agreement is required';
};

export const validationRules = {
  nickname: {
    required: "Ім'я - обов'язкове поле",
    minLength: {
      value: 4,
      message: 'Мінімум - 4 символи',
    },
    maxLength: {
      value: 20,
      message: 'Максимум - 20 символів',
    },
    validate: { validateName },
  },
  email: {
    required: "Пошта - обов'язкове поле",
    minLength: {
      value: 6,
      message: 'Мінімум - 6 символів',
    },
    maxLength: {
      value: 320,
      message: 'Максимум - 320 символів',
    },
    validate: { validateEmail },
  },
  password: {
    required: "Пароль - обов'язкове поле",
    minLength: {
      value: 4,
      message: 'Мінімум - 4 символи',
    },
    maxLength: {
      value: 20,
      message: 'Максимум - 20 символів',
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
