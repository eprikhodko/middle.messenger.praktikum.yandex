import template from "./ModalRemoveUserFromChat.hbs";
import "./ModalRemoveUserFromChat.css";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType } from "../../../utils/enums";
import handleFormSubmit from "../../../utils/handleFormSubmit";
import ChatsController from "../../../controllers/ChatsController";
import { withStore } from "../../../utils/Store";
import store from "../../../utils/Store";
import { ChatUsers } from "../../Chat/components/ChatUsers";
import Block from "../../../utils/Block";

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalRemoveUserFromChatBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter ID of the user you want to remove from chat.",

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
            store.set("isModalRemoveUserFromChatOpen", false);
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
      id: "user_id_to_remove",
      inputClassName: "form-common__input",
    });

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Remove user from chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });

    this.children.chatUsers = new ChatUsers({});
  }

  onSubmit() {
    const data = handleFormSubmit(this.children.chatNameInput);

    ChatsController.removeUserFromChat(this.props.selectedChat, data.user_id);

    store.set("isModalRemoveUserFromChatOpen", false); // close modal after we remove user
    this.children.chatNameInput.children.formInput.clearInputValue();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withModalState = withStore((state) => ({
  isOpen: state.isModalRemoveUserFromChatOpen,
  selectedChat: state.selectedChat,
}));

export const ModalRemoveUserFromChat = withModalState(
  ModalRemoveUserFromChatBase
);
