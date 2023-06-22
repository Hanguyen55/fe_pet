import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import tagApi from "../../../api/tagApi";
import Spinner from "../Spin/Spinner";

export default function AddTag() {
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
      tagApi.getOne(id).then((ok) => {
        reset(ok);
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    if (id) {
      await tagApi.edittag({
        name: data.name,
        id: id,
      });
    } else {
      await tagApi.posttag({
        name: data.name,
        status: 0,
      });
    }
    history.push("/Admin/Tag");
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Thêm tag</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên tag</label>
          <input
            type="text"
            {...register("name", { required: "Không được bỏ trống!" })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa tag" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
