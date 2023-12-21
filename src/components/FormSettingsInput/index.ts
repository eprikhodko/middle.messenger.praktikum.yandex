import Block from "../../utils/Block";
import template from "./FormSettingsInput.hbs";
import { InputType, ValidationPattern } from "../../utils/enums";
import { FormInput } from "../FormInput";
import { FormInputError } from "../FormInputError";
import "./FormSettingsInput.css";

interface Props {
  type: InputType;
  propClass?: string;
  value?: string;
  id: string;
  pattern?: ValidationPattern;
  placeholder?: string;
  onClick?: () => void;
  events?: {
    click: () => void;
  };
}

export class FormSettingsInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  init() {
    this.children.formInput = new FormInput(this.props);
    this.children.inputError = new FormInputError({
      ...this.props,
      propClass: "form-common__input-error--settings-error",
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
