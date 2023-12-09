import Block from "../../utils/Block";
import template from "./FormCommonLayout.hbs";
import "./FormCommonLayout.css";

interface Props {
  title: string;
}

export class FormCommonLayout extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
