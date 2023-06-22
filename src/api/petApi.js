import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class PetApi {
  getAll = (params) => {
    const url = "/pets";
    return axiosClient.get(url, { params });
  };
  countTypePet = () => {
    const url = "/pets/countTypePet";
    return axiosClient.get(url);
  };
  getShop = (params) => {
    const url = "/shops";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/pets/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  getCheckAdmin = (params) => {
    const url = `/pets/checkPet`;
    return axiosClient.get(url, { params }).then((data) => {
      return data.data;
    });
  };
  getPetUser = (params) => {
    const url = `/pets/getPetUser/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postpet = (params) => {
    console.log("PetApi ~ params", params);
    const url = "/pets";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Tạo mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  updateQuantityPet = (params) => {
    const url = `/pets/update/quantity`;
    return axiosClient
      .patch(url, params)
      .then((data) => {})
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletepet = (id) => {
    const url = `/pets/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editpet = (params) => {
    const url = `/pets/${params.id}`;
    return axiosClient.patch(url, params);
  };
}
const petApi = new PetApi();
export default petApi;
