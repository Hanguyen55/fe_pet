import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";
class RevenueApi {
    getAll = (params) => {
        const url = "/revenues";
        return axiosClient.get(url, { params });
      };
}
const revenueApi = new RevenueApi();
export default revenueApi;