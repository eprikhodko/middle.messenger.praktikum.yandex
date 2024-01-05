import template from "./ModalCreateNewChat.hbs";
import "./ModalCreateNewChat.css";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType, ValidationPattern } from "../../../utils/enums";
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
}

export class ModalCreateNewChatBase extends Block<Props> {
  constructor() {
    super({
      title: "Enter new chat name",
      isOpen: false,
      events: {
        click: (event: Event) => {
          if (event.target === event.currentTarget) {
            store.set("isModalCreateNewChatOpen", false);
          }
        },
      },
    });
  }

  init() {
    this.children.chatNameInput = new FormCommonInput({
      type: InputType.TEXT,
      name: InputName.NEWCHATNAME,
      label: "Chat name",
      id: "chat_name",
      pattern: ValidationPattern.MESSAGE,
      inputClassName: "form-common__input",
    });

    this.children.buttonCreateNewChat = new ButtonCommon({
      text: "Create new chat",
      type: "button",
      propClass: "button--primary",
      onClick: () => {
        this.onSubmit();
      },
    });
  }

  onSubmit() {
    const chatNameInputBlock = this.children.chatNameInput;
    // Check if chatNameInputBlock is a single Block instance
    if (!Array.isArray(chatNameInputBlock)) {
      const data = handleFormSubmit(chatNameInputBlock as FormCommonInput);

      ChatsController.create(data.title);

      store.set("isModalCreateNewChatOpen", false); // close modal after we add new user

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
  isOpen: state.isModalCreateNewChatOpen,
}));

export const ModalCreateNewChat = withModalState(ModalCreateNewChatBase);
