import Block from "../../utils/Block";
import template from "./Link.hbs";
import "./Link.css";
import { render } from "../../utils/render";
import { ROUTE } from "../../utils/render";

interface Props {
  text: string;
  to: ROUTE;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

export class Link extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => render(props.to),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
