import API, { AuthAPI, SigninData, SignupData } from "../api/AuthAPI";
import store from "../utils/Store";
import router from "../utils/Router";
import { ROUTE } from "../utils/enums";
import MessagesController from "./MessagesController";

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();

      router.go(ROUTE.MESSENGER);
    } catch (e) {
      console.error(e);

      if (typeof e === "object" && e !== null && "reason" in e) {
        const error = e as { reason: string };
        if (error.reason === "User already in system") {
          router.go("/messenger");
          return;
        }
      }
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go(ROUTE.MESSENGER);
    } catch (e) {
      console.error(e);
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.read();

      store.set("user", user);
    } catch (e) {
      console.error(e);
    }
  }

  async logout() {
    try {
      MessagesController.closeAll();

      await this.api.logout();

      store.set("user", null);
      store.set("selectedChat", null);

      router.go("/");
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AuthController();
