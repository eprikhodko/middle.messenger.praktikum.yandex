import Block from "../../../../utils/Block";
import template from "./ChatListItem.hbs";
import "./ChatListItem.css";
import { ChatAvatar } from "../ChatAvatar";

interface Props {
  chatName: string;
  isActive: boolean;
  onClick?: () => void;
  events: {
    click: () => void;
  };
}

// looks like this props should be passed from the parent, at least image source
const chatAvatarProps = {
  sizeDefault: true,
  src: "server-response/user/chat-avatar.jpg",
};

export class ChatListItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }

  init() {
    this.children.chatAvatar = new ChatAvatar(chatAvatarProps);
  }

  render() {
    return this.compile(template, this.props);
  }
}
