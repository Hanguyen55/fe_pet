import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class ImgPetApi {
  getAll = (params) => {
    const url = "/imgPets";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/imgPets/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postimgPet = (params) => {
    const url = "/imgPets";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deleteimgPet = (id) => {
    const url = `/imgPets/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editimgPet = (params) => {
    const url = `/imgPets/${params.id}`;
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
const imgPetApi = new ImgPetApi();
export default imgPetApi;
