import template from "./ChatUsers.hbs";
import "./ChatUsers.css";
import Block from "../../../../utils/Block";
import { ChatUsersPlaceholder } from "../ChatUsersPlaceholder";
import { withStore } from "../../../../utils/Store";
// import { withStore } from "../../../../utils/Store";
import ChatsController from "../../../../controllers/ChatsController";

interface Props {
  text: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ChatUsersBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  init() {
    this.children.chatUsersPlaceholder = new ChatUsersPlaceholder({});
  }

  protected componentDidUpdate(oldProps, newProps): boolean {
    console.log("COMPONENT DID UPDATE", newProps, this);

    // if (newProps.chatUsers) {
    console.log("Chat users from store", newProps.chatUsers);

    this.children.chatUsersPlaceholder?.setProps({
      users: newProps.chatUsers.filter((user) => user.role !== "admin"),
    });
    // }

    return false;
  }

  render() {
    console.log(this);
    return this.compile(template, { ...this.props });
  }
}

const withChatUsersState = withStore((state) => ({
  chatUsers: state.chatUsers,
}));

export const ChatUsers = withChatUsersState(ChatUsersBase);
