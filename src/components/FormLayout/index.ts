import Block from '../../utils/Block';
import template from './FormLayout.hbs';
import './formCommonLayout.css'

interface Props {
  title: string;
  type?: 'submit' | 'button',
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class FormLayout extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick
      }
    });
  }

  render() {
    // console.log(formCommonLayout)
    // console.log(this)
    // console.log(this.compile(template, this.props))
    return this.compile(template, this.props);
  }
}
