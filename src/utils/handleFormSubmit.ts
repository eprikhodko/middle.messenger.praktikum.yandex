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

  console.log("formInputs", formInputs);

  return formInputs;
}

const getFormData = (children) => {
  console.log(children);
  console.log("found", findAllFormInputs(children));

  const inputs = findAllFormInputs(children);
  const inputsValues = inputs.map((child) => [
    (child as FormInput).getName(),
    (child as FormInput).getValue(),
  ]);
  const data = Object.fromEntries(inputsValues);
  console.log("data", data);

  ///////////////////
  // const inputs = getFormInputs();
  // const formData: Record<string, string> = {};

  // inputs.forEach((el) => {
  //   const inputElement = el as HTMLInputElement;

  //   formData[inputElement.name] = inputElement.value;
  // });

  // console.log(formData);
  return data;
};

export default handleFormSubmit;
