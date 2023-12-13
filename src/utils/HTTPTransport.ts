enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface QueryData {
  [key: string]: string | number | boolean;
}

interface Options {
  method?: METHOD;
  data?: QueryData;
  headers?: Record<string, string>;
  timeout?: number;
}

function queryStringify(data: Options["data"]) {
  return Object.keys(data)
    .map((key) => {
      let value = data[key];

      if (Array.isArray(value)) {
        value = value.join(",");
      } else if (typeof value === "object" && value !== null) {
        // Directly use '[object Object]' string without encoding
        value = "[object Object]";
      } else {
        // Only encode primitive types (string, number, boolean)
        value = encodeURIComponent(value);
      }
      return `${encodeURIComponent(key)}=${value}`;
    })
    .join("&");
}

export class HTTPTransport {
  get(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    if (options.data) {
      const queryString = queryStringify(options.data);
      url += queryString ? `?${queryString}` : "";
    }

    return this.request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout
    );
  }

  post(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
      options.timeout
    );
  }

  put(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
      options.timeout
    );
  }

  delete(url: string, options: Options = {}): Promise<XMLHttpRequest> {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options.timeout
    );
  }

  request(
    url: string,
    options: Options = {},
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); // create new xhr object
      xhr.open(method, url); // configure request
      xhr.timeout = timeout; // set timeout
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr);
        } else {
          reject(new Error(`Request failed with status: ${xhr.status}`));
        }
      };

      xhr.onabort = () => reject(new Error("Request was aborted"));
      xhr.onerror = () => reject(new Error("Network error occurred"));
      xhr.ontimeout = () => reject(new Error("Request timed out")); // reject promise on timeout

      if (method === METHOD.GET || !data) {
        xhr.send(); // send request
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
