import { Container, TextField } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import DateFnsUtils from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState, useSelector } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import scheduleApi from "../../api/ScheduleApi";
import serviceApi from "../../api/ServiceApi";
import weightApi from "../../api/weightApi";
import priceServicesApi from "../../api/priceServicesApi";
import "../../sass/RegisterService/RegisterService.scss";
import Banner from "../Banner/Banner";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import renderHTML from "react-render-html";
import userApi from "../../api/userApi";

export default function RegisterService() {
    const { url } = useRouteMatch();
    const [adminOrUser, setAdminOrUser] = useState("Admin");
  const listBread = [
    { name: "Trang chủ", link: "/" },
    { name: "Đăng ký dịch vụ" },
  ];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [weight, setWeight] = useState(null);
  const [priceservice, setPriceservice] = useState(null);
  const [priceserviceWeight, setPriceserviceWeight] = useState(null);
  const [typePet, setTypePet] = useState("chó");
  const [serviceDefault, setServiceDefault] = useState(null);
  const [typeService, setTypeService] = useState();
  const [typeWeight, setTypeWeight] = useState();
  const [date, setDate] = useState(new Date());
  const [result, setResult] = useState(0);
  const [dataTille, setDataTille] = useState(null);
  const [load, setLoad] = useState(false);
  const [inforUser, setInforUser] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [error, setError] = useState({
    name: {
        status: false,
        message: "",
    },
      email: {
        status: false,
        message: "",
    },
      address: {
        status: false,
        message: "",
    },
      note: {
        status: false,
        message: "",
    },
      phone: {
        status: false,
        message: "",
    },
      typePet: {
        status: false,
        message: "",
    },
      typeService: {
        status: false,
        message: "",
    },
      typeWeight: {
        status: false,
        message: "",
    },
      date: {
        status: false,
        message: "",
    },
  });
  useEffect(() => {
    if (id) {
        userApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    userApi.checkUser().then((okC) => {
    userApi.getOne(okC.id).then((ok) => {
        setInforUser({
            name: ok.name,
            email: ok.email,
            address: ok.address,
            phone: ok.phone,
        })
        if(adminOrUser !== "Admin") {
            reset(ok);
          }
      });
    });
    serviceApi.getAll().then((ok) => {
      let dataOptionService = [];
      ok.data.rows.forEach((el) => {
        dataOptionService.push({ value: el.id, label: el.name });
        // dataOptionService.push(el);
        if (el.id == id) {
          setServiceDefault([{ value: parseInt(id), label: el.name }]);
          if(adminOrUser !== "Admin") {
            setTypeService([{ value: el.id, label: el.name }]);
          }
          setDataTille([el])
        }
      });
      setData(dataOptionService);
    });
    // weightApi.getAll().then((ok) => {
    //   let dataWeight = [];
    //   ok.data.rows.forEach((el) => {
    //     dataWeight.push({ value: el.id, label: el.weight });
    //   });
    //   setWeight(dataWeight);
    // });
    priceServicesApi.getAll().then((ok) => {
        let dataPriceservice = [];
        let dataPriceserviceWeight = [];
        let dataWeight = [];
        ok.data.rows.forEach((el) => {
            dataPriceservice.push(el);
            if (id == el.serviceId) {
                dataPriceserviceWeight.push(el);
                weightApi.getAll().then((okW) => {
                    okW.data.rows.forEach((elW) => {
                        if (el.weightId === elW.id) {
                      dataWeight.push({ value: elW.id, label: elW.weight });
                        }
                    });
                    setWeight(dataWeight);
                  });
            }
        });
        setPriceservice(dataPriceservice);
        setPriceserviceWeight(dataPriceserviceWeight);
        setLoad(!load);
      });
      var urlSplit = url.split("/")
      setAdminOrUser(urlSplit[1])
  }, [id]);
  useEffect(() => {
    if(adminOrUser !== "Admin") {
        priceserviceWeight?.forEach((el) => {
            if ( el?.weightId === typeWeight?.value) {
                setResult(el.price)
            }
        });
    }
    else {
        priceservice?.forEach((el) => {
            if ( typeWeight?.value == el?.weightId && typeService?.value == el?.serviceId) {
                setResult(Number(el?.price).toLocaleString())
                console.log("result",result);
            }
            else if (typeWeight?.value != el?.weightId && typeService?.value != el?.serviceId) {
                setResult(0)
            }
        });
    }
  }, [load]);
  const dataType = [
    { value: "chó", label: "chó" },
    { value: "mèo", label: "mèo" },
    { value: "khác", label: "khác" },
  ];

  const onchangeTypePet = (e) => {
    setTypePet(e.label);
  };
  const onchangeTypeService = (e) => {
    setTypeService({ value: e.value, label: e.label });
    setLoad(!load);
  };
  const onchangeWeight = (e) => {
    setTypeWeight({ value: e.value, label: e.label });
    setLoad(!load);
  };
  const onSubmit = (data) => {
    if(typeof data.name === 'string' && data.name.length === 0){
        setError((prevState) => ({
            ...prevState,
            name: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(data.name.length === 255) {
        setError((prevState) => ({
            ...prevState,
            name: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            name: {
                message: "",
                status: false,
            }
          }));
    }

    if(typeof data.email === 'string' && data.email.length === 0){
        setError((prevState) => ({
            ...prevState,
            email: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(data.email.length === 255) {
        setError((prevState) => ({
            ...prevState,
            email: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!data.email.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
        setError((prevState) => ({
            ...prevState,
            email: {
                message: "Email không hợp lệ",
                status: true,
            }
        }));
    } else {
        setError((prevState) => ({
            ...prevState,
            email: {
                message: "",
                status: false,
            }
          }));
    }

    if(typeof data.address === 'string' && data.address.length === 0){
        setError((prevState) => ({
            ...prevState,
            address: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(data.address.length === 255) {
        setError((prevState) => ({
            ...prevState,
            address: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            address: {
                message: "",
                status: false,
            }
          }));
    }

    if(typeof data.phone === 'string' && data.phone.length === 0){
        setError((prevState) => ({
            ...prevState,
            phone: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(data.phone.length === 11) {
        setError((prevState) => ({
            ...prevState,
            phone: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!data.phone.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
        setError((prevState) => ({
            ...prevState,
            phone: {
                message: "Số điện thoại không hợp lệ",
                status: true,
            }
        }));
    } else {
        setError((prevState) => ({
            ...prevState,
            phone: {
                message: "",
                status: false,
            }
          }));
    }

    if(typeof data.note === 'string' && data.note.length === 0){
        setError((prevState) => ({
            ...prevState,
            note: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(data.note.length === 500) {
        setError((prevState) => ({
            ...prevState,
            note: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            note: {
                message: "",
                status: false,
            }
          }));
    }

    if(typeof typePet === 'string' && typePet.length === 0){
        setError((prevState) => ({
            ...prevState,
            typePet: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            typePet: {
                message: "",
                status: false,
            }
          }));
    }

    // if(typeWeight === undefined || Object.keys(date).length === 0){
    //     setError((prevState) => ({
    //         ...prevState,
    //         date: {
    //             message: "Không được bỏ trống!",
    //             status: true,
    //         }
    //       }));
    // } else {
    //     setError((prevState) => ({
    //         ...prevState,
    //         date: {
    //             message: "",
    //             status: false,
    //         }
    //       }));
    // }

    if(typeWeight === undefined || Object.keys(typeWeight).length === 0){
        setError((prevState) => ({
            ...prevState,
            typeWeight: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            typeWeight: {
                message: "",
                status: false,
            }
          }));
    }

    if(typeService === undefined || Object.keys(typeService).length === 0){
        setError((prevState) => ({
            ...prevState,
            typeService: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            typeService: {
                message: "",
                status: false,
            }
          }));
    }

    if(!error.name.status
        && !error.email.status
        && !error.address.status
        && !error.note.status
        && !error.phone.status
        // && !error.date.status
        && !error.typePet.status
        && !error.typeService.status
        && !error.typeWeight.status ) {
        scheduleApi.postschedule({
        name: data.name,
        email: data.email,
        address: data.address,
        note: data.note,
        phone: data.phone,
        status: 0,
        typePet,
        typeService: typeService.label,
        typeWeight: typeWeight.label,
        date,
        result,
        });
        {adminOrUser !== "Admin"?
        history.push("/")
        : history.push("/Admin/Schedule");
        }
        // history.push("/");
        }
  };

  return (
    <div className="RegisterService">
    {adminOrUser !== "Admin" ?
        <>
            <Banner />
            <Breadcrumbs breadCrumbList={listBread} />
        </>
        :
        null
        }
      <Container>
        <Container className="content">
          <div className="title">
          {adminOrUser !== "Admin" ?
            <>
            {/* <div className="title_header">ĐẶT LỊCH NHANH</div>
                <small className="title_small">
                Đăng ký ngay để nhận nhiều ưu đãi nóng.
                </small> */}
                {dataTille?.map((ok, index) => (
                <div className="post-item" key={index}>
                    <div className="icon">{renderHTML(ok.icon)}</div>
                    <div className="description">{ok.description}</div>
                </div>
            ))}
            </>
            :
            null
            }
          </div>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-admin">
                <label htmlFor="">Họ và tên</label>
                <input
                  type="text"
                //   value={inforUser.name}
                  {...register("name", {})}
                />
                {error.name.status && (
                  <span className="text-danger">{error.name.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Số điện thoại</label>
                <input
                  type="text"
                  {...register("phone", {})}
                />
                {/* {errors.phone && (
                  <span className="text-danger">{errors.phone.message}</span>
                )} */}
                 {error.phone.status && (
                    <span className="text-danger">{error.phone.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Email liên hệ</label>
                <input
                  type="email"
                  {...register("email", {})}
                />
                {/* {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )} */}
                {error.email.status && (
                    <span className="text-danger">{error.email.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Địa chỉ</label>
                <input
                  type="text"
                  {...register("address", {})}
                />
                {error.address.status && (
                  <span className="text-danger">{error.address.message}</span>
                )}
              </div>
              <div className="input-admin">
                {adminOrUser == "Admin" ?
                    <>
                    <label htmlFor="">Loại dịch vụ</label>
                    {serviceDefault != null ? (
                        <>
                    <Select
                        closeMenuOnSelect={true}
                        // defaultValue={serviceDefault}
                        onChange={onchangeTypeService}
                        options={data}
                    />
                    {error.typeService.status && (
                        <span className="text-danger">{error.typeService.message}</span>
                    )}
                      </>
                    ) : (
                    ""
                    )}
                    </>
                    :
                    null
                    }
              </div>
              <div className="input-admin">
                <label htmlFor="">Loại thú cưng</label>
                <Select
                  closeMenuOnSelect={true}
                  onChange={onchangeTypePet}
                  defaultValue={[{ value: "chó", label: "chó" }]}
                  options={dataType}
                />
                {error.typePet.status && (
                    <span className="text-danger">{error.typePet.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Trọng lượng</label>
                <Select
                  closeMenuOnSelect={true}
                  onChange={onchangeWeight}
                //   defaultValue={[{ value: 1, label: "15kg - 20kg" }]}
                  options={weight}
                />
                {error.typeWeight.status && (
                  <span className="text-danger">{error.typeWeight.message}</span>
                )}
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                {/* <TimePicker
                    label="Controlled picker"
                    // value={value}
                    // onChange={(newValue) => setValue(newValue)}
                    /> */}
                <DateTimePicker
                  label="Ngày đặt lịch"
                  inputFormat="HH:mm dd/MM/yyyy"
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  value={date}
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
                {/* {error.date.status && (
                    <span style={{ color: "#f75a3f" }}>{error.date.message}</span>
                )} */}
              </LocalizationProvider>
              <div className="input-admin">
                <label htmlFor="">Ghi chú</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Nhập một vài mô tả về tình trạng sức khoẻ của các bé để các chuyên viên của chúng tôi có thể hỗ trợ bạn tốt nhất..."
                  {...register("note", {})}
                ></textarea>
                {error.note.status && (
                  <span className="text-danger">{error.note.message}</span>
                )}
              </div>
              {/* <div className="input-admin"> */}
                <div className="result">Thành tiền: {result}vnđ</div>
              {/* </div> */}
              <button className="btn" type="submit">
                GỬI YÊU CẦU
              </button>
              {adminOrUser !== "Admin" ?
                <>
                <small className="title_small">
                    Bạn sẽ sớm được liện hệ từ đội ngũ nhân viên của chúng tôi sớm.
                    xin cảm ơn
                </small>
                </>
                :
                null
                }
            </form>
          </div>
        </Container>
      </Container>
    </div>
  );
}
