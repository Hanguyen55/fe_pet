import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class ProductApi {
  getAll = (params) => {
    const url = "/products";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/products/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postproduct = (params) => {
    const url = "/products";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deleteproduct = (id) => {
    const url = `/products/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editproduct = (params) => {
    const url = `/products/${params.id}`;
    return axiosClient
      .patch(url, params)
      .then((data) => {
        messageShowSuccess("Sửa thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  updateQuantityProduct = (params) => {
    const url = `/products/quantity`;
    return axiosClient
      .patch(url, params)
      .then((data) => {})
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
}
const productApi = new ProductApi();
export default productApi;
