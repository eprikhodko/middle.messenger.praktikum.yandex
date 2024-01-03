import { set } from "./helpers";
import { EventBus } from "./EventBus";
import Block from "./Block";
import { User } from "../api/AuthAPI";
import { ChatInfo } from "../api/ChatsAPI";
import { Message } from "../controllers/MessagesController";

export enum StoreEvents {
  Updated = "updated",
}

interface State {
  user: User;
  chats: ChatInfo[];
  chatUsers: any;
  messages: Record<number, Message[]>;
  selectedChat?: number;
  isModalAddUserToChatOpen: boolean;
  isModalRemoveUserFromChatOpen: boolean;
  isModalChangeChatAvatarOpen: boolean;
}

export class Store extends EventBus {
  private state: any = {
    isModalAddUserToChatOpen: false,
    isModalRemoveUserFromChatOpen: false,
    isModalChangeChatAvatarOpen: false,
    selectedChat: null,
    chatUsers: [],
  };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
    console.log(this.state);
  }

  public getState() {
    return this.state;
  }

  public getSelectedChatId() {
    return this.state.selectedChat;
  }
}

const store = new Store();

// @ts-ignore
window.store = store;

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
