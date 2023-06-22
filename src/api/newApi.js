import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class NewApi {
  getAll = (params) => {
    const url = "/news";
    return axiosClient.get(url, { params });
  };
  getNewHome = (params) => {
    const url = "/news/newHome";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/news/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  getOtherNews = (params) => {
    const url = `/news/otherNews/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postnew = (params) => {
    const url = "/news";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deletenew = (id) => {
    const url = `/news/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editnew = (params) => {
    const url = `/news/${params.id}`;
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
const newApi = new NewApi();
export default newApi;
