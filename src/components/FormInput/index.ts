import Block from "../../utils/Block";
import template from "./FormInput.hbs";
import "./FormInput.css";
import { InputType, ValidationPattern } from "../../utils/enums";

interface Props {
  type: InputType;
  id: string;
  pattern: ValidationPattern;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class FormInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
        blur: (event) => this.handleBlur(event, props),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  toggleErrorMessage(errorMessageEl, isError) {
    errorMessageEl.classList.toggle(
      "form-common__input-error--visible",
      isError
    );
  }

  handleBlur(event, props) {
    const inputVal = event.target.value;
    const regexp = new RegExp(props.pattern);
    const isError = !regexp.test(inputVal);
    const errorMessageEl = document.getElementById(`${props.id}-error-message`);

    if (isError) {
      this.toggleErrorMessage(errorMessageEl, true);
    } else {
      this.toggleErrorMessage(errorMessageEl, false);
    }
  }
}
