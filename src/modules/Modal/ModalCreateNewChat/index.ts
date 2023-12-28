import Block from "../../../utils/Block";
import template from "./ModalCreateNewChat.hbs";
import "./ModalCreateNewChat.css";
import { ModalCreateNewChatContent } from "../ModalCreateNewChatContent";
// import { Chat } from '../../../Chat/components/Chat';
// import { withStore } from '../../../../utils/Store';
// import { ChatInfo } from '../../../../api/ChatsAPI';
// import ChatsController from '../../../../controllers/ChatsController';
// import MessagesController from '../../controllers/MessagesController';
// import { Link } from '../Link';

interface Props {
  isOpen: boolean;
}

export class ModalCreateNewChat extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
            console.log("modal overlay clicked", event, this);
            this.setProps({isOpen: false})
          }
        },
      },
      // events: {
      //   click: props.onClick,
      // },
    });
  }

  protected init() {
    this.children.modalCreateNewChatContent = new ModalCreateNewChatContent({
      // onClick: (event) => console.log("modal clicked", event ),
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
