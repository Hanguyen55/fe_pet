
import { messageShowErr, messageShowSuccess } from "../function";
import axiosClient from "./axiosClient";
class RevenueServicesApi {
    getAll = (params) => {
        const url = "/revenueServices";
        return axiosClient.get(url, { params });
      };
}
const revenueServicesApi = new RevenueServicesApi();
export default revenueServicesApi;