import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class PriceServicesApi {
  getAll = (params) => {
    const url = "/priceServices";
    return axiosClient.get(url, { params });
  };
  getAllPrice = (params) => {
    const url = "/priceServices/all";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/priceServices/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postPriceServices = (params) => {
    const url = "/priceServices";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletePriceServices = (id) => {
    const url = `/priceServices/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editPriceServices = (params) => {
    const url = `/priceServices/${params.id}`;
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
const priceServicesApi = new PriceServicesApi();
export default priceServicesApi;
