import Block from '../../utils/Block';
import template from './FormLayout.hbs';

interface ButtonProps {
  label: string;
  type?: 'submit' | 'button',
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class FormLayout extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  }

  render() {
    console.log(this)
    // console.log(this.compile(template, this.props))
    return this.compile(template, this.props);
  }
}
