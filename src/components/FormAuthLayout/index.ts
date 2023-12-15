import Block from "../../utils/Block";
import template from "./FormAuthLayout.hbs";
import "./FormAuthLayout.css";

interface Props {
  title: string;
}

export class FormAuthLayout extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
