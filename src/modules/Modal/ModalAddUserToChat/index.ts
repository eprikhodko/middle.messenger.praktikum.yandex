import template from "./ModalAddUserToChat.hbs";
import "./ModalAddUserToChat.css";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType } from "../../../utils/enums";
import handleFormSubmit from "../../../utils/handleFormSubmit";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import store from "../../../utils/Store";
import Block from "../../../utils/Block";
import { FormInput } from "../../../components/FormInput";

interface Props {
  events?: {
    click: (event: Event) => void;
  };
  isOpen: boolean;
  title?: string;
  selectedChat: number;
}

export class ModalAddUserToChatBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter user ID",
      isOpen: false,
      events: {
        click: (event: Event) => {
          if (event.target === event.currentTarget) {
            store.set("isModalAddUserToChatOpen", false);
          }
        },
      },
    });
  }

  init() {
    this.children.chatNameInput = new FormCommonInput({
      type: InputType.TEXT,
      name: InputName.USERID,
      label: "User ID",
      id: "user_id",
      inputClassName: "form-common__input",
    });

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Add user to the chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });
  }

  onSubmit() {
    const chatNameInputBlock = this.children.chatNameInput;

    if (!Array.isArray(chatNameInputBlock)) {
      const data = handleFormSubmit(chatNameInputBlock as FormCommonInput);

      ChatsController.addUserToChat(this.props.selectedChat, data.user_id);

      store.set("isModalAddUserToChatOpen", false); // close modal after we add new user

      const formInputBlock = chatNameInputBlock.children.formInput as FormInput;
      // Check if formInputBlock is a single Block instance
      if (!Array.isArray(formInputBlock)) {
        formInputBlock.clearInputValue();
      }
    }
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withModalState = withStore((state) => ({
  isOpen: state.isModalAddUserToChatOpen,
  selectedChat: state.selectedChat,
}));

export const ModalAddUserToChat = withModalState(ModalAddUserToChatBase);
