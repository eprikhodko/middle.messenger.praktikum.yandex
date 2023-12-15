import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { SignInPage } from "../pages/sign-in";
import { SignUpPage } from "../pages/sign-up";
import { ProfilePage } from "../pages/profile";
import { ChangePasswordPage } from "../pages/change-password";
import { Error404Page } from "../pages/404";
import { Error500Page } from "../pages/500";
import { ChatPage } from "../pages/chat";

export enum ROUTE {
  HOME = "home",
  LOGIN = "login",
  PROFILE = "profile",
  CHANGE_PASSWORD = "change-password",
  SIGN_IN = "sign-in",
  SIGN_UP = "sign-up",
  ERROR_404 = "error-404",
  ERROR_500 = "error-500",
  CHAT = "chat",
}

const ROUTES = {
  [ROUTE.HOME]: HomePage,
  [ROUTE.LOGIN]: LoginPage,
  [ROUTE.PROFILE]: ProfilePage,
  [ROUTE.CHANGE_PASSWORD]: ChangePasswordPage,
  [ROUTE.SIGN_IN]: SignInPage,
  [ROUTE.SIGN_UP]: SignUpPage,
  [ROUTE.ERROR_404]: Error404Page,
  [ROUTE.ERROR_500]: Error500Page,
  [ROUTE.CHAT]: ChatPage,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
