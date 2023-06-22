import axiosClient from "./axiosClient";

class TagNewApi {
  getAll = (params) => {
    const url = "/tagNews";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/tagNews/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  posttagNew = (params) => {
    const url = "/tagNews";
    return axiosClient.post(url, params);
  };
  deletetagNew = (id) => {
    const url = `/tagNews/${id}`;
    return axiosClient.delete(url);
  };
}
const tagNewApi = new TagNewApi();
export default tagNewApi;
