import Block from "../../../../utils/Block";
import template from "./chat.hbs";
import { withStore } from "../../../../utils/Store";
import { ChatInfo } from "../../../../api/ChatsAPI";
import { ChatAvatar } from "../ChatAvatar";
import { API } from "../../../../utils/enums";

interface ChatProps {
  id: number;
  title: string;
  unread_count: number;
  selectedChat: ChatInfo;
  events: {
    click: () => void;
  };
}

class ChatBase extends Block<ChatProps> {
  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    const avatarSrc = this.props.avatar
      ? `${API.API_URL}${API.RESOURCES}${this.props.avatar}`
      : "/avatar-placeholder.svg";

    this.children.chatAvatar = new ChatAvatar({
      imgSrc: avatarSrc,
      sizeDefault: true,
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat?.id,
    });
  }
}

export const withSelectedChat = withStore((state) => ({
  selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat),
}));

export const Chat = withSelectedChat(ChatBase);
