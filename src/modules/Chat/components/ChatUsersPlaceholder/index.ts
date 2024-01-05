import template from "./ChatUsersPlaceholder.hbs";
import "./ChatUsersPlaceholder.css";
import Block from "../../../../utils/Block";
import { IChatUsers } from "../ChatUsers";

interface Props {
  users?: IChatUsers;
}

export class ChatUsersPlaceholder extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
