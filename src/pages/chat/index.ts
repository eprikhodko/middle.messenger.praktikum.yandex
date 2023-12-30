import Block from "../../utils/Block";
import template from "./chat.hbs";
import "./chat.css";
import { InputType, InputName, ValidationPattern } from "../../utils/enums";
import { FormInput } from "../../components/FormInput";
// import { ChatListItem } from "../../modules/Chat/components/ChatListItem";
// import { ChatAvatar } from "../../modules/Chat/components/ChatAvatar";
import { ButtonArrow } from "../../components/ButtonArrow";
import ChatsController from "../../controllers/ChatsController";
import { ChatsList } from "../../modules/Chat/components/ChatsList";
import { Messenger } from "../../modules/Chat/components/Messenger";
import { ButtonCommon } from "../../components/ButtonCommon";
import { ModalCreateNewChat } from "../../modules/Modal/ModalCreateNewChat";
import { ButtonOpenChatMenu } from "../../modules/Chat/components/ButtonOpenChatMenu";
import { DropdownMenuButton } from "../../modules/Chat/components/DropdownMenuButton";
import store from "../../utils/Store";

// const searchInputProps = {
//   type: InputType.SEARCH,
//   name: InputName.SEARCH,
//   id: "search",
//   placeholder: "Search",
//   pattern: ValidationPattern.SEARCH,
//   inputClassName: "search-form__input",
// };

const sendMessageInputProps = {
  type: InputType.TEXT,
  name: InputName.MESSAGE,
  id: "message",
  placeholder: "Message",
  pattern: ValidationPattern.MESSAGE,
  inputClassName: "send-message-form__input",
};

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

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.buttonOpenChatMenu = new ButtonOpenChatMenu({});
    this.children.dropdownMenuButtons = this.createDropdownMenuButtons(
      getDropdownMenuButtonsProps(this)
    );
    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Create new chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.openModalCreateNewChat();
      },
    });

    this.children.modalCreateNewChat = new ModalCreateNewChat({
      isOpen: false,
    });

    // this.children.searchInput = new FormInput(searchInputProps);
    this.children.sendMessageInput = new FormInput(sendMessageInputProps);

    // this.children.chatAvatar = new ChatAvatar(chatAvatarProps);
    this.children.buttonSendMessage = new ButtonArrow({});

    this.children.chatsList = new ChatsList({ isLoaded: false });

    this.children.messenger = new Messenger({});

    ChatsController.fetchChats().finally(() => {
      (this.children.chatsList as Block).setProps({
        isLoaded: true,
      });
    });
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

  openModalCreateNewChat() {
    this.children.modalCreateNewChat.setProps({ isOpen: true });
  }

  deleteChat = () => {
    const selectedChatId = store.getSelectedChatId();
    if (selectedChatId) {
      ChatsController.delete(selectedChatId);
    }
  };

  render() {
    return this.compile(template, this.props);
  }
}
