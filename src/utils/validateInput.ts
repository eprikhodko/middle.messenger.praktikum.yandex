const validateInput = (pattern: string, value: string, id: string) => {
  const regexp = new RegExp(pattern);
  const isError = !regexp.test(value);
  const errorMessageEl = document.getElementById(`${id}-error-message`);

  if (errorMessageEl) {
    if (isError) {
      toggleErrorMessage(errorMessageEl, true);
    } else {
      toggleErrorMessage(errorMessageEl, false);
    }
  }
};

const toggleErrorMessage = (errorMessageEl: HTMLElement, isError: boolean) => {
  errorMessageEl.classList.toggle(
    "form-common__input-error--visible",
    isError
  );
};

export default validateInput;
