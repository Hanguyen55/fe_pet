import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import ServiceApi from "../../../api/ServiceApi";
import Spinner from "../Spin/Spinner";

export default function AddService() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const { loadSpin } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (id) {
      ServiceApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await ServiceApi.editService({
        name: data.name,
        icon: data.icon,
        description: data.description,
        id: id,
      });
    } else {
      await ServiceApi.postService({
        name: data.name,
        icon: data.icon,
        description: data.description,
        status: 0,
      });
    }
    history.push("/Admin/Service");
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Thêm dịch vụ</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên dịch vụ</label>
          <input
            type="text"
            {...register("name", { required: "Không được bỏ trống" })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Icon dịch vụ</label>
          <input
            type="text"
            {...register("icon", {
              required: "Không được bỏ trống",
              maxLength: { value: 2000, message: "Vượt quá ký tự cho phép" },
            })}
          />
          {errors.icon && (
            <span className="text-danger">{errors.icon.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Mô tả dịch vụ</label>
          <textarea
            name=""
            id=""
            rows="5"
            {...register("description", {
              required: "Không được bỏ trống",
              maxLength: { value: 1000, message: "Vượt quá ký tự cho phép" },
            })}
          ></textarea>

          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa dịch vụ" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
