import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class CategoryApi {
  getAll = (params) => {
    const url = "/categorys";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/categorys/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postcategory = (params) => {
    const url = "/categorys";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletecategory = (id) => {
    const url = `/categorys/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editcategory = (params) => {
    const url = `/categorys/${params.id}`;
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
const categoryApi = new CategoryApi();
export default categoryApi;
