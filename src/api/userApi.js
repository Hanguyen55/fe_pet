import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";
class UserApi {
  getAll = (params) => {
    const url = "/users";
    return axiosClient.get(url, { params });
  };
  checkUser = (params) => {
    const url = `/users/checkUser`;
    if (localStorage.getItem("tokenPet")) {
      return axiosClient.get(url).then((data) => {
        return data.data.user;
      });
    } else {
      return [];
    }
  };
  getOne = (params) => {
    const url = `/users/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postuser = (params) => {
    const url = "/users";
    return axiosClient.post(url, params);
  };
  deleteuser = (id) => {
    const url = `/users/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  edituser = (params) => {
    const url = `/users/${params.id}`;
    return axiosClient
      .patch(url, params)
      .then((data) => {
        messageShowSuccess("Sửa thông tin thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
}
const userApi = new UserApi();
export default userApi;
