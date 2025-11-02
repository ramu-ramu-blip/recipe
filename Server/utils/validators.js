// server/utils/validators.js
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[A-Z][A-Za-z0-9!@#]{6,}/;

module.exports = {
  validateRegister({ name, email, password }) {
    const errors = {};
    if (!name || !name.trim()) errors.name = 'Name required';
    if (!email || !emailRegex.test(email)) errors.email = 'Valid email required';
    if (!password || !passwordRegex.test(password)) errors.password = 'Password must be min 8 chars and include a number';
    return errors;
  },
  validateLogin({ email, password }) {
    const errors = {};
    if (!email || !emailRegex.test(email)) errors.email = 'Valid email required';
    if (!password) errors.password = 'Password required';
    return errors;
  }
};
