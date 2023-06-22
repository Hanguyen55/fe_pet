import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";

class ScheduleApi {
  getAll = (params) => {
    const url = "/schedules";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/schedules/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  postschedule = (params) => {
    const url = "/schedules";
    return axiosClient
      .post(url, params)
      .then((data) => {
        messageShowSuccess("Thêm mới thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  deleteschedule = (id) => {
    const url = `/schedules/${id}`;
    return axiosClient
      .delete(url)
      .then((data) => {
        messageShowSuccess("Xoá thành công!");
      })
      .catch((err) => {
        messageShowErr("Có lỗi xảy ra!");
      });
  };
  editschedule = (params) => {
    const url = `/schedules/${params.id}`;
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
const scheduleApi = new ScheduleApi();
export default scheduleApi;
