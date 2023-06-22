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
    tagId: "",
    tagDefault: [],
    loadSpin: false,
  });
  const userId = useSelector((state) => state.user.user.id);

  const { linkImg, nameImg, img, tagId, imgId, tagDefault, loadSpin } = state;
  const [tags, setTags] = useState([]);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const getApiTag = () => {
    tagApi.getAll({ status: 1 }).then((ok) => {
      setTags(ok.data.rows);
    });
  };
  useEffect(() => {
    if (id) {
      newApi.getOne(id).then((ok) => {
        reset(ok);
        setState({
          ...state,
          tagDefault: ok.Tags,

          imgId: ok.avatar,
        });
        setContent(ok.content);
      });
    }
    getApiTag();
  }, []);
  const history = useHistory();
  const [content, setContent] = useState();
  const onSubmit = async (data) => {
    if (img !== "" || imgId !== "") {
      setState({ ...state, loadSpin: true });
      if (id) {
        if (img !== "") {
          await storage.ref(`imagesNews/${img.name}`).put(img);
          const anh = await storage
            .ref("imagesNews")
            .child(img.name)
            .getDownloadURL();
          if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              avatar: anh,
              id: id,
            });
          } else {
            await tagNewApi.deletetagNew(id);
            var data1 = [];
            for (let i = 0; i < tagId.length; i++) {
              let tag = tagId[i];
              data1.push({ newId: id, tagId: tag });
            }
            await tagNewApi.posttagNew(data1);
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              avatar: anh,
              id: id,
            });
          }
        } else {
          if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              id: id,
            });
          } else {
            await tagNewApi.deletetagNew(id);
            var data1 = [];
            for (let i = 0; i < tagId.length; i++) {
              let tag = tagId[i];
              data1.push({ newId: id, tagId: tag });
            }
            await tagNewApi.posttagNew(data1);
            await newApi.editnew({
              name: data.name,
              samary: data.samary,
              content: content,
              id: id,
            });
          }
        }
      } else {
        await storage.ref(`imagesNews/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesNews")
          .child(img.name)
          .getDownloadURL();
        var tagnew = [];
        for (let i = 0; i < tagId.length; i++) {
          tagnew.push({ tagId: tagId[i] });
        }
        await newApi.postnew({
          name: data.name,
          userId,
          samary: data.samary,
          content: content,
          avatar: anh,
          tagnew,
          status: 0,
        });
      }
      history.push("/Admin/New");
    } else {
      messageShowErr("Chưa có ảnh!");
    }
  };
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const onchangeTag = (e) => {
    let arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e[i].value);
    }
    setState({ ...state, tagId: arr });
  };
  const formatDataTag = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push({ value: e[i].id, label: e[i].name });
    }
    return arr;
  };
  const formatTagDefault = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e[i].id);
    }
    return arr;
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>Thêm tin tức</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên tin tức</label>
          <input type="text" {...register("name", { required: true })} />
          {errors.name && (
            <span className="text-danger">Không được bỏ trống</span>
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
        </div>
        <div className="input-admin">
          <label htmlFor="a">Tóm tắt</label>
          <textarea
            id=""
            rows="5"
            {...register("samary", {
              required: true,
              maxLength: { value: 1000, message: "Vượt quá ký tự cho phép!" },
            })}
          ></textarea>
          {errors.samary && (
            <span className="text-danger">Không được bỏ trống</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Tag</label>
          {tags.length === 0 ? (
            <Spinner />
          ) : (
            <Select
              closeMenuOnSelect={false}
              defaultValue={formatDataTag(tagDefault)}
              isMulti
              onChange={onchangeTag}
              options={formatDataTag(tags)}
            />
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Nội dung</label>
          <JoditEditor
            value={content}
            tabIndex={1}
            onChange={(e) => setContent(e)}
          />
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
