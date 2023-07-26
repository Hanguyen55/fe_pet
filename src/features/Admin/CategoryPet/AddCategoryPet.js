import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import CategoryPetApi from "../../../api/CategoryPetApi";
import { storage } from "../../../firebase";
import { messageShowErr } from "../../../function";
import Spinner from "../Spin/Spinner";
import { camera } from "../svg/IconSvg";
import { Container, TextField } from "@material-ui/core";

export default function AddCategoryPet() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
    name: "",
    description: "",
  });
  const { loadSpin, linkImg, nameImg, img, imgId, name, description } = state;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState({
    name: {
        status: false,
        message: "",
    },
    description: {
        status: false,
        message: "",
    },
    img: {
        status: false,
        message: "",
    },
  });
  const hangdelimage = (e) => {
    if(e === undefined || Object.keys(e).length === 0){
        setError((prevState) => ({
            ...prevState,
            img: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            img: {
                message: "",
                status: false,
            }
          }));
    }
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
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
    setState({ ...state, name: e });
  };
  const handleCheckDescription = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            description: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 1000) {
        setError((prevState) => ({
            ...prevState,
            description: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            description: {
                message: "",
                status: false,
            }
          }));
    }
    setState({ ...state, description: e });
  };
  useEffect(() => {
    if (id) {
        CategoryPetApi.getOne(id).then((ok) => {
        setState({
          ...state,
          name: ok.name,
          description: ok.description,
          imgId: ok.avatar,
          linkImg: ok.avatar,
        });
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    if(description !==''
    && name !==''
    && linkImg !=='') {
        setState({ ...state, loadSpin: true });
        let anh;
        if(img === "") {
            anh = imgId;
        } else {
            await storage.ref(`imagesCategory/${img.name}`).put(img);
            anh = await storage
              .ref("imagesCategory")
              .child(img.name)
              .getDownloadURL();
        }
          if(id) {
            await CategoryPetApi.editcategory({
                name: name,
                description: description,
                avatar: anh,
                id: id,
              });
          } else {
            await CategoryPetApi.postcategory({
                name: name,
                description: description,
                avatar: anh,
                status: 0,
              });
          }
      history.push("/Admin/CategoryPet");
    } else {
        if(typeof name === 'string' && name.length === 0){
            setError((prevState) => ({
                ...prevState,
                name: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof description === 'string' && description.length === 0){
            setError((prevState) => ({
                ...prevState,
                description: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof linkImg === 'string' && linkImg.length === 0){
            setError((prevState) => ({
                ...prevState,
                img: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
    }
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
        <h3>{!id ? "Thêm danh mục thú cưng" : "Sửa danh mục thú cưng"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên danh mục</label>
          <TextField
                label=""
                // id="outlined-basic"
                id="outlined-controlled"
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
          <label htmlFor="">Ảnh đại diện</label>
          <div className="update">
            <div className="icon-avatar">
              <label htmlFor="avatar">{camera}</label>
              <input
                type="file"
                name=""
                id="avatar"
                hidden
                onChange={hangdelimage}
              />
            </div>
            {linkImg ? (
              <img
                src={linkImg}
                className="img-update"
                height="150px"
                width="250px"
                alt=""
              />
            ) : imgId ? (
              <img
                src={imgId}
                className="img-update"
                height="150px"
                width="250px"
                alt=""
              />
            ) : (
              ""
            )}
            <br />
            <span>{nameImg}</span>
          </div>
          {error.img.status && (
                  <span className="text-danger">{error.img.message}</span>
                )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Mô tả</label>
          <textarea
            name=""
            id=""
            rows="5"
            onChange={(e) => handleCheckDescription(e.target.value)}
            value={description}
          ></textarea>
          {error.description.status && (
                  <span className="text-danger">{error.description.message}</span>
                )}
        </div>

        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa danh mục" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
