import validateInput from "./validateInput";
import { FormInput } from "../components/FormInput";

const handleFormSubmit = (children) => {
  validate();
  return getFormData(children);
};

const getFormInputs = () => document.querySelectorAll(".form-input");

const validate = () => {
  const inputs = getFormInputs();

  inputs.forEach((el) => {
    const inputElement = el as HTMLInputElement;

    validateInput(inputElement.pattern, inputElement.value, el.id);
  });
};

function findAllFormInputs(arr) {
  const formInputs = arr.map((component) => {
    return component.children.formInput;
  });

  return formInputs;
}

const getFormData = (children) => {
  const inputs = findAllFormInputs(children);
  const inputsValues = inputs.map((child) => [
    (child as FormInput).getName(),
    (child as FormInput).getValue(),
  ]);
  const data = Object.fromEntries(inputsValues);
  return data;
};

export default handleFormSubmit;
