import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import CategoryApi from "../../../api/CategoryApi";
import imageProductApi from "../../../api/ImageProductApi";
import productApi from "../../../api/productApi";
import tagApi from "../../../api/tagApi";
import tagProductApi from "../../../api/tagProductApi";
import { storage } from "../../../firebase";
import { checkArrayEquar, messageShowErr } from "../../../function";
import Mutil from "../../InforUser/Multi/Mutil";
import Spinner from "../Spin/Spinner";
import { camera,gallegy } from "../svg/IconSvg";
import { Container, TextField } from "@material-ui/core";

export default function AddProduct() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
    tagId: "",
    tagDefault: [],
    // categoryDefault: "",
    mutilImg: "",
    mutilImgId: "",
    categoryId: "",
    name: "",
    description: "",
    price: "",
    quantity: "",
    fileAnh: [],
  });
  const {
    loadSpin,
    linkImg,
    nameImg,
    tagId,
    tagDefault,
    categoryId,
    // categoryDefault,
    mutilImg,
    mutilImgId,
    img,
    imgId,
    name,
    description,
    price,
    quantity,
    fileAnh,
  } = state;
  const [tags, setTags] = useState([]);
  const [categorys, setCategorys] = useState([]);
//   const [fileAnh, setFileAnh] = useState([]);
  const [text, setText] = useState('');
  const getApiTag = () => {
    tagApi.getAll({ status: 1 }).then((ok) => {
      setTags(ok.data.rows);
    });
  };
  const getApiCategory = () => {
    let dataCategory = [];
    CategoryApi.getAll({ status: 1 }).then((ok) => {
        ok.data.rows.forEach((el) => {
            dataCategory.push({ value: el.id, label: el.name })
        });
      setCategorys(dataCategory);
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [categoryDefault, setCategoryDefault] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState({
    name: {
        status: false,
        message: "",
    },
    price: {
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
    img: {
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
  useEffect(() => {
    let dataCategoryDefault;
    let dataImageProduct=[];
    if (id) {
      productApi.getOne(id).then((ok) => {
        // console.log("dsdasd",ok);
        // reset(ok);
        setText(ok.text);
        setState({
          ...state,
        //   tagDefault: ok.Tags,
        //   categoryDefault: ok.Category,
        //   tagId: formatTagDefault(ok.Tags),
        //   mutilImgId: ok.imgproduct,
            name: ok.name,
            description: ok.description,
            price: ok.price,
            quantity: ok.quantity,
            imgId: ok.avatar,
            linkImg: ok.avatar,
        });
        CategoryApi.getAll({ status: 1 }).then((okC) => {
            okC.data.rows.forEach((elC) => {
                if(ok.categoryId === elC.id) {
                    dataCategoryDefault = { value: elC.id, label: elC.name }
                }
            });
            setCategoryDefault(dataCategoryDefault);
        });
        imageProductApi.getAllProduct({ productId: ok.id }).then((okA) => {
            okA.data.forEach((el) => {
                dataImageProduct.push(el.link)
            });
            setSelectedFiles(dataImageProduct)
        })
      });
    }
    // getApiTag();
    getApiCategory();
  }, []);
  const history = useHistory();
  const onSubmit = async (data) => {
    // if (text !== null) {
    //   setState({ ...state, loadSpin: true });
    //   if (id) {
    //     if (img !== "" || mutilImg !== "") {
    //       if (img !== "" && mutilImg === "") {
    //         await storage.ref(`imagesProduct/${img.name}`).put(img);
    //         const anh = await storage
    //           .ref("imagesProduct")
    //           .child(img.name)
    //           .getDownloadURL();
    //         if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
    //           await productApi.editproduct({
    //             name: data.name,
    //             price: data.price,
    //             description: data.description,
    //             quantity: data.quantity,
    //             text: text,
    //             categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //             avatar: anh,
    //             id: id,
    //           });
    //         } else {
    //           await tagProductApi.deletetagProduct(id);
    //           var data1 = [];
    //           for (let i = 0; i < tagId.length; i++) {
    //             let tag = tagId[i];
    //             data1.push({ productId: id, tagId: tag });
    //           }
    //           await tagProductApi.posttagProduct(data1);
    //           await productApi.editproduct({
    //             name: data.name,
    //             price: data.price,
    //             description: data.description,
    //             quantity: data.quantity,
    //             text: text,
    //             categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //             avatar: anh,
    //             id: id,
    //           });
    //         }
    //       } else if (img === "" && mutilImg !== "") {
    //         var imgproduct = [];
    //         for (let i = 0; i < mutilImg.length; i++) {
    //           await storage
    //             .ref(`imagesProduct/${mutilImg[i].name}`)
    //             .put(mutilImg[i]);
    //           var imgs = await storage
    //             .ref("imagesProduct")
    //             .child(mutilImg[i].name)
    //             .getDownloadURL();
    //           imgproduct.push({ link: imgs });
    //         }
    //         await imageProductApi.deleteimageProduct(id);
    //         var data1 = [];
    //         for (let i = 0; i < imgproduct.length; i++) {
    //           let img = imgproduct[i];
    //           data1.push({ productId: id, link: img });
    //         }
    //         await imageProductApi.postimageProduct(data1);
    //         if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
    //           await productApi.editproduct({
    //             name: data.name,
    //             price: data.price,
    //             description: data.description,
    //             quantity: data.quantity,
    //             text: text,
    //             categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //             id: id,
    //           });
    //         } else {
    //           await tagProductApi.deletetagProduct(id);
    //           var data1 = [];
    //           for (let i = 0; i < tagId.length; i++) {
    //             let tag = tagId[i];
    //             data1.push({ productId: id, tagId: tag });
    //           }
    //           await tagProductApi.posttagProduct(data1);
    //           await productApi.editproduct({
    //             name: data.name,
    //             price: data.price,
    //             description: data.description,
    //             quantity: data.quantity,
    //             text: text,
    //             categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //             id: id,
    //           });
    //         }
    //       } else {
    //         var imgproduct = [];
    //         for (let i = 0; i < mutilImg.length; i++) {
    //           await storage
    //             .ref(`imagesProduct/${mutilImg[i].name}`)
    //             .put(mutilImg[i]);
    //           var imgs = await storage
    //             .ref("imagesProduct")
    //             .child(mutilImg[i].name)
    //             .getDownloadURL();
    //           imgproduct.push({ link: imgs });
    //         }
    //         await imageProductApi.deleteimageProduct(id);
    //         var data1 = [];
    //         for (let i = 0; i < imgproduct.length; i++) {
    //           let img = imgproduct[i];
    //           data1.push({ productId: id, link: img });
    //         }
    //         await imageProductApi.postimageProduct(data1);
    //         await storage.ref(`imagesProduct/${img.name}`).put(img);
    //         const anh = await storage
    //           .ref("imagesProduct")
    //           .child(img.name)
    //           .getDownloadURL();
    //         if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
    //           await productApi.editproduct({
    //             name: data.name,
    //             price: data.price,
    //             description: data.description,
    //             quantity: data.quantity,
    //             text: text,
    //             categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //             avatar: anh,
    //             id: id,
    //           });
    //         } else {
    //           await tagProductApi.deletetagProduct(id);
    //           var data1 = [];
    //           for (let i = 0; i < tagId.length; i++) {
    //             let tag = tagId[i];
    //             data1.push({ productId: id, tagId: tag });
    //           }
    //           await tagProductApi.posttagProduct(data1);
    //           await productApi.editproduct({
    //             name: data.name,
    //             price: data.price,
    //             description: data.description,
    //             quantity: data.quantity,
    //             text: text,
    //             categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //             avatar: anh,
    //             id: id,
    //           });
    //         }
    //       }
    //     } else {
    //       if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
    //         await productApi.editproduct({
    //           name: data.name,
    //           price: data.price,
    //           description: data.description,
    //           quantity: data.quantity,
    //           text: text,
    //           categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //           id: id,
    //         });
    //       } else {
    //         await tagProductApi.deletetagProduct(id);
    //         var data1 = [];
    //         for (let i = 0; i < tagId.length; i++) {
    //           let tag = tagId[i];
    //           data1.push({ productId: id, tagId: tag });
    //         }
    //         await tagProductApi.posttagProduct(data1);
    //         await productApi.editproduct({
    //           name: data.name,
    //           price: data.price,
    //           description: data.description,
    //           quantity: data.quantity,
    //           text: text,
    //           categoryId: categoryId === "" ? categoryDefault.id : categoryId,
    //           id: id,
    //         });
    //       }
    //     }
    //   } else {
    //     await storage.ref(`imagesProduct/${img.name}`).put(img);
    //     const anh = await storage
    //       .ref("imagesProduct")
    //       .child(img.name)
    //       .getDownloadURL();
    //     var tagproduct = [];
    //     for (let i = 0; i < tagId.length; i++) {
    //       tagproduct.push({ tagId: tagId[i] });
    //     }
    //     var imgproduct = [];
    //     for (let i = 0; i < mutilImg.length; i++) {
    //       await storage
    //         .ref(`imagesProduct/${mutilImg[i].name}`)
    //         .put(mutilImg[i]);
    //       var imgs = await storage
    //         .ref("imagesProduct")
    //         .child(mutilImg[i].name)
    //         .getDownloadURL();
    //       imgproduct.push({ link: imgs });
    //     }
    //     await productApi.postproduct({
    //       name: data.name,
    //       price: data.price,
    //       description: data.description,
    //       quantity: data.quantity,
    //       text: text,
    //       avatar: anh,
    //       categoryId,
    //       tagproduct,
    //       imgproduct,
    //       status: 0,
    //     });
    //   }
    //   history.push("/Admin/Product");
    // } else {
    //   messageShowErr("Chưa đủ thông tin!");
    // }
    
    if(
        price !==''
        && quantity !==''
    && description !==''
    && name !==''
    && linkImg !==''
    && categoryDefault !==''
    && text !=='') {
        setState({ ...state, loadSpin: true });
        let anh;
        var imgproduct = [];
        if(img === "") {
            anh = imgId;
        } else {
            await storage.ref(`imagesProduct/${img.name}`).put(img);
            anh = await storage
              .ref("imagesProduct")
              .child(img.name)
              .getDownloadURL();
        }
        if(fileAnh !== undefined || Object.keys(fileAnh).length !== 0){
            if(id) {
                fileAnh.forEach((el) => {
                    storage.ref(`imagesProduct/${el.name}`).put(el);
                    var imgs = storage
                        .ref("imagesProduct")
                        .child(el.name)
                        .getDownloadURL();
                        imgs.then((data) => { 
                            imageProductApi.postimageProduct({
                                productId: id,
                                link: data,
                            });
                          });
                })
            } else {
                fileAnh.forEach((el) => {
                    storage.ref(`imagesProduct/${el.name}`).put(el);
                    var imgs = storage
                        .ref("imagesProduct")
                        .child(el.name)
                        .getDownloadURL();
                        imgs.then((data) => { 
                            imageProductApi.postimageProduct({
                                productId: id,
                                link: data,
                            });
                          });
                })
            }
            
        }
          if(id) {
            await productApi.editproduct({
                name: name,
                price: price,
                description: description,
                quantity: quantity,
                text: text,
                avatar: anh,
                categoryId: categoryDefault.value,
                id: id,
              });
          } else {
            setTimeout(() => {
                productApi.postproduct({
                    name: name,
                    price: price,
                    description: description,
                    quantity: quantity,
                    text: text,
                    avatar: anh,
                    categoryId: categoryDefault.value,
                    status: 0,
                  });
              }, 2000);
            
          };
      history.push("/Admin/Product");
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
        if(typeof price === 'string' && price.length === 0){
            setError((prevState) => ({
                ...prevState,
                price: {
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
        if(typeof linkImg === 'string' && linkImg.length === 0){
            setError((prevState) => ({
                ...prevState,
                img: {
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
  const handleCheckPrice = (e) => {
    if(typeof e === 'string' && e.length === 0){
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "Không được bỏ trống!",
                status: true,
            }
          }));
    } else if(e.length === 255) {
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "Vượt quá ký tự cho phép",
                status: true,
            }
          }));
    } else if(!e.match(/^([1-9][0-9]{0,9}|1000)$/)) {
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "Giá không hợp lệ",
                status: true,
            }
        }));
    } else {
        setError((prevState) => ({
            ...prevState,
            price: {
                message: "",
                status: false,
            }
          }));
    }
    setState({ ...state, price: e });
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
//   const hangdleMutilImg = (e) => {
//     setState({ ...state, mutilImg: e });
//     console.log("mutilImg",mutilImg,mutilImgId,fileAnh);
//   };
//   const formatTagDefault = (e) => {
//     var arr = [];
//     for (let i = 0; i < e.length; i++) {
//       arr.push(e[i].id);
//     }
//     return arr;
//   };
//   const formatDataTag = (e) => {
//     var arr = [];
//     for (let i = 0; i < e.length; i++) {
//       arr.push({ value: e[i].id, label: e[i].name });
//     }
//     return arr;
//   };
//   const formatDataCategory = (e) => {
//     return [{ value: e.id, label: e.name }];
//   };
//   const onchangeTag = (e) => {
//     let arr = [];
//     for (let i = 0; i < e.length; i++) {
//       arr.push(e[i].value);
//     }
//     setState({ ...state, tagId: arr });
//   };
//   const onchangeCategory = (e) => {
//     setState({ ...state, categoryId: e.value });
//   };
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
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>{!id ? "Thêm sản phẩm" : "Sửa sản phẩm"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Tên sản phẩm</label>
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
          {/* <Mutil mutilImg={hangdleMutilImg} />
          {mutilImg === "" ? (
            <div className="mutil">
              <div className="result">
                {mutilImgId.length === 0
                  ? ""
                  : mutilImgId?.map((ok) => <img src={ok.link} alt="" />)}
              </div>
            </div>
          ) : (
            ""
          )} */}
        </div>
        <div className="input-admin">
          <label htmlFor="">Danh mục sản phẩm</label>
          {categorys.length === 0 ? (
            <Spinner />
          ) : (
            <Select
              closeMenuOnSelect={true}
              onChange={onchangeCategory}
              value={categoryDefault}
              options={categorys}
            />
          )}
          {error.category.status && (
                  <span className="text-danger">{error.category.message}</span>
                )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Giá</label>
          <TextField
                label=""
                // id="outlined-basic"
                id="outlined-number"
                variant="outlined"
                type="number"
                InputLabelProps={{shrink: false}}
                value={price}
                onChange={(e) => handleCheckPrice(e.target.value)}
            />
          {error.price.status && (
                  <span className="text-danger">{error.price.message}</span>
                )}
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
        </div>
      </form>
    </div>
  );
}
