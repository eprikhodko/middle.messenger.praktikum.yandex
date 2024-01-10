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

    // @ts-ignore
    global.XMLHttpRequest = xhr;

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
    instance.post(AUTH_API.SIGN_UP);

    const [request] = requests;

    expect(request.method).to.eq(METHOD.POST);
  });

  describe("Auth handling", () => {
    it(`.post(${
      AUTH_API.BASE_URL + AUTH_API.SIGN_UP
    }) should send POST request to the correct sign up url`, () => {
      instance.post(AUTH_API.SIGN_UP);

      const [request] = requests;

      expect(request.url).to.eq(
        API.API_URL + AUTH_API.BASE_URL + AUTH_API.SIGN_UP
      );
    });

    it(`.post(${
      AUTH_API.BASE_URL + AUTH_API.SIGN_UP
    }, data) should send POST request with correct signup url and payload`, () => {
      const mockDataPayload = {
        first_name: "user_first-name",
        second_name: "user_second-name",
        login: "test-login",
        email: "testemail@gmail.com",
        password: "123456",
        phone: "123321123",
      };

      instance.post(AUTH_API.SIGN_UP, mockDataPayload);

      const [request] = requests;

      console.log(request);

      expect(request.url).to.eq(
        API.API_URL + AUTH_API.BASE_URL + AUTH_API.SIGN_UP
      );

      expect(JSON.parse(request.requestBody)).to.deep.equal(mockDataPayload);
    });
  });
});
