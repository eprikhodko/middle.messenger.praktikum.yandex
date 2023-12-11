import validateInput from "./validateInput";

const handleFormSubmit = () => {
  getFormData();
  validate();
};

const getFormInputs = () => document.querySelectorAll(".form-input");

const validate = () => {
  const inputs = getFormInputs();

  inputs.forEach((i) => {
    validateInput(i.pattern, i.value, i.id);
  });
};

const getFormData = () => {
  const inputs = getFormInputs();
  const formData = {};

  inputs.forEach((i) => {
    formData[i.name] = i.value;
  });

  console.log(formData);
};

export default handleFormSubmit;
