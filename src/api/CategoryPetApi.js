import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class CategoryPetApi {
  getAll = (params) => {
    const url = "/categorysPet";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/categorysPet/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  countTypePet = (params) => {
    const url = "/categorysPet/all";
    return axiosClient.get(url, { params });
  };
  postcategory = (params) => {
    const url = "/categorysPet";
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
    const url = `/categorysPet/${id}`;
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
    const url = `/categorysPet/${params.id}`;
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
const categoryPetApi = new CategoryPetApi();
export default categoryPetApi;
