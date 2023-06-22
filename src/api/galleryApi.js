import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class GalleryApi {
  getAll = (params) => {
    const url = "/galleries";
    return axiosClient.get(url, { params });
  };
  getGalleryHome = (params) => {
    const url = "/galleries/getGalleryHome";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/galleries/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postGallery = (params) => {
    const url = "/galleries";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deleteGallery = (id) => {
    const url = `/galleries/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editGallery = (params) => {
    const url = `/galleries/${params.id}`;
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
const galleryApi = new GalleryApi();
export default galleryApi;
