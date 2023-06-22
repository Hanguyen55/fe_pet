import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import petApi from "../../../api/petApi";
import userApi from "../../../api/userApi";
import { storage } from "../../../firebase";
import { messageShowSuccess } from "../../../function";
import { camera } from "../../Admin/svg/IconSvg";
import Mutil from "../Multi/Mutil";

export default function CreatePet() {
  const [state, setState] = useState({
    linkImgPet: "",
    nameImgPet: "",
    imgPet: "",
    imgIdPet: "",
    mutilImgPet: "",
    userId: "",
    load: false,
    type: "",
  });
  const {
    linkImgPet,
    nameImgPet,
    mutilImgPet,
    imgPet,
    imgIdPet,
    userId,
    type,
    load,
  } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [text, setText] = useState(null);
  const hangdelimagePet = (e) => {
    setState({
      ...state,
      linkImgPet: URL.createObjectURL(e.target.files[0]),
      nameImgPet: e.target.files[0].name,
      imgPet: e.target.files[0],
    });
  };
  useEffect(() => {
    userApi.checkUser().then((ok) => {
      setState({ ...state, userId: ok.id });
    });
  }, []);
  const onchangeType = (e) => {
    setState({ ...state, type: e.value });
  };
  const onSubmit = async (data) => {
    setState({ ...state, load: !load });
    messageShowSuccess("Vui vòng đợi trong giây lát!");
    await storage.ref(`imagesPet/${imgPet.name}`).put(imgPet);
    const anh = await storage
      .ref("imagesPet")
      .child(imgPet.name)
      .getDownloadURL();
    var imgpet = [];
    for (let i = 0; i < mutilImgPet.length; i++) {
      await storage.ref(`imagesPet/${mutilImgPet[i].name}`).put(mutilImgPet[i]);
      var imgPets = await storage
        .ref("imagesPet")
        .child(mutilImgPet[i].name)
        .getDownloadURL();
      imgpet.push({ link: imgPets });
    }
    console.log("he", {
      name: data.name,
      price: data.price,
      description: data.description,
      text: text,
      avatar: anh,
      type: type,
      userId: userId,
      imgpet,
      status: 0,
    });
    petApi.postpet({
      name: data.name,
      price: data.price,
      quantity: data.quantity,
      description: data.description,
      text: text,
      avatar: anh,
      type: type,
      userId: userId,
      imgpet,
      checkAdmin: 1,
      status: 0,
    });
  };
  const hangdleMutilImg = (e) => {
    setState({ ...state, mutilImgPet: e });
  };
  const dataType = [
    { value: "chó", label: "chó" },
    { value: "mèo", label: "mèo" },
    { value: "khác", label: "khác" },
  ];
  return (
    <div className="tab-pane">
      <div className="CreateAdmin">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-admin">
            <label htmlFor="">Ảnh đại diện</label>
            <div className="update">
              <div className="icon-avatar">
                <label htmlFor="avatarPet">{camera}</label>
                <input
                  type="file"
                  name=""
                  id="avatarPet"
                  hidden
                  onChange={hangdelimagePet}
                />
              </div>
              {linkImgPet ? (
                <img
                  src={linkImgPet}
                  className="img-update"
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : imgIdPet ? (
                <img
                  src={imgIdPet}
                  className="img-update"
                  height="150px"
                  width="250px"
                  alt=""
                />
              ) : (
                ""
              )}
              <br />
              <span>{nameImgPet}</span>
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Ảnh liên quan</label>
            <Mutil mutilImg={hangdleMutilImg} />
          </div>
          <div className="input-admin">
            <label htmlFor="">Tiêu đề</label>
            <input
              type="text"
              {...register("name", {
                required: "Không được bỏ trống!",
                maxLength: { value: 255, message: "Vượt quá ký tự cho phép" },
              })}
            />
            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}
          </div>
          <div className="input-admin">
            <label htmlFor="">Giá</label>
            <input
              type="number"
              {...register("price", {
                required: "Không được bỏ trống!",
                maxLength: { value: 255, message: "Vượt quá ký tự cho phép" },
              })}
            />
            {errors.price && (
              <span className="text-danger">{errors.price.message}</span>
            )}
          </div>
          <div className="input-admin">
            <label htmlFor="">Số lượng</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Không được bỏ trống!",
                maxLength: { value: 255, message: "Vượt quá ký tự cho phép" },
              })}
            />
            {errors.quantity && (
              <span className="text-danger">{errors.quantity.message}</span>
            )}
          </div>
          <div className="input-admin">
            <label htmlFor="">Mô tả</label>
            <textarea
              name=""
              id=""
              rows="5"
              {...register("description", {
                required: "Không được bỏ trống!",
                maxLength: { value: 1000, message: "Vượt quá ký tự cho phép" },
              })}
            ></textarea>

            {errors.description && (
              <span className="text-danger">{errors.description.message}</span>
            )}
          </div>
          <div className="input-admin">
            <label htmlFor="">Loại thú cưng</label>
            <Select
              closeMenuOnSelect={false}
              onChange={onchangeType}
              options={dataType}
            />
          </div>
          <div className="input-admin">
            <label htmlFor="">Điểm nổi bật</label>
            <JoditEditor
              value={text}
              tabIndex={1}
              onChange={(e) => setText(e)}
            />
          </div>
          <div className="btn_submit">
            <input
              type="submit"
              disabled={load}
              value="Hoàn thành"
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
