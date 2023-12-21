import Block from "../../utils/Block";
import template from "./FormCommonInput.hbs";
import { InputType, ValidationPattern } from "../../utils/enums";
import { FormInput } from "../../components/FormInput";
import { FormInputError } from "../../components/FormInputError";
import "./FormCommonInput.css";

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

export class FormCommonInput extends Block {
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
    this.children.inputError = new FormInputError(this.props);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
