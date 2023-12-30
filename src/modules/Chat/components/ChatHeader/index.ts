import template from "./ChatHeader.hbs";
import "./ChatHeader.css";
import Block from "../../../../utils/Block";
import { ButtonOpenChatMenu } from "../ButtonOpenChatMenu";
import ChatsController from "../../../../controllers/ChatsController";
import { DropdownMenuButton } from "../DropdownMenuButton";
import store from "../../../../utils/Store";
import { withStore } from "../../../../utils/Store";

interface Props {
  selectedChat: number | undefined;
}

const getDropdownMenuButtonsProps = (context) => [
  {
    text: "Add user",
    onClick: () => {
      console.log("add new user");
    },
  },
  {
    text: "Remove user",
    onClick: () => {
      console.log("remove user");
    },
  },
  {
    text: "Delete chat",
    onClick: () => {
      context.deleteChat();
    },
  },
];

export class ChatHeaderBase extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

  init() {
    this.children.buttonOpenChatMenu = new ButtonOpenChatMenu({});
    this.children.dropdownMenuButtons = this.createDropdownMenuButtons(
      getDropdownMenuButtonsProps(this)
    );

    // this.children.searchInput = new FormInput(searchInputProps);

    // this.children.chatAvatar = new ChatAvatar(chatAvatarProps);
  }

  private createDropdownMenuButtons(buttonsProps) {
    return buttonsProps.map((props) => {
      return new DropdownMenuButton({
        ...props,
        events: {
          click: () => {
            props.onClick;
          },
        },
      });
    });
  }

  deleteChat = () => {
    const selectedChatId = store.getSelectedChatId();
    if (selectedChatId) {
      ChatsController.delete(selectedChatId);
    }
  };

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      // messages: [],
      selectedChat: undefined,
      // userId: state.user.id
    };
  }

  return {
    // messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    // userId: state.user.id
  };
});

export const ChatHeader = withSelectedChatMessages(ChatHeaderBase);
