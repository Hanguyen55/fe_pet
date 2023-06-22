import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class BillApi {
  getAll = (params) => {
    const url = "/bills";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/bills/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postbill = (params) => {
    const url = "/bills";
    return axiosClient
      .post(url, params)
      .then((data) => {
        // messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletebill = (id) => {
    const url = `/bills/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editbill = (params) => {
    const url = `/bills/${params.id}`;
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
const billApi = new BillApi();
export default billApi;
