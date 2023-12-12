const validateInput = (pattern, value, id) => {
  const regexp = new RegExp(pattern);
  const isError = !regexp.test(value);
  const errorMessageEl = document.getElementById(`${id}-error-message`);

  if (isError) {
    toggleErrorMessage(errorMessageEl, true);
  } else {
    toggleErrorMessage(errorMessageEl, false);
  }
};

const toggleErrorMessage = (errorMessageEl, isError) => {
  errorMessageEl?.classList.toggle("form-common__input-error--visible", isError);
};

export default validateInput;
