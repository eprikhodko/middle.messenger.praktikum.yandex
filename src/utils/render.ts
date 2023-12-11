import { HomePage } from "../pages/home";
import { LoginPage } from "../pages/login";
import { SignInPage } from "../pages/sign-in";
import { SignUpPage } from "../pages/sign-up";
import { ProfilePage } from "../pages/profile";

const ROUTES = {
  home: HomePage,
  login: LoginPage,
  profile: ProfilePage,
  "sign-in": SignInPage,
  "sign-up": SignUpPage,
};

export function render(name: keyof typeof ROUTES) {
  const root = document.querySelector("#app")!;

  root.innerHTML = "";

  const Page = ROUTES[name];

  const page = new Page();

  root.append(page.getContent()!);

  page.dispatchComponentDidMount();
}
