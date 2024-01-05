import Block from "../../../../utils/Block";
import template from "./ChatFooter.hbs";
import MessagesController, {
  Message as MessageInfo,
} from "../../../../controllers/MessagesController";
import { withStore } from "../../../../utils/Store";
import { FormInput } from "../../../../components/FormInput";
import { ButtonArrow } from "../../../../components/ButtonArrow";
import {
  InputName,
  InputType,
  ValidationPattern,
} from "../../../../utils/enums";

interface MessengerProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

// const sendMessageInputProps = {
//   type: InputType.TEXT,
//   name: InputName.MESSAGE,
//   id: "message",
//   placeholder: "Message",
//   pattern: ValidationPattern.MESSAGE,
//   inputClassName: "send-message-form__input",
//   onKeypress: (event) => {
//     if (event.key === "Enter") {
//       // Code to execute when Enter is pressed
//       console.log("Enter key pressed!");
//       this.sendMessage()
//     }
//   },
// };

const getSendMessageInputProps = (context) => {
  return {
    type: InputType.TEXT,
    name: InputName.MESSAGE,
    id: "message",
    placeholder: "Message",
    pattern: ValidationPattern.MESSAGE,
    inputClassName: "send-message-form__input",
    onKeypress: (event) => {
      if (event.key === "Enter") {
        console.log("Enter key pressed!");
        context.sendMessage()
      }
    },
  }
}

class ChatFooterBase extends Block<MessengerProps> {
  constructor(props: MessengerProps) {
    super(props);
  }

  protected init() {
    this.children.sendMessageInput = new FormInput(getSendMessageInputProps(this));
    this.children.buttonSendMessage = new ButtonArrow({
      type: "button",
      onClick: () => {
        const input = this.children.sendMessageInput as FormInput;
        const message = input.getValue();

        input.setValue("");

        if (message) {
          MessagesController.sendMessage(this.props.selectedChat!, message);
        }
      },
    });
  }

  sendMessage() {
    const input = this.children.sendMessageInput as FormInput;
    const message = input.getValue();

    input.setValue("");

    if (message) {
      MessagesController.sendMessage(this.props.selectedChat!, message);
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}

const withSelectedChatMessages = withStore((state) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      selectedChat: undefined,
    };
  }

  return {
    selectedChat: state.selectedChat,
  };
});

export const ChatFooter = withSelectedChatMessages(ChatFooterBase);
