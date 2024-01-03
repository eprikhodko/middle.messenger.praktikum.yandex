import template from "./ModalAddUserToChat.hbs";
import "./ModalAddUserToChat.css";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType, ValidationPattern } from "../../../utils/enums";
import handleFormSubmit from "../../../utils/handleFormSubmit";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import store from "../../../utils/Store";
import Block from "../../../utils/Block";

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalAddUserToChatBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter user ID",

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
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
    const data = handleFormSubmit(this.children.chatNameInput);

    ChatsController.addUserToChat(this.props.selectedChat, data.user_id);

    store.set("isModalAddUserToChatOpen", false); // close modal after we add new user
    this.children.chatNameInput.children.formInput.clearInputValue();
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
