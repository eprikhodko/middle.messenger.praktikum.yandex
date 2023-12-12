import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { SignInPage } from "../pages/sign-in";
import { SignUpPage } from "../pages/sign-up";
import { ProfilePage } from "../pages/profile";
import { ChangePasswordPage } from "../pages/change-password";
import { Error404Page } from "../pages/404";
import { Error500Page } from "../pages/500";



const ROUTES = {
  home: HomePage,
  login: LoginPage,
  profile: ProfilePage,
  changePassword: ChangePasswordPage,
  signIn: SignInPage,
  signUp: SignUpPage,
  error404: Error404Page,
  error500: Error500Page,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
