import { Container, TextField } from "@material-ui/core";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import DateFnsUtils from "@date-io/date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Select from "react-select";
import scheduleApi from "../../api/ScheduleApi";
import serviceApi from "../../api/ServiceApi";
import weightApi from "../../api/weightApi";
import "../../sass/RegisterService/RegisterService.scss";
import Banner from "../Banner/Banner";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

export default function RegisterService() {
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
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [weight, setWeight] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    serviceApi.getAll().then((ok) => {
      let dataOptionService = [];
      ok.data.rows.forEach((el) => {
        dataOptionService.push({ value: el.id, label: el.name });
        if (el.id == id) {
          setServiceDefault([{ value: parseInt(id), label: el.name }]);
        }
      });
      setData(dataOptionService);
    });
    weightApi.getAll().then((ok) => {
      let dataWeight = [];
      ok.data.rows.forEach((el) => {
        dataWeight.push({ value: el.id, label: el.weight });
      });
      setWeight(dataWeight);
    });
  }, []);

  const dataType = [
    { value: "chó", label: "chó" },
    { value: "mèo", label: "mèo" },
    { value: "khác", label: "khác" },
  ];
  const [typePet, setTypePet] = useState("chó");
  const [serviceDefault, setServiceDefault] = useState(null);
  const [typeService, setTypeService] = useState("Dịch vụ khám định kỳ");
  const [typeWeight, setTypeWeight] = useState("trên 20kg");
  const [date, setDate] = useState(new Date());

  const onchangeTypePet = (e) => {
    setTypePet(e.label);
  };
  const onchangeTypeService = (e) => {
    setTypeService(e.label);
  };
  const onchangeWeight = (e) => {
    setTypeWeight(e.label);
  };
  const onSubmit = (data) => {
    scheduleApi.postschedule({
      name: data.name,
      email: data.email,
      address: data.address,
      note: data.note,
      phone: data.phone,
      typePet,
      typeService,
      typeWeight,
      date,
    });
  };

  return (
    <div className="RegisterService">
      <Banner />
      <Breadcrumbs breadCrumbList={listBread} />
      <Container>
        <Container className="content">
          <div className="title">
            <div className="title_header">ĐẶT LỊCH NHANH</div>
            <small className="title_small">
              Đăng ký ngay để nhận nhiều ưu đãi nóng.
            </small>
          </div>
          <div className="form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-admin">
                <label htmlFor="">Họ và tên</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 255,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Số điện thoại</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 11,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-danger">{errors.phone.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Email liên hệ</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 255,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Địa chỉ</label>
                <input
                  type="text"
                  {...register("address", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 255,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                />
                {errors.address && (
                  <span className="text-danger">{errors.address.message}</span>
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Loại dịch vụ</label>
                {serviceDefault != null ? (
                  <Select
                    closeMenuOnSelect={false}
                    defaultValue={serviceDefault}
                    onChange={onchangeTypeService}
                    options={data}
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="input-admin">
                <label htmlFor="">Loại thú cưng</label>
                <Select
                  closeMenuOnSelect={false}
                  onChange={onchangeTypePet}
                  defaultValue={[{ value: "chó", label: "chó" }]}
                  options={dataType}
                />
              </div>
              <div className="input-admin">
                <label htmlFor="">Trọng lượng</label>
                <Select
                  closeMenuOnSelect={false}
                  onChange={onchangeWeight}
                  defaultValue={[{ value: 1, label: "15kg - 20kg" }]}
                  options={weight}
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Ngày đặt lịch"
                  inputFormat="MM/dd/yyyy"
                  minDate={new Date().setDate(new Date().getDate() + 1)}
                  value={date}
                  onChange={(e) => setDate(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <div className="input-admin">
                <label htmlFor="">Ghi chú</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Nhập một vài mô tả về tình trạng sức khoẻ của các bé để các chuyên viên của chúng tôi có thể hỗ trợ bạn tốt nhất..."
                  {...register("note", {
                    required: "Không được bỏ trống!",
                    maxLength: {
                      value: 500,
                      message: "Vượt quá ký tự cho phép",
                    },
                  })}
                ></textarea>
                {errors.note && (
                  <span className="text-danger">{errors.note.message}</span>
                )}
              </div>
              <button className="btn" type="submit">
                GỬI YÊU CẦU
              </button>
              <small className="title_small">
                Bạn sẽ sớm được liện hệ từ đội ngũ nhân viên của chúng tôi sớm.
                xin cảm ơn
              </small>
            </form>
          </div>
        </Container>
      </Container>
    </div>
  );
}
