import validateInput from "./validateInput";

const handleFormSubmit = () => {
  getFormData();
  validate();
};

const getFormInputs = () => document.querySelectorAll(".form-input");

const validate = () => {
  const inputs = getFormInputs();

  inputs.forEach((el) => {
    const inputElement = el as HTMLInputElement;

    validateInput(inputElement.pattern, inputElement.value, el.id);
  });
};

const getFormData = () => {
  const inputs = getFormInputs();
  const formData: Record<string, string> = {};

  inputs.forEach((el) => {
    const inputElement = el as HTMLInputElement;

    formData[inputElement.name] = inputElement.value;
  });

  console.log(formData);
};

export default handleFormSubmit;
