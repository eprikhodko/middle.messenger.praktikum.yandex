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

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalCreateNewChatBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter new chat name",

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
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
    const data = handleFormSubmit(this.children.chatNameInput);
    console.log("DATA", data);

    ChatsController.create(data.title);

    store.set("isModalCreateNewChatOpen", false); // close modal after we add new user
    this.children.chatNameInput.children.formInput.clearInputValue();
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withModalState = withStore((state) => ({
  isOpen: state.isModalCreateNewChatOpen,
}));

export const ModalCreateNewChat = withModalState(ModalCreateNewChatBase);
