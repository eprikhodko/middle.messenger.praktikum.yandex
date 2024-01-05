import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    try {
      await this.api.create(title);

      this.fetchChats();
    } catch (e) {
      console.error(e);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id);

        await MessagesController.connect(chat.id, token);
      });

      store.set("chats", chats);
    } catch (e) {
      console.error(e);
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);

      const currentChatId = store.getSelectedChatId();

      this.getChatUsers(currentChatId);
    } catch (e) {
      console.error(e);
    }
  }

  async removeUserFromChat(chatId: number, userId: number) {
    try {
      await this.api.deleteUsers(chatId, [userId]);

      const currentChatId = store.getSelectedChatId();

      this.getChatUsers(currentChatId);
    } catch (e) {
      console.error(e);
    }
  }

  async getChatUsers(chatId: number) {
    try {
      const chatUsers = await this.api.getUsers(chatId);

      store.set("chatUsers", chatUsers);
    } catch (e) {
      console.error(e);
    }
  }

  async updateChatAvatar(data: FormData, chatId: number) {
    try {
      await this.api.updateChatAvatar(data, chatId);

      this.fetchChats();
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);

      this.fetchChats();
    } catch (e) {
      console.error(e);
    }
  }

  async getToken(id: number) {
    try {
      return await this.api.getToken(id);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async selectChat(id: number) {
    try {
      store.set("selectedChat", id);

      this.getChatUsers(id);
    } catch (e) {
      console.error(e);
    }
  }
}

const controller = new ChatsController();

export default controller;
