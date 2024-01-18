import { API } from "./enums.js";

export enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type RequestMethod = <R = unknown>(
  url: string,
  options?: unknown
) => Promise<R>;

export default class HTTPTransport {
  static API_URL = API.API_URL;
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: RequestMethod = (path = "/") => {
    return this.request(this.endpoint + path);
  };

  public post: RequestMethod = (path, data?) => {
    return this.request(this.endpoint + path, {
      data,
      method: METHOD.POST,
    });
  };

  public put: RequestMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      data,
      method: METHOD.PUT,
    });
  };

  public delete: RequestMethod = (path, data) => {
    return this.request(this.endpoint + path, {
      data,
      method: METHOD.DELETE,
    });
  };

  private request: RequestMethod = (
    url: string,
    options = { method: METHOD.GET }
  ) => {
    const { method = METHOD.GET, data } = options as {
      method?: METHOD;
      data?: unknown;
    };

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      if (method === METHOD.PUT && data instanceof FormData) {
        xhr.withCredentials = true;
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.withCredentials = true;
        xhr.responseType = "json";

        if (method === METHOD.GET || !data) {
          xhr.send();
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  };
}
