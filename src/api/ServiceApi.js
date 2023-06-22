import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class ServiceApi {
  getAll = (params) => {
    const url = "/services";
    return axiosClient.get(url, { params });
  };
  getServiceHome = (params) => {
    const url = "/services/getServiceHome";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/services/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postService = (params) => {
    const url = "/services";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deleteService = (id) => {
    const url = `/services/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editService = (params) => {
    const url = `/services/${params.id}`;
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
const serviceApi = new ServiceApi();
export default serviceApi;
