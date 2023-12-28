import Block from "../../../utils/Block";
import template from "./ModalBase.hbs";
import "./ModalBase.css";
// import { ModalCreateNewChatContent } from "../ModalCreateNewChatContent";
// import { Chat } from '../../../Chat/components/Chat';
// import { withStore } from '../../../../utils/Store';
// import { ChatInfo } from '../../../../api/ChatsAPI';
// import ChatsController from '../../../../controllers/ChatsController';
// import MessagesController from '../../controllers/MessagesController';
// import { Link } from '../Link';

interface Props {
  isOpen: boolean;
}

export class ModalBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,

      events: {
        click: (event) => {
          if (event.target === event.currentTarget) {
            // if (event.target === this.getContent()) {
              console.log("MODAL BASE", this)

            this.setProps({ isOpen: false });
          }
        },
      },
    });
  }

  // protected init() {
  //   this.children.modalCreateNewChatContent = new ModalCreateNewChatContent({
  //     // onClick: (event) => console.log("modal clicked", event ),
  //   });
  // }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props });
  }
}
