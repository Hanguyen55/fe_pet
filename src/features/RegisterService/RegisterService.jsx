import { Container, TextField } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
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
import categoryPetApi from "../../api/CategoryPetApi";
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
  const [categoryPet, setCategoryPet] = useState(null);
  const [priceservice, setPriceservice] = useState(null);
  const [priceserviceWeight, setPriceserviceWeight] = useState(null);
  const [petId, setTypePet] = useState('');
  const [serviceId, setTypeService] = useState('');
  const [weightId, setTypeWeight] = useState('');
  const [date, setDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, -8));
  const [result, setResult] = useState(0);
  const [dataTille, setDataTille] = useState(null);
  const [load, setLoad] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState();
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
      petId: {
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
      date: {
        status: false,
        message: "",
    },
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    serviceApi.getAll().then((ok) => {
      let dataOptionService = [];
      ok.data.rows.forEach((el) => {
        dataOptionService.push({ value: el.id, label: el.name });
        if (el.id == id) {
            setTypeService({ value: el.id, label: el.name });
        //   if(adminOrUser !== "Admin") {
        //     setTypeService([{ value: el.id, label: el.name }]);
        //   }
          setDataTille([el])
        }
      });
      setData(dataOptionService);
    });
    categoryPetApi.getAll({ status: 1 }).then((ok) => {
      let dataCategoryPet = [];
      ok.data.rows.forEach((el) => {
        dataCategoryPet.push({ value: el.id, label: el.name });
      });
      setCategoryPet(dataCategoryPet);
    });
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
      });
      var urlSplit = url.split("/")
      setAdminOrUser(urlSplit[1])
      setLoad(!load);
  }, [id]);
  useEffect(() => {
    userApi.checkUser().then((okC) => {
        userApi.getOne(okC.id).then((ok) => {
            if(adminOrUser !== "Admin") {
                setName(ok.name);
                setPhone(ok.phone);
                setEmail(ok.email);
                setAddress(ok.address);
              }
              setUserId(ok.id);
          });
        });
    if(adminOrUser !== "Admin") {
        priceserviceWeight?.forEach((el) => {
            if ( el?.weightId === weightId?.value) {
                setResult(el?.price)
            }
        });
    }
    else {
        priceservice?.forEach((el) => {
            if ( weightId?.value == el?.weightId && serviceId?.value == el?.serviceId) {
                setResult(el?.price)
            }
            else if (weightId?.value != el?.weightId && serviceId?.value != el?.serviceId) {
                setResult(0)
            }
        });
    }
  }, [load]);

  const onchangeTypePet = (e) => {
    if(e === undefined || Object.keys(e).length === 0){
        setError((prevState) => ({
            ...prevState,
            petId: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            petId: {
                message: "",
                status: false,
            }
          }));
    }
    setTypePet(e);
  };
  const onchangeTypeService = (e) => {
    if(adminOrUser === "Admin") {
    if(e === undefined || Object.keys(e).length === 0){
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
    setTypeService(e);
}
    setLoad(!load);
  };
  const onchangeWeight = (e) => {
    if(e === undefined || Object.keys(e).length === 0){
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
    setTypeWeight(e);
    setLoad(!load);
  };
  const handleCheckName = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            name: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
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
    setName(e)
  };
  const handleCheckPhone = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            phone: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 11) {
        setError((prevState) => ({
            ...prevState,
            phone: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!e.match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
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
    setPhone(e)
  };
  const handleCheckEmail = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            email: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
        setError((prevState) => ({
            ...prevState,
            email: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!e.match(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/)) {
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
    setEmail(e)
  };
  const handleCheckAddress = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            address: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
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
    setAddress(e)
  }
  const handleCheckDate = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            date: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            date: {
                message: "",
                status: false,
            }
          }));
    }
    setDate(e)
  }
  const onSubmit = (data) => {
    if(name !==''
        && email !==''
        && address !==''
        && phone !==''
        && petId !==''
        && serviceId !==''
        && weightId !==''
        ) {
        scheduleApi.postschedule({
        name,
        email,
        address,
        note: data.note,
        phone,
        useId: userId,
        status: 0,
        petId: petId?.value,
        serviceId: serviceId?.value,
        weightId: weightId?.value,
        date,
        result,
        });
        // {adminOrUser !== "Admin"?
        // history.push("/")
        // : history.push("/Admin/Schedule");
        // }
        // history.push("/");
        }  else {
            if(typeof name === 'string' && name.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    name: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
            if(typeof email === 'string' && email.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    email: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
            if(typeof address === 'string' && address.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    address: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
            if(typeof phone === 'string' && phone.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    phone: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
            if(typeof petId === 'string' && petId.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    petId: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
            if(typeof serviceId === 'string' && serviceId.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    serviceId: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
            if(typeof weightId === 'string' && weightId.length === 0){
                setError((prevState) => ({
                    ...prevState,
                    weightId: {
                        status: true,
                        message: "Không được bỏ trống!",
                    },
                  }));
            }
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
                <TextField
                label=" "
                id="outlined-basic"
                variant="outlined"
                InputLabelProps={{shrink: false}}
                value={name}
                onChange={(e) => handleCheckName(e.target.value)}
            />
                {error.name.status && (
                  <span className="text-danger">{error.name.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Số điện thoại</label>
                <TextField
                label=" "
                id="outlined-basic"
                variant="outlined"
                InputLabelProps={{shrink: false}}
                value={phone}
                onChange={(e) => handleCheckPhone(e.target.value)}
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
                <TextField
                label=" "
                id="outlined-basic"
                variant="outlined"
                InputLabelProps={{shrink: false}}
                value={email}
                onChange={(e) => handleCheckEmail(e.target.value)}
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
                <TextField
                label=" "
                id="outlined-basic"
                variant="outlined"
                InputLabelProps={{shrink: false}}
                value={address}
                onChange={(e) => handleCheckAddress(e.target.value)}
            />
                {error.address.status && (
                  <span className="text-danger">{error.address.message}</span>
                )}
              </div>
              <div className="input-admin">
                {adminOrUser == "Admin" ?
                    <>
                    <label htmlFor="">Loại dịch vụ</label>
                    <Select
                        closeMenuOnSelect={true}
                        onChange={onchangeTypeService}
                        options={data}
                    />
                    {error.serviceId.status && (
                        <span className="text-danger">{error.serviceId.message}</span>
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
                //   defaultValue={[{ value: 1, label: "chó" }]}
                  options={categoryPet}
                />
                {error.petId.status && (
                    <span className="text-danger">{error.petId.message}</span>
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
                {error.weightId.status && (
                  <span className="text-danger">{error.weightId.message}</span>
                )}
              </div>
              {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
                {/* <TimePicker
                    label="Controlled picker"
                    // value={value}
                    // onChange={(newValue) => setValue(newValue)}
                    /> */}
                    <div className="input-admin">
                <label htmlFor="">Ngày đặt lịch</label>
                {/* <DateTimePicker
                  label=""
                //   inputFormat="HH:mm dd/MM/yyyy"
                type="time"
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  value={date}
                  onChange={(e) => setDate(e)}
                  views={['year', 'day', 'hours', 'minutes', 'seconds']}
                  renderInput={(params) => <TextField {...params} />}
                /> */}
                <input
                type="datetime-local"
                value={date}
                onChange={(e) => handleCheckDate(e.target.value)}
                min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, -8)} />
                {error.date.status && (
                    <span style={{ color: "#f75a3f" }}>{error.date.message}</span>
                )}
                </div>
              {/* </LocalizationProvider> */}
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
                {/* <TextField
                // id="outlined-basic"
                    label=""
                    id="outlined-textarea-basic"
                variant="outlined"
                    multiline
                    rows={4}
                    // InputLabelProps={{shrink: false}}
                    placeholder="Nhập một vài mô tả về tình trạng sức khoẻ của các bé để các chuyên viên của chúng tôi có thể hỗ trợ bạn tốt nhất..."
                    /> */}
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
