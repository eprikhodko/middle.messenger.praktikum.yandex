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

  handleBlur(event, props) {
    const val = event.target.value;
    const regexp = new RegExp(props.pattern);
    const isError = !regexp.test(val);
    const errorMessage = document.getElementById(`${props.id}-error-message`);
    const showErrorMessage = () => {
      errorMessage.setAttribute(
        "class",
        "form-common__input-error form-common__input-error--visible"
      );
    };
    const hideErrorMessage = () => {
      errorMessage.setAttribute("class", "form-common__input-error");
    };

    if (isError) {
      showErrorMessage();
    } else {
      console.log("passed");
      hideErrorMessage();
    }

    console.log(props.pattern);
  }
}
