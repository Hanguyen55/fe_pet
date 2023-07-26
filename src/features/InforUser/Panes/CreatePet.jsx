import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import petApi from "../../../api/petApi";
import userApi from "../../../api/userApi";
import CategoryPetApi from "../../../api/CategoryPetApi";
import { storage } from "../../../firebase";
import imagePetApi from "../../../api/imgPetApi";
import { useHistory, useParams } from "react-router";
import { messageShowSuccess } from "../../../function";
import { camera, gallegy } from "../../Admin/svg/IconSvg";
import Mutil from "../Multi/Mutil";
import Spinner from "../../Spin/Spinner";
import { Container, TextField } from "@material-ui/core";
import "../../../sass/Admin/CreatePet.scss";

export default function CreatePet() {
    const { id } = useParams();
    const [categorys, setCategorys] = useState([]);
    const [categoryDefault, setCategoryDefault] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [state, setState] = useState({
    loadSpin: false,
    linkImgPet: "",
    nameImgPet: "",
    imgPet: "",
    imgIdPet: "",
    mutilImgPet: "",
    userId: "",
    load: false,
    type: "",
    name: "",
    description: "",
    priceStart: "",
    priceEnd: "",
    quantity: "",
    fileAnh: [],
  });
  const {
    loadSpin,
    linkImgPet,
    nameImgPet,
    mutilImgPet,
    imgPet,
    imgIdPet,
    userId,
    type,
    load,
    name,
    description,
    priceStart,
    priceEnd,
    quantity,
    fileAnh
  } = state;
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
    priceStart: {
        status: false,
        message: "",
    },
    priceEnd: {
        status: false,
        message: "",
    },
    quantity: {
        status: false,
        message: "",
    },
    description: {
        status: false,
        message: "",
    },
    imgPet: {
        status: false,
        message: "",
    },
    text: {
        status: false,
        message: "",
    },
    category: {
        status: false,
        message: "",
    },
  });
  const [text, setText] = useState('');
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
  const handleCheckQuantity = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            quantity: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
        setError((prevState) => ({
            ...prevState,
            quantity: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!e.match(/^([1-9][0-9]{0,9}|1000)$/)) {
        setError((prevState) => ({
            ...prevState,
            quantity: {
                message: "Sô lượng không hợp lệ",
                status: true,
            }
        }));
    } else {
        setError((prevState) => ({
            ...prevState,
            quantity: {
                message: "",
                status: false,
            }
          }));
    }
    setState({ ...state, quantity: e });
  };
  const handleCheckText = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            text: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            text: {
                message: "",
                status: false,
            }
          }));
    }
    setText(e)
    // setState({ ...state, name: e });
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
  const handleCheckPriceStart = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!e.match(/^([1-9][0-9]{0,9}|1000)$/)) {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "Giá không hợp lệ",
                status: true,
            }
        }));
    } else if(Number(e) > Number(priceEnd)) {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "Giá từ không được lớn hơn giá đến",
                status: true,
            }
        }));
    } else if(Number(e) < Number(priceEnd)) {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "",
                status: false,
            },
            priceEnd: {
                message: "",
                status: false,
            },
        }));
    } else {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "",
                status: false,
            }
          }));
    }
    console.log("Number(ok.priceResult)",typeof Number(priceStart));
    setState({ ...state, priceStart: e });
  };
  const handleCheckPriceEnd = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            priceEnd: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
        setError((prevState) => ({
            ...prevState,
            priceEnd: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!e.match(/^([1-9][0-9]{0,9}|1000)$/)) {
        setError((prevState) => ({
            ...prevState,
            priceEnd: {
                message: "Giá không hợp lệ",
                status: true,
            }
        }));
    } else if(Number(priceStart) > Number(e)) {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "Giá từ không được lớn hơn giá đến",
                status: true,
            }
        }));
    } else if(Number(priceStart) < Number(e)) {
        setError((prevState) => ({
            ...prevState,
            priceStart: {
                message: "",
                status: false,
            },
            priceEnd: {
                message: "",
                status: false,
            },
        }));
    } else {
        setError((prevState) => ({
            ...prevState,
            priceEnd: {
                message: "",
                status: false,
            }
          }));
    }
    setState({ ...state, priceEnd: e });
  };
  const onchangeCategory = (e) => {
    if(e === undefined || Object.keys(e).length === 0){
        setError((prevState) => ({
            ...prevState,
            category: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            category: {
                message: "",
                status: false,
            }
          }));
    }
    // setState({ ...state, tagId: e });
    setCategoryDefault(e)
  };
  const hangdelimagePet = (e) => {
    if(e === undefined || Object.keys(e).length === 0){
        setError((prevState) => ({
            ...prevState,
            imgPet: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else {
        setError((prevState) => ({
            ...prevState,
            imgPet: {
                message: "",
                status: false,
            }
          }));
    }
    setState({
      ...state,
      linkImgPet: URL.createObjectURL(e.target.files[0]),
      nameImgPet: e.target.files[0].name,
      imgPet: e.target.files[0],
    });
  };
  useEffect(() => {
    let dataCategory = [];

    userApi.checkUser().then((ok) => {
      setState({ ...state, userId: ok.id });
    });
    CategoryPetApi.getAll({ status: 1 }).then((ok) => {
        ok.data.rows.forEach((el) => {
            dataCategory.push({ value: el.id, label: el.name })
        });
      setCategorys(dataCategory);
    });
  }, []);
//   const onchangeType = (e) => {
//     setState({ ...state, type: e.value });
//   };
  const history = useHistory();
  const onSubmit = async (data) => {
    // setState({ ...state, load: !load });
    // // messageShowSuccess("Vui vòng đợi trong giây lát!");
    // await storage.ref(`imagesPet/${imgPet.name}`).put(imgPet);
    // const anh = await storage
    //   .ref("imagesPet")
    //   .child(imgPet.name)
    //   .getDownloadURL();
    // var imgpet = [];
    // for (let i = 0; i < mutilImgPet.length; i++) {
    //   await storage.ref(`imagesPet/${mutilImgPet[i].name}`).put(mutilImgPet[i]);
    //   var imgPets = await storage
    //     .ref("imagesPet")
    //     .child(mutilImgPet[i].name)
    //     .getDownloadURL();
    //   imgpet.push({ link: imgPets });
    // }
    // // console.log("he", {
    // //   name: data.name,
    // //   price: data.price,
    // //   description: data.description,
    // //   text: text,
    // //   avatar: anh,
    // //   type: type,
    // //   userId: userId,
    // //   imgpet,
    // //   status: 1,
    // // });
    // petApi.postpet({
    //   name: data.name,
    //   priceStart: data.priceStart,
    //   priceEnd: data.priceEnd,
    //   quantity: data.quantity,
    //   description: data.description,
    //   text: text,
    //   avatar: anh,
    //   type: type,
    //   userId: userId,
    //   imgpet,
    // //   checkAdmin: 1,
    //   status: 1,
    // });


    if(
        priceStart !==''
        && priceEnd !==''
        && quantity !==''
    && description !==''
    && name !==''
    && linkImgPet !==''
    && categoryDefault !==''
    && text !=='') {
        setState({ ...state, loadSpin: true });
        let anh;
        var imgproduct = [];
        if(imgPet === "") {
            anh = imgIdPet;
        } else {
            await storage.ref(`imagesPet/${imgPet.name}`).put(imgPet);
            anh = await storage
              .ref("imagesPet")
              .child(imgPet.name)
              .getDownloadURL();
        }
        if(fileAnh !== undefined || Object.keys(fileAnh).length !== 0){
            if(id) {
                fileAnh.forEach((el) => {
                    storage.ref(`imagesPet/${el.name}`).put(el);
                    var imgs = storage
                        .ref("imagesPet")
                        .child(el.name)
                        .getDownloadURL();
                        imgs.then((data) => { 
                            imagePetApi.postimgPet({
                                petId : id,
                                link: data,
                            });
                          });
                })
            } else {
                fileAnh.forEach((el) => {
                    storage.ref(`imagesPet/${el.name}`).put(el);
                    var imgs = storage
                        .ref("imagesPet")
                        .child(el.name)
                        .getDownloadURL();
                        imgs.then((data) => { 
                            imagePetApi.postimgPet({
                                petId : id,
                                link: data,
                            });
                          });
                })
            }
            
        }
          if(id) {
            await petApi.editproduct({
                name: name,
                priceStart: priceStart,
                priceEnd: priceEnd,
                quantity: quantity,
                description: description,
                text: text,
                avatar: anh,
                userId: userId,
                id: id,
              });
          } else {
            // setTimeout(() => {
                petApi.postpet({
                    name: name,
                    priceStart: priceStart,
                    priceEnd: priceEnd,
                    quantity: quantity,
                    description: description,
                    text: text,
                    avatar: anh,
                    userId: userId,
                    CategoryPetId:categoryDefault.value,
                    // imgpet,
                    //   checkAdmin: 1,
                    status: 0,
                  });
            //   }, 2000);
          };
      history.push("/Admin/CheckPet");
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
        if(typeof priceStart === 'string' && priceStart.length === 0){
            setError((prevState) => ({
                ...prevState,
                priceStart: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof priceEnd === 'string' && priceEnd.length === 0){
            setError((prevState) => ({
                ...prevState,
                priceEnd: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof quantity === 'string' && quantity.length === 0){
            setError((prevState) => ({
                ...prevState,
                quantity: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof linkImgPet === 'string' && linkImgPet.length === 0){
            setError((prevState) => ({
                ...prevState,
                imgPet: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
        if(typeof text === 'string' && text.length === 0){
            setError((prevState) => ({
                ...prevState,
                text: {
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
        if(typeof categoryDefault === 'string' && categoryDefault.length === 0){
            setError((prevState) => ({
                ...prevState,
                category: {
                    status: true,
                    message: "Không được bỏ trống!",
                },
              }));
        }
    }
  };
  const hangdleMutilImg = (e) => {
    setState({ ...state, mutilImgPet: e });
  };
  const dataType = [
    { value: "chó", label: "chó" },
    { value: "mèo", label: "mèo" },
    { value: "khác", label: "khác" },
  ];
  const handleImageChange = (e) => {
    if (e.target.files) {
    //   mutilImg(e.target.files);
    fileAnh.push(e.target.files[0])
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };
const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} />;
    });
  };
  return (
    <div className="tab-pane">
      <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          {/* {id ? (
            <h3>Sửa cân nặng</h3>
          ) : ( */}
            <h3>Thêm thú cưng</h3>
        {/* //   )} */}
        </div>
        <div className="heading__hr"></div>
      </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên thú cưng</label>
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
              {error.imgPet.status && (
                  <span className="text-danger">{error.imgPet.message}</span>
                )}
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Ảnh liên quan</label>
            <div className="mutil">
                <div>
                    <input
                    type="file"
                    id="file"
                    hidden
                    multiple
                    onChange={handleImageChange}
                    />
                    <div className="label-holder">
                    <label htmlFor="file" className="label">
                        <div className="icon">{gallegy}</div>
                    </label>
                    </div>
                    <div className="result">{renderPhotos(selectedFiles)}</div>
                </div>
            </div>
            {/* <Mutil mutilImg={hangdleMutilImg} /> */}
          </div>
          <div className="input-admin">
            <label htmlFor="">Loại thú cưng</label>
            <Select
              closeMenuOnSelect={true}
              onChange={onchangeCategory}
              value={categoryDefault}
              options={categorys}
            />
             {error.category.status && (
                  <span className="text-danger">{error.category.message}</span>
                )}
          </div>
          {/* <div className="input-admin">
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
          </div> */}
          <label htmlFor="">Giá</label>
          <div className="input-admin-price">
            <div className="input-admin">
                <label htmlFor="">Từ</label>
                <TextField
                label=""
                // id="outlined-basic"
                id="outlined-number"
                variant="outlined"
                type="number"
                InputLabelProps={{shrink: false}}
                value={priceStart}
                onChange={(e) => handleCheckPriceStart(e.target.value)}
            />
          {error.priceStart.status && (
                  <span className="text-danger">{error.priceStart.message}</span>
                )}
            </div>
            {/* <p>-</p> */}
            <div className="input-admin">
                <label htmlFor="">Đến</label>
                <TextField
                label=""
                // id="outlined-basic"
                id="outlined-number"
                variant="outlined"
                type="number"
                InputLabelProps={{shrink: false}}
                value={priceEnd}
                onChange={(e) => handleCheckPriceEnd(e.target.value)}
            />
          {error.priceEnd.status && (
                  <span className="text-danger">{error.priceEnd.message}</span>
                )}
            </div>
          </div>
          <div className="input-admin">
            <label htmlFor="">Số lượng</label>
            <TextField
                label=""
                // id="outlined-basic"
                id="outlined-number"
                variant="outlined"
                type="number"
                InputLabelProps={{shrink: false}}
                value={quantity}
                onChange={(e) => handleCheckQuantity(e.target.value)}
            />
          {error.quantity.status && (
                  <span className="text-danger">{error.quantity.message}</span>
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
          <div className="input-admin">
            <label htmlFor="">Điểm nổi bật</label>
            <JoditEditor
              value={text}
              tabIndex={1}
              onChange={(e) => handleCheckText(e)}
              />
              {error.text.status && (
                      <span className="text-danger">{error.text.message}</span>
                    )}
          </div>
          <div className="btn_submit">
             {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa sản phẩm" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
            {/* <input
              type="submit"
              disabled={load}
              value="Hoàn thành"
              style={{ cursor: "pointer" }}
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
}
