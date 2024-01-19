import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTPTransport, { METHOD } from "./HTTPTransport.js";
import { expect } from "chai";
import { API, AUTH_API } from "./enums.js";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  let requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    global.XMLHttpRequest = xhr as unknown as typeof XMLHttpRequest;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };

    instance = new HTTPTransport(AUTH_API.BASE_URL);
  });

  afterEach(() => {
    requests = [];
  });

  it(".get() should send GET request", () => {
    instance.get(AUTH_API.USER);

    const [request] = requests;

    expect(request.method).to.eq(METHOD.GET);
  });

  it(".post() should send POST request", () => {
    instance.post(AUTH_API.USER);

    const [request] = requests;

    expect(request.method).to.eq(METHOD.POST);
  });

  it(".put() should send PUT request", () => {
    instance.put(AUTH_API.USER);

    const [request] = requests;

    expect(request.method).to.eq(METHOD.PUT);
  });

  it(".delete() should send DELETE request", () => {
    instance.delete(AUTH_API.USER);

    const [request] = requests;

    expect(request.method).to.eq(METHOD.DELETE);
  });

  it("should send a request to a correct passed url", () => {
    instance.get(AUTH_API.USER);

    const [request] = requests;

    expect(request.url).to.eq(API.API_URL + AUTH_API.BASE_URL + AUTH_API.USER);
  });

  it("should send a request with the correct request body", () => {
    const mockDataPayload = {
      first_name: "user_first-name",
      second_name: "user_second-name",
      login: "test-login",
      email: "testemail@gmail.com",
      password: "123456",
      phone: "123321123",
    };

    instance.post(AUTH_API.USER + AUTH_API.SIGN_UP, mockDataPayload);

    const [request] = requests;

    expect(JSON.parse(request.requestBody)).to.deep.equal(mockDataPayload);
  });

  it("should send a request with 'Content-Type: application/json' headers", () => {
    instance.get(AUTH_API.USER);

    const [request] = requests;

    expect(request.requestHeaders["Content-Type"]).to.include(
      "application/json",
      "Request does not have 'Content-Type: application/json' header"
    );
  });

  it("should return the correct response", async () => {
    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      setTimeout(() => {
        request.respond(
          200,
          { "Content-Type": "application/json" },
          '{ "id": 123, "first_name": "Petya", "second_name": "Pupkin", "display_name": "Petya Pupkin", "phone": "+79001001100", "login": "userLogin", "avatar": "/path/to/avatar.jpg", "email": "string@ya.ru" }'
        );
      }, 50);
    };

    const response = await instance.get(AUTH_API.USER);

    expect(response).to.deep.equal(
      {
        id: 123,
        first_name: "Petya",
        second_name: "Pupkin",
        display_name: "Petya Pupkin",
        phone: "+79001001100",
        login: "userLogin",
        avatar: "/path/to/avatar.jpg",
        email: "string@ya.ru",
      },
      "Response does not match the expected value"
    );
  });
});
