import validateInput from "./validateInput";
import { FormInput } from "../components/FormInput";
import { FormCommonInput } from "../components/FormCommonInput";
import Block from "./Block";

const handleFormSubmit = (children: FormCommonInput[] | FormCommonInput) => {
  validate();

  if (Array.isArray(children)) {
    console.log(getFormData(children));
    return getFormData(children);
  } else {
    return getInputData(children);
  }
};

const getFormInputs = () => document.querySelectorAll(".form-input");

const validate = () => {
  const inputs = getFormInputs();

  inputs.forEach((el) => {
    const inputElement = el as HTMLInputElement;

    validateInput(inputElement.pattern, inputElement.value, el.id);
  });
};

function findAllFormInputs(arr: FormCommonInput[]) {
  const formInputs = arr.map((component) => {
    return component.children.formInput;
  });

  return formInputs;
}

const getFormData = (children: FormCommonInput[]) => {
  const inputs = findAllFormInputs(children);
  const inputsValues = inputs.map((child) => [
    (child as FormInput).getName(),
    (child as FormInput).getValue(),
  ]);
  const data = Object.fromEntries(inputsValues);
  return data;
};

const getInputData = (component: Block) => {
  const formInput = component.children.formInput as FormInput;

  const name = formInput.getName();
  const value = formInput.getValue();

  return {
    [name]: value,
  };
};

export default handleFormSubmit;
