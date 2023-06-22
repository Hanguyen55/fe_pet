import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class TagApi {
  getAll = (params) => {
    const url = "/tags";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/tags/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  posttag = (params) => {
    const url = "/tags";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletetag = (id) => {
    const url = `/tags/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  edittag = (params) => {
    const url = `/tags/${params.id}`;
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
const tagApi = new TagApi();
export default tagApi;
