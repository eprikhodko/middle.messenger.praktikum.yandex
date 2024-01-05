import template from "./ChatUsers.hbs";
import "./ChatUsers.css";
import Block from "../../../../utils/Block";
import { ChatUsersPlaceholder } from "../ChatUsersPlaceholder";
import { withStore } from "../../../../utils/Store";

interface Props {
  text: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
  chatUsers: [];
}

export interface IChatUsers {
  chatUsers: [Record<string, string | number>];
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

  protected componentDidUpdate(_oldProps: {}, newProps: Props): boolean {
    const chatUsersProps = newProps as unknown as IChatUsers;
    const chatUsersPlaceholderBlock = this.children.chatUsersPlaceholder;
    if (!Array.isArray(chatUsersPlaceholderBlock)) {
      chatUsersPlaceholderBlock.setProps({
        users: chatUsersProps.chatUsers.filter((user) => user.role !== "admin"),
      });
    }

    return false;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withChatUsersState = withStore((state) => ({
  chatUsers: state.chatUsers,
}));

export const ChatUsers = withChatUsersState(ChatUsersBase);
