import template from "./ChatUsers.hbs";
import "./ChatUsers.css";
import Block from "../../../../utils/Block";
import { ChatUsersPlaceholder } from "../ChatUsersPlaceholder";
import { withStore } from "../../../../utils/Store";
// import { withStore } from "../../../../utils/Store";
import ChatsController from "../../../../controllers/ChatsController";


interface Props {
  text: string;
  onClick: () => void;
  events?: {
    click: () => void;
  };
}

export class ChatUsersBase extends Block<Props> {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  init() {
    this.children.chatUsersPlaceholder = new ChatUsersPlaceholder({})
  }

  protected componentDidUpdate(oldProps, newProps): boolean {
    /**
     * Обновляем детей
     */

    console.log("COMPONENT DID UPDATE", newProps, this)

    if (newProps.chatUsers) {
    //  const chatUsers =  ChatsController.getChatUsers(newProps.selectedChat)
     
     
    //  console.log("chatUsers", ChatsController.getChatUsers(newProps.selectedChat))
    console.log("Chat users from store", newProps.chatUsers)

     this.children.chatUsersPlaceholder?.setProps({
      text: newProps.chatUsers,
    });
    }

    

    /**
     * Другой вариант — просто заново создать всех детей. Но тогда метод должен возвращать true, чтобы новые дети отрендерились
     *
     * this.children.fields = userFields.map(name => {
     *   return new ProfileField({ name, value: newProps[name] });
     * });
     */

    /**
     * Так как мы обновили детей, этот компонент не обязательно рендерить
     */
    return false;
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}

const withChatUsersState = withStore((state) => ({
  chatUsers: state.chatUsers,
}));
// const withModalState = withStore((state) => {
//   console.log("STATE",state)
//   } )

export const ChatUsers = withChatUsersState(ChatUsersBase);
