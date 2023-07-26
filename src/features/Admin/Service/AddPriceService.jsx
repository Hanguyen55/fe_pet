import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import ServiceApi from "../../../api/ServiceApi";
import priceServicesApi from "../../../api/priceServicesApi";
import weightApi from "../../../api/weightApi";
import Spinner from "../Spin/Spinner";
import Select from "react-select";
import "../../../sass/Admin/PriceService.scss";

export default function AddPriceService() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const [dataWeight, setDataWeight] = useState([]);
  const [dataService, setDataService] = useState([]);
  const [serviceId, setTypeService] = useState();
  const [weightId, setTypeWeight] = useState();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({
    price: {
        status: false,
        message: "",
    },
      serviceId: {
        status: false,
        message: "",
    },
      weightId: {
        status: false,
        message: "",
    },
  });
  const { loadSpin } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    weightApi.getAll().then((ok) => {
        let dataWeight = [];
        ok.data.rows.forEach((el) => {
            dataWeight.push({ value: el.id, label: el.weight })
        });
        setDataWeight(dataWeight);
    });
    ServiceApi.getAll().then((ok) => {
        let dataService = [];
        ok.data.rows.forEach((el) => {
            dataService.push({ value: el.id, label: el.name });
        });
        setDataService(dataService);
    });
    if (id) {
    priceServicesApi.getOne(id).then((okP) => {
        weightApi.getAll().then((ok) => {
            ok.data.rows.forEach((el) => {
                if(el.id === okP.weightId) {
                    setTypeWeight({ value: el.id, label: el.weight });
                }
            });
        });
        ServiceApi.getAll().then((ok) => {
            ok.data.rows.forEach((el) => {
                if(el.id === okP.serviceId) {
                    setTypeService({ value: el.id, label: el.name });
                }
            });
        });
        reset(okP);
      });
    }
    // setLoad(!load);
  }, [load]);
  const onchangeTypeService = (e) => {
    setTypeService({ value: e.value, label: e.label });
    // setLoad(!load);
  };
  const onchangeWeight = (e) => {
    setTypeWeight({ value: e.value, label: e.label });
    // setLoad(!load);
  };
  const history = useHistory();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if(typeof data.price === 'string' && data.price.length === 0){
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(data.price.length === 255) {
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "",
                status: false,
            }
          }));
    }

    if(weightId === undefined || Object.keys(weightId).length === 0){
        setError((prevState) => ({
            ...prevState,
            weightId: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            weightId: {
                message: "",
                status: false,
            }
          }));
    }

    if(serviceId === undefined || Object.keys(serviceId).length === 0){
        setError((prevState) => ({
            ...prevState,
            serviceId: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            serviceId: {
                message: "",
                status: false,
            }
          }));
    }
    if(!error.price.status
        && !error.serviceId.status
        && !error.weightId.status ) {
        if (id) {
        await priceServicesApi.editPriceServices({
            price: data.price,
            weightId : weightId.value,
            serviceId : serviceId.value,
            id: id,
        });
        } else {
        await priceServicesApi.postPriceServices({
            price: data.price,
            weightId : weightId.value,
            serviceId : serviceId.value,
        });
        }
        history.push("/Admin/PriceService");
    }
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
        <h3>{!id ? "Thêm giá dịch vụ" : "Sửa giá dịch vụ"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên dịch vụ</label>
          <Select
                  closeMenuOnSelect={true}
                  onChange={onchangeTypeService}
                //   defaultValue={[{ value: serviceId?.value, label: serviceId?.value }]}
                value={serviceId}
                  options={dataService}
                />
                {error.serviceId.status && (
                  <span className="text-danger">{error.serviceId.message}</span>
                )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Cân nặng</label>
          <Select
                  closeMenuOnSelect={true}
                  onChange={onchangeWeight}
                  value={weightId}
                  options={dataWeight}
                />
                {error.weightId.status && (
                  <span className="text-danger">{error.weightId.message}</span>
                )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Giá</label>
          <input
            type="number"
            {...register("price", {})}
          />
          {error.price.status && (
                  <span className="text-danger">{error.price.message}</span>
                )}
        </div>
        <div className="btn_submit">
          {id ? (
            <input type="submit" value="Sửa giá dịch vụ" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
      </div>
    </div>
  );
}
