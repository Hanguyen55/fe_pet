import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import newApi from "../../../api/newApi";
import tagApi from "../../../api/tagApi";
import tagNewApi from "../../../api/tagNewApi";
import { storage } from "../../../firebase";
import { Container, TextField } from "@material-ui/core";
import { checkArrayEquar, messageShowErr } from "../../../function";
import "../../../sass/Admin/PublicAdmin.scss";
import Spinner from "../Spin/Spinner";
import { camera } from "../svg/IconSvg";
export default function AddNew() {
  const [state, setState] = useState({
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
    // tagId: "",
    name: "",
    samary: "",
    loadSpin: false,
  });
  const userId = useSelector((state) => state.user.user.id);
  const { linkImg, nameImg, img, imgId, samary, name, loadSpin } = state;
  const [tags, setTags] = useState();
  const [tagDefault, setTagDefault] = useState();
  const [error, setError] = useState({
    name: {
        status: false,
        message: "",
    },
    samary: {
        status: false,
        message: "",
    },
    tag: {
        status: false,
        message: "",
    },
    img: {
        status: false,
        message: "",
    },
    content: {
        status: false,
        message: "",
    },
  });
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getApiTag = () => {
    tagApi.getAll({ status: 1 }).then((ok) => {
        let dataTag = [];
        ok.data.rows.forEach((el) => {
            dataTag.push({ value: el.id, label: el.name })
        });
        setTags(dataTag);
    });
  };
  useEffect(() => {
    let datatagDefault;
    if (id) {
      newApi.getOne(id).then((ok) => {
        // reset(ok);
        setState({
          ...state,
        //   tagId: ok.tagId,
          name: ok.name,
          samary: ok.samary,
          imgId: ok.avatar,
          linkImg: ok.avatar,
        });
        tagApi.getAll({ status: 1 }).then((okT) => {
            okT.data.rows.forEach((el) => {
                if(ok.tagId === el.id) {
                    datatagDefault = { value: el.id, label: el.name }
                }
            });
            setTagDefault(datatagDefault)
        });
        setContent(ok.content);
      });
    }
    getApiTag();
  }, [id]);
  const history = useHistory();
  const [content, setContent] = useState('');
  const onSubmit = async () => {
    if(tagDefault !==''
    && samary !==''
    && name !==''
    && linkImg !==''
    && content !=='') {
        setState({ ...state, loadSpin: true });
        let anh;
        if(img === "") {
            anh = imgId;
        } else {
            await storage.ref(`imagesNews/${img.name}`).put(img);
            anh = await storage
              .ref("imagesNews")
              .child(img.name)
              .getDownloadURL();
        }
          if(id) {
            await newApi.editnew({
                name: name,
                userId,
                samary: samary,
                content: content,
                avatar: anh,
                tagId: tagDefault.value,
                status: 0,
                id: id,
              });
          } else {
            await newApi.postnew({
                name: name,
                userId,
                samary: samary,
                content: content,
                avatar: anh,
                tagId: tagDefault.value,
                status: 0,
              });
          }
      history.push("/Admin/New");
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
        if(typeof samary === 'string' && samary.length === 0){
            setError((prevState) => ({
                ...prevState,
                samary: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof tagDefault === 'string' && tagDefault.length === 0){
            setError((prevState) => ({
                ...prevState,
                tag: {
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
        if(typeof content === 'string' && content.length === 0){
            setError((prevState) => ({
                ...prevState,
                content: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
    }
  };
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
      linkImg: URL.createObjectURL(e.target?.files[0]),
      nameImg: e?.target?.files[0]?.name,
      img: e?.target?.files[0],
    });
  };
  const onchangeTag = (e) => {
    if(e === undefined || Object.keys(e).length === 0){
        setError((prevState) => ({
            ...prevState,
            tag: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            tag: {
                message: "",
                status: false,
            }
          }));
    }
    // setState({ ...state, tagId: e });
    setTagDefault(e)
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
  const handleCheckContent = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            content: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            content: {
                message: "",
                status: false,
            }
          }));
    }
    setContent(e)
    // setState({ ...state, name: e });
  };
  const handleCheckSamary = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            samary: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 1000) {
        setError((prevState) => ({
            ...prevState,
            samary: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            samary: {
                message: "",
                status: false,
            }
          }));
    }
    setState({ ...state, samary: e });
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
        <h3>{!id ? "Thêm tin tức" : "Sửa tin tức"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên tin tức</label>
          <TextField
                label=""
                // id="outlined-basic"
                id="outlined-controlled"
                variant="outlined"
                InputLabelProps={{shrink: false}}
                value={name}
                onChange={(e) => handleCheckName(e.target.value)}
            />
          {/* <input type="text"
          {...register("name", {})} /> */}
          {/* {errors.name && (
            <span className="text-danger">Không được bỏ trống</span>
          )} */}
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
          <label htmlFor="a">Tóm tắt</label>
          <textarea
            id=""
            rows="5"
            onChange={(e) => handleCheckSamary(e.target.value)}
            value={samary}
            // {...register("samary", {
            //   required: true,
            //   maxLength: { value: 1000, message: "Vượt quá ký tự cho phép!" },
            // })}
          ></textarea>
          {error.samary.status && (
                  <span className="text-danger">{error.samary.message}</span>
                )}
          {/* {errors.samary && (
            <span className="text-danger">Không được bỏ trống</span>
          )} */}
        </div>
        <div className="input-admin">
          <label htmlFor="">Tag</label>
          {tags?.length === 0 ? (
            <Spinner />
          ) : (
            <Select
            closeMenuOnSelect={true}
            onChange={onchangeTag}
            value={tagDefault}
            options={tags}
          />
          )}
          {error.tag.status && (
                  <span className="text-danger">{error.tag.message}</span>
                )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Nội dung</label>
          <JoditEditor
            value={content}
            tabIndex={1}
            onChange={(e) => handleCheckContent(e)}
          />
          {error.content.status && (
                  <span className="text-danger">{error.content.message}</span>
                )}
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa tin tức" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
