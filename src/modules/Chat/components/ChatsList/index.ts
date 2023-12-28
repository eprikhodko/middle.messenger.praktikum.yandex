import Block from '../../../../utils/Block';
import template from './chatsList.hbs';
import { Chat } from '../../../Chat/components/Chat';
import { withStore } from '../../../../utils/Store';
import { ChatInfo } from '../../../../api/ChatsAPI';
import ChatsController from '../../../../controllers/ChatsController';
// import MessagesController from '../../controllers/MessagesController';
// import { Link } from '../Link';

interface ChatsListProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class ChatsListBase extends Block<ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({...props});
  }

  protected init() {
    this.children.chats = this.createChats(this.props);
    console.log("this.chats", this.children)
    // this.children.profileLink = new Link({ to: '/profile', label: 'Профиль'});
  }

  protected componentDidUpdate(oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  private createChats(props: ChatsListProps) {
    return props.chats.map(data => {
      return new Chat({
        ...data,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          }
        }
      });
    })
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props});
  }
}

const withChats = withStore((state) => ({chats: [...(state.chats || [])]}));

export const ChatsList = withChats(ChatsListBase);
