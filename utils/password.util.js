const bcrypt = require("bcryptjs");

const validatePassword = (password) => {
  const regexUpperCase = /[A-Z]/;
  const regexLowerCase = /[a-z]/;
  const regexDigit = /\d/;
  const regexSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;

  return (
    regexUpperCase.test(password) &&
    regexLowerCase.test(password) &&
    regexDigit.test(password) &&
    regexSpecialChar.test(password) &&
    password.length >= 12
  );
};

const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(useValue, salt);
  return hashedpassword;
};

const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

module.exports = { validatePassword, hashString, compareString };
