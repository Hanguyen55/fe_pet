import axiosClient from "./axiosClient";

class LoginApi {
  login = (params) => {
    const url = "/login";
    return axiosClient.post(url, params);
  };
}
const loginApi = new LoginApi();
export default loginApi;
