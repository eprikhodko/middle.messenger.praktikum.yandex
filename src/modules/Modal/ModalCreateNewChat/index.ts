import template from "./ModalCreateNewChat.hbs";
import "./ModalCreateNewChat.css";
import { ModalBase } from "../ModalBase";
import { ButtonCommon } from "../../../components/ButtonCommon";
import { FormCommonInput } from "../../../components/FormCommonInput";
import { InputName, InputType, ValidationPattern } from "../../../utils/enums";
import handleFormSubmit from "../../../utils/handleFormSubmit";
import ChatsController from "../../../controllers/ChatsController";

interface Props {
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ModalCreateNewChat extends ModalBase<Props> {
  constructor(props: Props) {
    super({
      ...props,
      title: "Enter new chat name",
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

    this.props.isOpen = false; // close modal after we create new chat
  }

  render() {
    console.log("DEBUG, ModalCreateNewChat", this.props);
    return this.compile(template, { ...this.props });
  }
}
