import axiosClient from "./axiosClient";

class TagProductApi {
  getAll = (params) => {
    const url = "/tagProducts";
    return axiosClient.get(url, { params });
  };
  getOne = (params) => {
    const url = `/tagProducts/${params}`;
    return axiosClient.get(url).then((data) => {
      return data.data;
    });
  };
  posttagProduct = (params) => {
    const url = "/tagProducts";
    return axiosClient.post(url, params);
  };
  deletetagProduct = (id) => {
    const url = `/tagProducts/${id}`;
    return axiosClient.delete(url);
  };
}
const tagProductApi = new TagProductApi();
export default tagProductApi;
