const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// export const userData = createAsyncThunk("users/userData", async () => {
//   //   const user = await userApi.checkUser();
//   //   return user;
// });
const Cart = createSlice({
  name: "cart",
  initialState: {
    listCart: [],
    loading: true,
    error: "",
  },
  reducers: {
    addListCart: (state, action) => {
      let data;
      if (!action.payload.avatar) {
        if (action.payload.imgpet) {
          data = { ...action.payload, avatar: action.payload.imgpet[0].link };
        } else {
          data = {
            ...action.payload,
            avatar: action.payload.imgproduct[0].link,
          };
        }
      } else {
        data = action.payload;
      }
      data = { ...data, priceResult: data.price * data.quantityCurrent };

      state.listCart.push(data);
    },

    removeListCart: (state, action) => {
      let index = state.listCart.findIndex((x) => x.id === action.payload);
      state.listCart.splice(index, 1);
    },

    resetCart: (state, action) => {
      state.listCart = [];
    },

    updateListCart: (state, action) => {
      let index = state.listCart.findIndex(
        (x) => x.id === action.payload.id && x.name === action.payload.name,
      );
      let data = {
        ...action.payload,
        priceResult: action.payload.price * action.payload.quantityCurrent,
      };
      state.listCart.splice(index, 1, data);
    },
  },
});
const { reducer, actions } = Cart;
export const { addListCart, removeListCart, resetCart, updateListCart } =
  actions;

export default reducer;
