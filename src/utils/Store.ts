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
  user: User | null;
  chats: ChatInfo[];
  chatUsers: any;
  messages: Record<number, Message[]>;
  selectedChat?: number | null;
  isModalAddUserToChatOpen?: boolean;
  isModalRemoveUserFromChatOpen?: boolean;
  isModalChangeChatAvatarOpen?: boolean;
  isModalCreateNewChatOpen?: boolean;
}

export class Store extends EventBus {
  private state: State = {
    user: null,
    chats: [],
    messages: [],
    isModalAddUserToChatOpen: false,
    isModalRemoveUserFromChatOpen: false,
    isModalChangeChatAvatarOpen: false,
    isModalCreateNewChatOpen: false,
    selectedChat: null,
    chatUsers: [],
  };

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }

  public getSelectedChatId() {
    return this.state.selectedChat;
  }
}

const store = new Store();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withStore<SP extends Partial<Record<string, any>>>(
  mapStateToProps: (state: State) => SP
) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...(stateProps as Partial<SP & P>) });
        });
      }
    };
  };
}

export default store;
