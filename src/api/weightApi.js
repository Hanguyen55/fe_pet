import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class WeightApi {
  getAll = (params) => {
    const url = "/weights";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/weights/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postWeight = (params) => {
    const url = "/weights";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deleteWeight = (id) => {
    const url = `/weights/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editWeight = (params) => {
    const url = `/weights/${params.id}`;
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
const weightApi = new WeightApi();
export default weightApi;
