import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import WeightApi from "../../../api/weightApi";
import Spinner from "../Spin/Spinner";

export default function AddWeight() {
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
      WeightApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await WeightApi.editWeight({
        weight: data.weight,
        id: id,
      });
    } else {
      await WeightApi.postWeight({
        weight: data.weight,
        status: 0,
      });
    }
    history.push("/Admin/Weight");
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Thêm cân nặng</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Cân nặng</label>
          <input
            type="text"
            {...register("weight", { required: "Không được bỏ trống" })}
          />
          {errors.weight && (
            <span className="text-danger">{errors.weight.message}</span>
          )}
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa cân nặng" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
