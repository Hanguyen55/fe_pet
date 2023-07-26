import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import WeightApi from "../../../api/weightApi";
import billApi from "../../../api/billApi";
import Spinner from "../Spin/Spinner";

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

export default function BillCreate() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
  });
  const { loadSpin } = state;
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
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
    billApi
      .getAll({ page: page })
      .then((ok) => {
        setdata(ok.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [load,page]);
  const history = useHistory();
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const onSubmit = async (data) => {
    setState({ ...state, loadSpin: true });
    // if (id) {
    //   await WeightApi.editWeight({
    //     weight: data.weight,
    //     id: id,
    //   });
    // } else {
      await WeightApi.postWeight({
        weight: data.weight,
        status: 0,
      });
    // }
    history.push("/Admin/Weight");
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          {/* {id ? (
            <h3>Sửa cân nặng</h3>
          ) : ( */}
            <h3>Thêm hóa đơn</h3>
          {/* )} */}
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-admin-tille">
            <h3>Thông tin khách hàng</h3>
        <div className="heading-hr-tille"></div>
        </div>
        <div className="input-admin">
          <label htmlFor="">Người mua</label>
          <input
            type="text"
            {...register("weight", { required: "Không được bỏ trống" })}
          />
          {errors.weight && (
            <span className="text-danger">{errors.weight.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Điện thoại</label>
          <input
            type="text"
            {...register("weight", { required: "Không được bỏ trống" })}
          />
          {errors.weight && (
            <span className="text-danger">{errors.weight.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Địa chỉ</label>
          <input
            type="text"
            {...register("weight", { required: "Không được bỏ trống" })}
          />
          {errors.weight && (
            <span className="text-danger">{errors.weight.message}</span>
          )}
        </div>
        <div className="input-admin-tille">
            <h3>Thông tin sản phẩm</h3>
        <div className="heading-hr-tille"></div>
          {/* <Select
           labelId="demo-multiple-checkbox-label"
           id="demo-multiple-checkbox"
           multiple
           value={personName}
           onChange={handleChange}
           input={<OutlinedInput label="Tag" />}
           renderValue={(selected) => selected.join(', ')}
           MenuProps={MenuProps}
        >
          {names?.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
              <TextField
                label=" "
                InputLabelProps={{shrink: false}}
                // value={phone}
                // onChange={(e) => handleCheckPhone(e.target.value)}
            />
              <input type="number" classname="input_quantity" />
            </MenuItem>
          ))}
        </Select> */}
        </div>
        <div className="input-admin">
          <label htmlFor="">Địa chỉ</label>
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
          ) :
        //   id ? (
        //     <input type="submit" value="Sửa cân nặng" />
        //   ) : (
            <input type="submit" value="Thêm mới" />
        //   )
          }
        </div>
      </form>
    </div>
  );
}
