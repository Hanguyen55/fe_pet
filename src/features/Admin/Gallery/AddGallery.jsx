import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import GalleryApi from "../../../api/galleryApi";
import { storage } from "../../../firebase";
import { messageShowErr } from "../../../function";
import Spinner from "../Spin/Spinner";
import { camera } from "../svg/IconSvg";
import { Container, TextField } from "@material-ui/core";

export default function AddGallery() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
    name: "",
  });
  const { loadSpin, linkImg, nameImg, img, imgId, name } = state;
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
  useEffect(() => {
    if (id) {
      GalleryApi.getOne(id).then((ok) => {
        // reset(ok);
        setState({
          ...state,
          name: ok.name,
          imgId: ok.link,
          linkImg: ok.avatar,
        });
      });
    }
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    // if (img === "" && imgId === "") {
    //   messageShowErr("Chưa có ảnh!");
    // } else {
    //   setState({ ...state, loadSpin: true });
    //   if (id) {
    //     if (img !== "") {
    //       await storage.ref(`imagesGallery/${img.name}`).put(img);
    //       const anh = await storage
    //         .ref("imagesGallery")
    //         .child(img.name)
    //         .getDownloadURL();
    //       await GalleryApi.editGallery({
    //         name: data.name,
    //         link: anh,
    //         id: id,
    //       });
    //     } else {
    //       await GalleryApi.editGallery({
    //         name: data.name,
    //         id: id,
    //       });
    //     }
    //   } else {
    //     await storage.ref(`imagesGallery/${img.name}`).put(img);
    //     const anh = await storage
    //       .ref("imagesGallery")
    //       .child(img.name)
    //       .getDownloadURL();
    //     await GalleryApi.postGallery({
    //       name: data.name,
    //       link: anh,
    //       status: 0,
    //     });
    //   }
    //   history.push("/Admin/Gallery");
    // }
    if(name !==''
    && linkImg !=='') {
        setState({ ...state, loadSpin: true });
        let anh;
        if(img === "") {
            anh = imgId;
        } else {
            await storage.ref(`imagesGallery/${img.name}`).put(img);
            anh = await storage
              .ref("imagesGallery")
              .child(img.name)
              .getDownloadURL();
        }
          if(id) {
            await GalleryApi.editGallery({
                name: name,
                link: anh,
                id: id,
            })
          } else {
            await GalleryApi.postGallery({
                name: name,
                link: anh,
                status: 0,
              });
          }
      history.push("/Admin/Gallery");
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
        <h3>{!id ? "Thêm ảnh" : "Sửa ảnh"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên ảnh</label>
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

        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa ảnh" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
