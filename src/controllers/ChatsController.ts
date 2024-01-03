import API, { ChatsAPI } from "../api/ChatsAPI";
import store from "../utils/Store";
import MessagesController from "./MessagesController";

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    await this.api.create(title);

    this.fetchChats();
  }

  async fetchChats() {
    const chats = await this.api.read();

    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    console.log(chats);
    store.set("chats", chats);
  }

  async addUserToChat(id: number, userId: number) {
    await this.api.addUsers(id, [userId]);

    const currentChatId = store.getSelectedChatId();

    this.getChatUsers(currentChatId);
  }

  async removeUserFromChat(chatId: number, userId: number) {
    await this.api.deleteUsers(chatId, [userId]);

    const currentChatId = store.getSelectedChatId();

    this.getChatUsers(currentChatId);
  }

  async getChatUsers(chatId: number) {
    const chatUsers = await this.api.getUsers(chatId);

    console.log("CHATS USERS", chatUsers);

    store.set("chatUsers", chatUsers);
  }

  async delete(id: number) {
    await this.api.delete(id);

    this.fetchChats();
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  async selectChat(id: number) {
    store.set("selectedChat", id);

    this.getChatUsers(id);
  }
}

const controller = new ChatsController();

// @ts-ignore
window.chatsController = controller;

export default controller;
