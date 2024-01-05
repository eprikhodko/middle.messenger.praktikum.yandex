import Block from '../utils/Block';
import Router from '../utils/Router';

export interface PropsWithRouter {
  router?: typeof Router;
}

export function withRouter<T extends new (...args: any[]) => Block<any>>(Component: T) {
  return class WithRouter extends Component {
    constructor(...args: any[]) {
      super({ ...args[0], router: Router });
    }
  } as unknown as T;
}
