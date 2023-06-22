import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class ContactApi {
  getAll = (params) => {
    const url = "/contacts";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/contacts/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postcontact = (params) => {
    const url = "/contacts";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletecontact = (id) => {
    const url = `/contacts/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editcontact = (params) => {
    const url = `/contacts/${params.id}`;
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
const contactApi = new ContactApi();
export default contactApi;
