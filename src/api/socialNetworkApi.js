import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class SocialNetworkApi {
  getAll = (params) => {
    const url = "/socialNetworks";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/socialNetworks/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postsocialNetwork = (params) => {
    const url = "/socialNetworks";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletesocialNetwork = (id) => {
    const url = `/socialNetworks/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editsocialNetwork = (params) => {
    const url = `/socialNetworks/${params.id}`;
    return axiosClient
      .patch(url, params)
      .then((data) => {
        messageShowSuccess("Sửa thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
}
const socialNetworkApi = new SocialNetworkApi();
export default socialNetworkApi;
