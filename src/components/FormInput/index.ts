import Block from '../../utils/Block';
import template from './FormInput.hbs';
import "./FormInput.css"
import { InputType, ValidationPattern } from '../../utils/enums';

interface Props {
  type: InputType,
  id: string;
  pattern: ValidationPattern,
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
        blur: (event) => this.handleBlur(event, props)
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  handleBlur(event, props) {
    // Validation logic goes here
    const val = event.target.value
    const regexp = new RegExp(props.pattern);

    if (regexp.test(val)) { 
      console.log("passed")
    } else {
      console.log("error")
    }

    console.log(props.pattern)
  }
}
