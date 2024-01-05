import Block from "../../utils/Block";
import template from "./Link.hbs";
import "./Link.css";
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';

interface Props extends PropsWithRouter {
  to: string;
  text: string;
  styles: string;
  events?: {
    click: () => void;
  };
}

class BaseLink extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

export const Link = withRouter(BaseLink);


